use std::process::Command;

pub fn run_ollama() {
    #[cfg(any(target_os = "linux", target_os = "macos"))]
    {
        Command::new("sh")
            .arg("ollama list")
            .spawn()
            .expect("Failed to run .sh sidecar");
    }

    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args(["/C", "ollama list"])
            .spawn()
            .expect("Failed to run .cmd ollama");
    }
}
