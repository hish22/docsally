use ollama_rs::Ollama;

#[tauri::command]
pub async fn ollama_list() -> Vec<String> {
    // Use ollama_rs instead
    let ollama = Ollama::default();

    let mut models: Vec<String> = Vec::new();

    for model in ollama.list_local_models().await.unwrap() {
        models.push(model.name);
    }
    models
}
