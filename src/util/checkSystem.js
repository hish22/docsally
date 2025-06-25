import { invoke } from "@tauri-apps/api/core";
import { exit } from "@tauri-apps/plugin-process";
export default function checkSystem() {
    invoke("check_system").then((check) => {
        if(!check) {
            exit(1);
        }
    });
}