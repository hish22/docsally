use crate::logic::{ollama_embeddings::ollama_embeddings, pdf_extract::extract_pdf};

#[tauri::command]
pub async fn entry(file: String) {
    let content = extract_pdf(file);
    let embeddings = ollama_embeddings(content);
    println!("{:?}", embeddings.await);
}
