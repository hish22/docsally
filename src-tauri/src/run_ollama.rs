use ollama_rs::Ollama;

#[tokio::main]
pub async fn run_ollama() -> bool {
    // Use ollama_rs instead
    let ollama = Ollama::default();

    match ollama.list_local_models().await {
        Ok(_) => true,
        Err(_) => false,
    }
}
