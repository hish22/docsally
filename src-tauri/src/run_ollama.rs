use std::process::{Command, ExitStatus};

pub fn run_ollama() -> ExitStatus {
    #[cfg(any(target_os = "linux"))]
    {
        Command::new("sh")
            .args(["-c","ollama list"])
            .status()
            .expect("Failed to run .sh ollama")
    }

    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args(["/C", "ollama list"])
            .status()
            .expect("Failed to run .cmd ollama")
    }
}
