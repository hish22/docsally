import { invoke } from "@tauri-apps/api/core";


export default async function nomicStatus() {
    // grap list of models
    let isFound = false; // by defualt not found.
    await invoke('ollama_list').then(
    (list) => {
        list.forEach(model => {
            if(model.split(':')[0] === "nomic-embed-text") {
                isFound = true;
            }
        });
    }
    );
    return !isFound;
}