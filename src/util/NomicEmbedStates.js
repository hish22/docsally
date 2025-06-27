import { load } from "@tauri-apps/plugin-store";
import createNomicEmbedTextModel from "./installNomicEmbedText";
export default async function nomicStatus() {
    
    // await store.set("test",true);
    // console.log(await store.get("test"));

    try{
        async function loadStore() {
            const store = await load("settings.json",{ autoSave: false });
            const nomicGet = await store.get("installed_nomic");
            if(!nomicGet) {
                await createNomicEmbedTextModel();
                await store.set("installed_nomic",true);
                const updated = await store.get("installed_nomic")
                await store.save();
                return updated;
            } else {
                return nomicGet;
            }
        }

        return loadStore();

    } catch {
        await store.set("installed_nomic",false)
    }
}