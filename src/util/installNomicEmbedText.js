import { invoke } from "@tauri-apps/api/core";

// Installing nomic-embed-text model

export default async function createNomicEmbedTextModel() {
    invoke("install_nemt");
}

