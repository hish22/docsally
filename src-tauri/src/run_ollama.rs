use std::process::{Command, ExitStatus};

pub fn run_ollama() -> ExitStatus {
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
            .status()
            .expect("Failed to run .cmd ollama")
    }
}
