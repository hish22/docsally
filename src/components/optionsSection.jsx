import "./../App.css";

// Import of icons
import deepseek_r1 from "./../assets/icons/models/deepseek-r1.png";
import devstral from "./../assets/icons/models/devstral.png";
import qwen3 from "./../assets/icons/models/qwen3.png";
import gemma3 from "./../assets/icons/models/gemma3.png";
import llama4 from"./../assets/icons/models/llama4.png";
import qwen2_5vl from "./../assets/icons/models/qwen2.5vl.png";
import { useState } from "react";

export default function OptionsSection({setOllama}) {

    const [selected,setSelected] = useState(null);

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

        const filteredIcon = models.filter((item) => item.name === selected);

    return (
        <>
            <section id="options-section" className="flex">
                {/* <button>+</button> */}
                {filteredIcon.map((item,index) => (
                    <img src={item.icon} width={30}/>
                ))}
                <select name="ollamas" id="ollama-select" onChange={e=>{setOllama(e.target.value); setSelected(e.target.value)}}>
                <option value={""}>Select Model</option>
                {models.map((item,index) => (
                    <option key={index} value={item.name}> {item.name}</option>
                ))}
                
                {/* <option value={"qwen3"}>qwen3</option>
                <option value={"llama4"}>llama4</option> */}
                </select>
            </section>
        </>
    );
}