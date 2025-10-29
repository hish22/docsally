//! Utilities for detecting the presence of the Nomic `nomic-embed-text`
//! model using the `ollama_rs` client library.
//!
//! The crate exposes a small Tauri command, `check_nomic()`, which returns a
//! boolean indicating whether the `nomic-embed-text` model is available. The
//! implementation delegates to the async helper `search_for_embedmodel()` that
//! queries the local Ollama daemon through `ollama_rs` and maps success/failure
//! to `true`/`false` respectively. This keeps the frontend logic simple—only
//! a boolean result is returned to indicate presence of the model.

use ollama_rs::Ollama;

/// Tauri command that returns `true` when the `nomic-embed-text` model is
/// available and `false` otherwise.
///
/// This is a thin synchronous wrapper around the async helper
/// `search_for_embedmodel()` so it can be called directly from the frontend.
#[tauri::command]
pub fn check_nomic() -> bool {
    search_for_embedmodel()
}
#[tokio::main]
pub async fn search_for_embedmodel() -> bool {
    // Query the local Ollama daemon via the `ollama_rs` client. We only need
    // to know whether the model info request succeeds; the detailed model
    // metadata is not required here.
    let ollama_model = Ollama::default()
        .show_model_info("nomic-embed-text".to_string())
        .await;

    match ollama_model {
        Ok(_) => true,
        Err(_) => false,
    }
}
