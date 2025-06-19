use std::process::Command;

#[tauri::command]
pub fn install_nemt() -> () {
    let cmd = Command::new("powershell")
        .args(["/C", "ollama pull nomic-embed-text"])
        .output()
        .expect("failed of installing nomic-embed-text");
    println!("{:?}", cmd);
}
