use logic::entry::entry;
use logic::ollama_embeddings::ollama_embeddings;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
use utils::install_nomic_embed_text::install_nemt;
use utils::ollama_list::ollama_list;
mod logic;
mod utils;

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            ollama_list,
            install_nemt,
            ollama_embeddings,
            entry
        ])
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
