import { invoke } from "@tauri-apps/api/core";
import { load } from "@tauri-apps/plugin-store";
import createNomicEmbedTextModel from "./installNomicEmbedText";
const store = await load("settings.json",{ autoSave: false });
export default async function nomicStatus() {
    
    // await store.set("test",true);
    // console.log(await store.get("test"));

    try{
        const nomicGet = await store.get("installed_nomic");
        if(!nomicGet) {
            console.log(nomicGet);
            console.log("installing nomic");
            await createNomicEmbedTextModel();
            await store.set("installed_nomic",true);
            const updated = await store.get("installed_nomic")
            await store.save();
            console.log(updated);
            return updated;
        } else {
            return nomicGet;
        }
    } catch {
        await store.set("installed_nomic",false)
    }
}