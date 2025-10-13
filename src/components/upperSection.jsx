import ChatSection from "./chatSection";
import DocumentSection from "./documentSection";
import "./../App.css";
import { useState } from "react";

export default function UpperSection({setPageNumber,ollama,selectedModel,setOpenSettings,setDisableModelSelection}) {

    const [disableChat,setDisableChat] = useState(true);

    return (
        <section id="upper-section">
            <ChatSection ollama={ollama} disableChat={disableChat} setOpenSettings={setOpenSettings}/>
            <DocumentSection setPageNumber={setPageNumber} ollama={ollama} setDisableChat={setDisableChat} selectedModel={selectedModel} setDisableModelSelection={setDisableModelSelection}/>
        </section>
    );
}