import ChatSection from "./chatSection";
import DocumentSection from "./documentSection";
import "./../App.css";
import { useState } from "react";

export default function UpperSection({setPageNumber,ollama,selectedModel,setOpenSettings,setDisableModelSelection,setOpenModels,openModels,openSettings}) {

    const [disableChat,setDisableChat] = useState(true);

    return (
        <section id="upper-section">
            <ChatSection ollama={ollama} disableChat={disableChat} setOpenSettings={setOpenSettings} setOpenModels={setOpenModels} openModels={openModels} openSetting={openSettings}/>
            <DocumentSection setPageNumber={setPageNumber} ollama={ollama} setDisableChat={setDisableChat} selectedModel={selectedModel} setDisableModelSelection={setDisableModelSelection}/>
        </section>
    );
}