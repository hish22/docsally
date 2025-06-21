use langchain_rust::{
    chain::{Chain, ConversationalRetrieverChain, ConversationalRetrieverChainBuilder},
    llm::{ollama::openai::OllamaConfig, OpenAI},
    prompt_args,
    vectorstore::Retriever,
};
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
    pub async fn new(file: String, llmType: String) -> Result<Self, Box<dyn std::error::Error>> {
        let content = extract_pdf(file);
        let store = db_embedding(ollama_embedder(), content).await;

        let llm = OpenAI::new(OllamaConfig::default()).with_model(llmType);

        let chain = ConversationalRetrieverChainBuilder::new()
            .llm(llm)
            .rephrase_question(true)
            .retriever(Retriever::new(store, 4))
            .build()?;

        Ok(Self { chain })
    }

    pub async fn ask_question(&self, question: &str) -> Result<String, Box<dyn std::error::Error>> {
        let input = prompt_args! {
            "question" => question,
        };

        let result = self.chain.invoke(input).await?;
        Ok(result)
    }
}

#[tauri::command]
pub async fn register_pdf(
    file: String,
    llm: String,
    state: tauri::State<'_, AppState>,
) -> Result<String, String> {
    println!("{}", llm);
    println!("{}", file);
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
) -> Result<String, String> {
    let chat_service_arc = {
        let guard = state.chat_service.lock().unwrap();
        guard.clone() // Clone the Arc, not the ChatService
    }; // Guard dropped here

    match chat_service_arc {
        Some(chat_service) => chat_service
            .ask_question(&question)
            .await
            .map_err(|e| format!("Error asking question: {}", e)),
        None => Err("Chat service not initialized. Please load a PDF file first.".to_string()),
    }
}
