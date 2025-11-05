use tauri_plugin_dialog::{DialogExt, MessageDialogKind};

use chat_operations::entry::ask_question;
use chat_operations::entry::register_pdf;
use chat_operations::entry::AppState;
use serde_json::json;
use tauri_plugin_store::StoreExt;
// use utils::check_nomic::check_nomic;
use utils::check_system::check_system;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
// use utils::install_nomic_embed_text::install_nemt;
use utils::ollama_list::ollama_list;

use persistence::tables_migration::state_system_table_migrations;

mod chat_operations;
mod check_nomic;
mod install_nomic_embed_text;
mod pdf_operations;
mod persistence;
mod run_ollama;
mod utils;
pub fn run() {
    // Starting ollama.exe process before docsally
    let r = run_ollama::run_ollama();

    if r {
        let cn = check_nomic::check_nomic();

        if !cn {
            install_nomic_embed_text::install_nemt();
        }
        tauri::Builder::default()
            .plugin(tauri_plugin_sql::Builder::new().build())
            .plugin(
                tauri_plugin_sql::Builder::default()
                    .add_migrations("sqlite:state.db", state_system_table_migrations())
                    .build(),
            )
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
            .setup(|app| {
                // Init model settings json file
                let store = app.store("model_set.json")?;

                if store.get("chunk-size").is_none() {
                    store.set("chunk-size", json!(1000));
                }

                if store.get("overlap-size").is_none() {
                    store.set("overlap-size", json!(200));
                }

                store.save()?;
                Ok(())
            })
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    } else {
        tauri::Builder::default()
            .plugin(tauri_plugin_dialog::init())
            .setup(|app| {
                app.dialog()
                    .message("Failed to find Ollama, Please run ollama to use docsally!")
                    .kind(MessageDialogKind::Error)
                    .title("Error")
                    .blocking_show();
                app.handle().exit(1);
                Ok(())
            })
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
        eprintln!("{}", "Failed to find ollama!");
    }
}
