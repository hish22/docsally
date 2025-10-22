use logic::entry::ask_question;
use logic::entry::register_pdf;
use logic::entry::AppState;
// use utils::check_nomic::check_nomic;
use utils::check_system::check_system;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
// use utils::install_nomic_embed_text::install_nemt;
use utils::ollama_list::ollama_list;
mod check_nomic;
mod install_nomic_embed_text;
mod logic;
mod run_ollama;
mod utils;
pub fn run() {
    // Starting ollama.exe process before docsally
    let r = run_ollama::run_ollama();

    if r.success() {
        let cn = check_nomic::check_nomic();

        if !cn.success() {
            install_nomic_embed_text::install_nemt();
        }
        tauri::Builder::default()
            .plugin(tauri_plugin_shell::init())
            .plugin(tauri_plugin_store::Builder::new().build())
            .plugin(tauri_plugin_process::init())
            .manage(AppState::default())
            .invoke_handler(tauri::generate_handler![
                check_system,
                ollama_list,
                // install_nemt,
                register_pdf,
                ask_question,
                // check_nomic
            ])
            .plugin(tauri_plugin_fs::init())
            .plugin(tauri_plugin_dialog::init())
            .plugin(tauri_plugin_opener::init())
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    } else {
        eprintln!("{}", "Failed to find ollama!");
    }
}
