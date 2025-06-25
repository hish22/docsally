use std::process::Command;

#[tauri::command]
pub fn ollama_list() -> Vec<String> {
    let opitions = cmd_type();

    let cmd = Command::new(&opitions[0])
        .args([&opitions[1], "ollama list"])
        .output()
        .expect("failed to execute cmd process");

    let mut models: Vec<String> = Vec::new();
    if cmd.status.success() {
        let list = String::from_utf8_lossy(&cmd.stdout).to_string();
        let listvec: Vec<String> = list.split('\n').map(|s| s.to_string()).collect();
        for i in 1..listvec.len().saturating_sub(1) {
            let model_name: Vec<&str> = listvec[i].split_whitespace().collect();
            models.push(model_name.get(0).unwrap().to_string());
        }
    }
    return models;
}

fn cmd_type() -> Vec<String> {
    let os = os_info::get();
    let mut args = vec![];
    match os.os_type() {
        os_info::Type::Windows => {
            args.push("powershell".to_string());
            args.push("/C".to_string());
        }
        os_info::Type::Ubuntu => {
            args.push("bash".to_string());
            args.push("-c".to_string());
        }
        _ => {
            args.push("unknown".to_string());
        }
    }
    args
}
