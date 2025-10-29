//! Entry point for chat functionality with PDF document processing
//!
//! This module provides the main chat service that processes PDF documents,
//! creates embeddings, and enables conversational retrieval using Ollama LLMs.
//!
//! The workflow is:
//! 1. PDF files are processed and text is extracted
//! 2. Text is embedded using Ollama embeddings
//! 3. Embeddings are stored in a vector database
//! 4. Questions are answered using conversational retrieval over the stored embeddings

use crate::pdf_operations;
use futures::stream::Stream;
use futures::stream::StreamExt;
use langchain_rust::chain::ChainError;
use langchain_rust::schemas::StreamData;
use langchain_rust::{
    chain::{Chain, ConversationalRetrieverChain, ConversationalRetrieverChainBuilder},
    llm::{ollama::openai::OllamaConfig, OpenAI},
    prompt_args,
    vectorstore::Retriever,
};
use std::pin::Pin;
use tauri::{AppHandle, Emitter};
use tauri_plugin_store::StoreExt;

use std::sync::{Arc, Mutex};

/// Application state containing the chat service
///
/// Stores the initialized chat service in a thread-safe manner.
/// The service is wrapped in Arc<Mutex<>> for shared ownership and thread safety.
#[derive(Default)]
pub struct AppState {
    chat_service: Mutex<Option<Arc<OllamaChat>>>,
}

use crate::chat_operations::{db_embedding::db_embedding, ollama_embeddings::ollama_embedder};

/// Chat service that handles PDF document processing and question answering
///
/// Contains a conversational retriever chain that combines:
/// - PDF text extraction and embedding
/// - Vector similarity search for relevant context
/// - LLM-based question answering with retrieved context
pub struct OllamaChat {
    chain: ConversationalRetrieverChain,
}

impl OllamaChat {
    /// Creates a new chat service by processing a PDF file and setting up the retrieval chain
    ///
    /// # Arguments
    /// * `file` - Path to the PDF file to process
    /// * `llm_type` - Ollama model name to use for question answering
    ///
    /// # Returns
    /// Returns a configured chat service ready for question answering
    pub async fn new(
        file: String,
        llm_type: String,
        app: AppHandle,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let content = pdf_operations::pdf_extract::extract_pdf(file);

        // Fetch default model_settings values.
        let store = app.store("model_set.json")?;

        let chunk_size = store
            .get("chunk-size")
            .expect("Failed to get the value from model_set.json")
            .take()
            .as_u64()
            .unwrap() as usize;

        let overlap = store
            .get("overlap-size")
            .expect("Failed to get the value from model_set.json")
            .take()
            .as_u64()
            .unwrap() as usize;

        println!("{} chunks", chunk_size);

        let store = db_embedding(ollama_embedder(), content.unwrap(), chunk_size, overlap).await;

        let llm = OpenAI::new(OllamaConfig::default()).with_model(llm_type);

        let chain = ConversationalRetrieverChainBuilder::new()
            .llm(llm.clone())
            .rephrase_question(true)
            .retriever(Retriever::new(store, 4))
            // .prompt(prompt)
            .build()?;

        Ok(Self { chain })
    }

    /// Processes a question and returns a stream of responses
    ///
    /// # Arguments
    /// * `question` - The user's question to be answered
    ///
    /// # Returns
    /// Returns a stream of response chunks that can be consumed asynchronously
    pub async fn ask_question(
        &self,
        question: &str,
    ) -> Result<
        Pin<Box<dyn Stream<Item = Result<StreamData, ChainError>> + Send>>,
        Box<dyn std::error::Error>,
    > {
        let input = prompt_args! {
            "question" => question,
        };

        let stream_d = self.chain.stream(input).await.unwrap();

        Ok(stream_d)
    }
}

/// Tauri command to register a PDF file and initialize the chat service
///
/// This command processes the PDF file, creates embeddings, and stores them
/// in the application state for later use in question answering.
///
/// # Arguments
/// * `file` - Path to the PDF file to process
/// * `llm` - Ollama model name for the LLM
/// * `state` - Application state to store the chat service
///
/// # Returns
/// Success message or error description
#[tauri::command]
pub async fn register_pdf(
    file: String,
    llm: String,
    state: tauri::State<'_, AppState>,
    app: AppHandle,
) -> Result<String, String> {
    // Do the expensive processing
    let chat_service = OllamaChat::new(file, llm, app.clone())
        .await
        .map_err(|e| format!("Failed to initialize chat service: {}", e))?;

    // Store it in app state
    *state.chat_service.lock().unwrap() = Some(Arc::new(chat_service));

    Ok("Chat service initialized successfully".to_string())
}

/// Tauri command to ask a question and stream the response back to the frontend
///
/// This command processes a user question using the initialized chat service
/// and streams the response back to the frontend via Tauri events.
///
/// # Arguments
/// * `question` - The user's question to be answered
/// * `state` - Application state containing the chat service
/// * `app` - Tauri app handle for emitting events
///
/// # Events Emitted
/// * `content-stream` - Streams response chunks as they arrive
/// * `content-stream-end` - Signals the end of the response stream
#[tauri::command]
pub async fn ask_question(
    question: String,
    state: tauri::State<'_, AppState>,
    app: AppHandle,
) -> Result<(), ()> {
    let chat_service_arc = {
        let guard = state.chat_service.lock().unwrap();
        guard.clone() // Clone the Arc, not the ChatService
    }; // Guard dropped here

    let stream_d = match chat_service_arc {
        Some(chat_service) => chat_service
            .ask_question(&question)
            .await
            .map_err(|e| format!("Error asking question: {}", e)),
        None => Err("Chat service not initialized. Please load a PDF file first.".to_string()),
    };

    let mut stream_b = stream_d.unwrap();

    while let Some(result) = stream_b.next().await {
        match result {
            Ok(value) => {
                app.emit("content-stream", &value.content).unwrap();
            }
            Err(e) => panic!("Error invoking LLMChain: {:?}", e),
        }
    }

    app.emit("content-stream-end", ()).unwrap();

    Ok(())
}
