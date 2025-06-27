import "./../App.css";

// Import of icons
import deepseek_r1 from "./../assets/icons/models/deepseek-r1.png";
import devstral from "./../assets/icons/models/devstral.png";
import qwen3 from "./../assets/icons/models/qwen3.png";
import gemma3 from "./../assets/icons/models/gemma3.png";
import llama4 from"./../assets/icons/models/llama4.png";
import phi_4 from "./../assets/icons/models/Microsoft_icon.svg.png";
import mistral from "./../assets/icons/models/mistral-color.svg";
import olmo from "./../assets/icons/models/olmo.png";
import specificOsStyle from "../util/osSpecificStyle";
import { useEffect, useState } from "react";

export default function OptionsSection({installNote,setOllama,ollamaList,setSelectedModel,disableModelSelection}) {

    useEffect(() => {
        // Apply specific OS style.
        specificOsStyle();
    },[]);

    const [selected,setSelected] = useState("");

    const models = [{
            name: "deepseek",
            icon: deepseek_r1
        },{
            name: "devstral",
            icon: devstral
        },{
            name: "qwen",
            icon: qwen3
        },{
            name: "gemma",
            icon: gemma3
        },{
            name: "llama",
            icon: llama4
        },{
            name: "phi",
            icon: phi_4
        },{
            name: "mistral",
            icon: mistral
        },{
            name: "qwq",
            icon: qwen3
        },{
            name: "olmo",
            icon: olmo
        }];

        const splitedList = selected.split(":");

        const filteredIcon = models.filter((item) => splitedList[0].trim().includes(item.name));
        
    return (
        <>
            <section id="options-section">
                <div className="flex">
                    {splitedList[0].trim() ? filteredIcon.map((item,index) => (
                        <img key={index} src={item.icon} width={30}/>
                    )): null}
                    <select name="ollamas" id="ollama-select"
                    disabled={disableModelSelection}
                     onChange={e=>{setOllama(e.target.value); setSelected(e.target.value); setSelectedModel(e.target.value)}}>
                    <option value={""}>Select Model</option>
                    {ollamaList.filter((item) => item != "nomic-embed-text:latest").map((item,index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                    </select>
                    {installNote ? <p>installing nomic-embed-text..</p> : null}
                </div>
                {/* {nomicState ? <button onClick={createNomicEmbedTextModel}>Install nomic-embed-text</button> : null} */}
                {/* {console.log(nomicState)} */}
            </section>
        </>
    );
}