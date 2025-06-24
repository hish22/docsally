import "./../App.css";

// Import of icons
import deepseek_r1 from "./../assets/icons/models/deepseek-r1.png";
import devstral from "./../assets/icons/models/devstral.png";
import qwen3 from "./../assets/icons/models/qwen3.png";
import gemma3 from "./../assets/icons/models/gemma3.png";
import llama4 from"./../assets/icons/models/llama4.png";
import qwen2_5vl from "./../assets/icons/models/qwen2.5vl.png";
import createNomicEmbedTextModel from "../util/installNomicEmbedText";
import { useEffect, useState } from "react";

export default function OptionsSection({setOllama,ollamaList,setSelectedModel}) {

    const [selected,setSelected] = useState("");

    const models = [{
            name: "deepseek-r1",
            icon: deepseek_r1
        },{
            name: "devstral",
            icon: devstral
        },{
            name: "qwen3",
            icon: qwen3
        },{
            name: "gemma3",
            icon: gemma3
        },{
            name: "llama4",
            icon: llama4
        },{
            name: "qwen2.5vl",
            icon: qwen2_5vl
        }];

        const splitedList = selected.split(":");

        const filteredIcon = models.filter((item) => item.name === splitedList[0].trim());
        
    return (
        <>
            <section id="options-section">
                <div className="flex">
                    {filteredIcon.map((item,index) => (
                        <img key={index} src={item.icon} width={30}/>
                    ))}
                    <select name="ollamas" id="ollama-select" onChange={e=>{setOllama(e.target.value); setSelected(e.target.value); setSelectedModel(e.target.value)}}>
                    <option value={""}>Select Model</option>
                    {ollamaList.filter((item) => item != "nomic-embed-text:latest").map((item,index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                    </select>
                </div>
                {/* {nomicState ? <button onClick={createNomicEmbedTextModel}>Install nomic-embed-text</button> : null} */}
                {/* {console.log(nomicState)} */}
            </section>
        </>
    );
}