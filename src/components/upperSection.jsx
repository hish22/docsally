import ChatSection from "./chatSection";
import DocumentSection from "./documentSection";
import "./../App.css";
import { useState } from "react";

export default function UpperSection({setPageNumber,
    ollama,
    selectedModel
    ,setOpenSettings
    ,setDisableModelSelection
    ,setOpenModels,
    openModels,
    openSettings,
    disableModelSelection,
    pageNumber,
    setDisableStateSelection,
    disableSaveButton,
    setDisableSaveButton,
    setUploadedFile,
    uploadedFile,
    setOpenSaveAsPanel,
    setChats
}) {

    const [disableChat,setDisableChat] = useState(true);

    return (
        <section id="upper-section">
            <ChatSection ollama={ollama} 
            disableChat={disableChat} 
            setOpenSettings={setOpenSettings} 
            setOpenModels={setOpenModels} 
            openModels={openModels} 
            openSetting={openSettings} 
            disableModelSelection={disableModelSelection} 
            pageNumber={pageNumber}
            disableSaveButton={disableSaveButton}
            uploadedFile={uploadedFile}
            setOpenSaveAsPanel={setOpenSaveAsPanel}
            setChats={setChats}
            />
            
            <DocumentSection 
            setPageNumber={setPageNumber} 
            ollama={ollama} 
            setDisableChat={setDisableChat} 
            selectedModel={selectedModel} 
            setDisableModelSelection={setDisableModelSelection} 
            setDisableStateSelection={setDisableStateSelection}
            setDisableSaveButton={setDisableSaveButton}
            setUploadedFile={setUploadedFile}
            uploadedFile={uploadedFile}
            />
        </section>
    );
}