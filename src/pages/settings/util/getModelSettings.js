import { load } from "@tauri-apps/plugin-store";


export default async function getModelSettings() {
   try {
        const store = await load("model_set.json", { autoSave: false });
        const chunk = await store.get("chunk-size");
        const overlap = await store.get("overlap-size");
        return [chunk, overlap];
    } catch (e) {
        console.error(e);
        return [0, 0]; // fallback values
    }
}