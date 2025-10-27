import { useEffect, useState } from "react";
import ConfirmButton from "../confirmButton";
import getModelSettings from "../../util/getModelSettings";
import { load } from "@tauri-apps/plugin-store";

export default function ModelSection() {

    const [chunkSize,setChunkSize] = useState("");
    const [overlapSize,setOverlapSize] = useState("");
    const [message,setMessage] = useState("");

    useEffect(() => {
        const loadSettings = async () => {
        const [chunk, overlap] = await getModelSettings();
        setChunkSize(chunk);
        setOverlapSize(overlap);
        };
        loadSettings();
    },[])

    const changeSettData = (e) => {
        e.preventDefault();
        const loadModelDataAndSave = async () => {
            const store = await load('model_set.json', {autoSave: false});

            await store.set('chunk-size',Number(chunkSize));
            await store.set('overlap-size',Number(overlapSize));

            await store.save();

            sendMessage();

        }
        loadModelDataAndSave();
    }

    const sendMessage = () => {

        setMessage("Settings Saved");

        setTimeout(() => {
            setMessage("");
        },2000);
    }

    return (
        <>
            <div className="m-9">
                <h1 className="font-bold text-5xl">Model Settings</h1>
                <h4 className="m-1">Change settings related to the RAG and model</h4>
            </div>
            {/* <hr className="w-full"></hr> */}
            <div className="w-[100vh] p-10">
            <div className="bg-neutral-900 p-12 rounded-2xl">
                <p>{message}</p>
                <form className="">
                    <div className="m-2">
                        <label htmlFor="chunks" className="p-1 font-bold">Chunk Size</label>
                        <input onChange={e => setChunkSize(e.target.value)} value={chunkSize} className="border-2 border-gray-300 rounded-md p-2  w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Change the size of Chunks" type="number" name="chunks" min={500} max={5000}></input>
                        <p>(default:1000)</p>
                    </div>
                    <div className="m-2">
                        <label htmlFor="overlap" className="p-1 font-bold">Overlap Size</label>
                        <input onChange={e => setOverlapSize(e.target.value)} value={overlapSize} className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Change the size of overlaping" type="number" name="overlap" min={50} max={500}></input>
                        <p>(default:200)</p>
                    </div>
                    <ConfirmButton action={changeSettData}></ConfirmButton>
                </form>
            </div>
        </div>
        </>

    )
}