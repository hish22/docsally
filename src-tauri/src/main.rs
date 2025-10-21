// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod run_ollama;

fn main() {
    // Starting ollama.exe process before docsally
    run_ollama::run_ollama();
    // Starting docsally.exe process
    docsally_lib::run()
}
