import { invoke } from "@tauri-apps/api/core";

// Installing nomic-embed-text model

export default async function createNomicEmbedTextModel() {
    const status = await invoke("install_nemt");
    return status;
}