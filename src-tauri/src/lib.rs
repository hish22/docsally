use logic::entry::ask_question;
use logic::entry::register_pdf;
use logic::entry::AppState;
use utils::check_nomic::check_nomic;
use utils::check_system::check_system;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
use utils::install_nomic_embed_text::install_nemt;
use utils::ollama_list::ollama_list;
mod logic;
mod utils;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![
            check_system,
            ollama_list,
            install_nemt,
            register_pdf,
            ask_question,
            check_nomic
        ])
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
