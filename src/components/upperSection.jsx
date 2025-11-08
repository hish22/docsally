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
    setChats,
    fileID,
    stateID,
    stateChatID,
    savedChats,
    showNotify,
    setShowNotify,
    setSavedChats,
    setFileID,
    setStateID,
    setStateChatID,
    setOllama,
    chats,
    setChatSeq,
    chatSeq
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
            fileID={fileID}
            stateID={stateID}
            stateChatID={stateChatID}
            savedChats={savedChats}
            setShowNotify={setShowNotify}
            showNotify={showNotify}
            chats={chats}
            setChatSeq={setChatSeq}
            chatSeq={chatSeq}
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
            savedChats={savedChats}
            showNotify={showNotify}
            setShowNotify={setShowNotify}
            setSavedChats={setSavedChats}
            setFileID={setFileID}
            setStateID={setStateID}
            setStateChatID={setStateChatID}
            setOllama={setOllama}
            />
        </section>
    );
}