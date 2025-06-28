import { invoke } from "@tauri-apps/api/core";

export default async function checkNomic() {
    return await invoke("check_nomic");
}