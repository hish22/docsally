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

use std::sync::{Arc, Mutex};

#[derive(Default)]
pub struct AppState {
    chat_service: Mutex<Option<Arc<OllamaChat>>>,
}

use crate::logic::{
    db_embedding::db_embedding, ollama_embeddings::ollama_embedder, pdf_extract::extract_pdf,
};

pub struct OllamaChat {
    chain: ConversationalRetrieverChain,
}

impl OllamaChat {
    pub async fn new(file: String, llm_type: String) -> Result<Self, Box<dyn std::error::Error>> {
        let content = extract_pdf(file);
        let store = db_embedding(ollama_embedder(), content.unwrap()).await;

        let llm = OpenAI::new(OllamaConfig::default()).with_model(llm_type);

        let chain = ConversationalRetrieverChainBuilder::new()
            .llm(llm.clone())
            .rephrase_question(true)
            .retriever(Retriever::new(store, 4))
            // .prompt(prompt)
            .build()?;

        Ok(Self { chain })
    }

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

#[tauri::command]
pub async fn register_pdf(
    file: String,
    llm: String,
    state: tauri::State<'_, AppState>,
) -> Result<String, String> {
    // Do the expensive processing
    let chat_service = OllamaChat::new(file, llm)
        .await
        .map_err(|e| format!("Failed to initialize chat service: {}", e))?;

    // Store it in app state
    *state.chat_service.lock().unwrap() = Some(Arc::new(chat_service));

    Ok("Chat service initialized successfully".to_string())
}

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
