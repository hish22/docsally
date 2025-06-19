use langchain_rust::embedding::embedder_trait::Embedder;
use langchain_rust::embedding::openai::OpenAiEmbedder;
use langchain_rust::llm::ollama::openai::OllamaConfig;

#[tauri::command]
pub async fn ollama_embeddings(pdf_stream: Vec<String>) -> Vec<Vec<f64>> {
    let ollama = OpenAiEmbedder::new(OllamaConfig::default()).with_model("nomic-embed-text");

    let res = ollama.embed_documents(&pdf_stream).await.unwrap();

    return res;
}
