import "./../App.css";
import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";
import DocumentExport from "./documentExport";
import { useState, useMemo, createContext, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import loading from "./../assets/icons/animated/tube-spinner.svg";
import ollamaIcon from "./../assets/icons/tools/ollama.svg";
import { listen } from "@tauri-apps/api/event";
import Switcher11 from "./Switcher";
import SelectFromState from "../util/store/select/selectQuery";
import { appDataDir, join } from "@tauri-apps/api/path";
import ReplaceSlash from "../util/slashReplace";
import deleteIcon from "../assets/icons/app/delete.svg";
import loadIcon from "../assets/icons/app/load.svg";

import DeleteFromChat from "../util/store/delete/deleteFromChat";
import DeleteFromFile from "../util/store/delete/deleteFromFile";
import DeleteFromState from "../util/store/delete/deleteFromState";
import DeleteFromStateChat from "../util/store/delete/deleteFromStateChat";
import DeletePDFFile from "../util/store/deletePDFFile";




export default function DocumentSection({setPageNumber,
    ollama,
    setDisableChat,
    selectedModel,
    setDisableModelSelection,
    setDisableStateSelection,
    setDisableSaveButton,
    uploadedFile,
    setUploadedFile,
    savedChats,
    setShowNotify,
    showNotify,
    setSavedChats,
    setFileID,
    setStateID,
    setStateChatID,
    setOllama,
    setSelectedModel
}) {

    // const [uploadedFile,setUploadedFile] = useState(null);
    const [fileContent,setFileContent] = useState(null);
    const [loadedDocument,setLoadedDocument] = useState(false);

    const [loadedStates,setLoadedStates] = useState([]);

    const showErr = (e) => {
        setShowNotify(true);
        { showNotify && <Notify message={e} onClose={() => setShowNotify(false)}/>}
    }

    const updateState = () => {
        SelectFromState("SELECT * FROM states AS s INNER JOIN files As f ON s.file_id = f.file_id INNER JOIN state_chat As sc ON s.state_id = sc.state_id;").then((state) =>
            setLoadedStates(state)
        ).catch((e) => showErr(e.message));      
    }
  
    useEffect(() => {
        updateState();
    },[]);
    
    const handleSavedStateFile = async (path,ollama) => {

        setSavedChats(false);
        setOllama(ollama);
        setSelectedModel(ollama);
        const pdfFile = ReplaceSlash(path);
        const file = await join(await appDataDir(), "pdf", pdfFile[pdfFile.length - 1]);
        const llm = ollama;

        if(path) {
            await setUploadedFile(file);
            console.log(file);
            setDisableModelSelection(true);
            setDisableStateSelection(true);
            setDisableSaveButton(true);
            await invoke('register_pdf',{file: file, llm: llm}).then((payload) => {
                setLoadedDocument(() => payload === "Chat service initialized successfully" ? true : false);
                setDisableChat(false);
            });
        }

        const data = readFile(file);
        data.then((uin8data) => {
            setFileContent(uin8data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleFile = async () => {

        const path = await open({
            multiple: false,
            directory: false,
            filters: [{name:"PDF Files",extensions:["pdf"]}]
        });

        if(path) {
            await setUploadedFile(path);
            const file = path;
            const llm = ollama;
            setDisableModelSelection(true);
            setDisableStateSelection(true);
            setDisableSaveButton(true);
            invoke('register_pdf',{file: file, llm: llm}).then((payload) => {
                setLoadedDocument(() => payload === "Chat service initialized successfully" ? true : false);
                setDisableChat(false);
            });
        }

        const data = readFile(path);
        data.then((uin8data) => {
            setFileContent(uin8data);
        }).catch(err => {
            console.log(err);
        });

    }

    const handleDeleteState = async (state_chat_id,file_id,state_id,pdf_location) => {
        await DeleteFromChat(state_chat_id);
        await DeleteFromStateChat(state_id);
        await DeleteFromState(file_id);
        await DeleteFromFile(file_id)
        await DeletePDFFile(pdf_location);      
        updateState();
    }
    
  
    useEffect(() => {
        if(!loadedDocument) {
            setUploadedFile(null);
        }
    },[loadedDocument])

    // No recreation or recompute until the dep changes
    const memoizedFile = useMemo(() => fileContent ? { data: fileContent } : null, [fileContent]);

    return(
        <>
        {savedChats ?
            <div className="h-[100vh] p-2">
                <h1 className="text-2xl m-4">Saved States</h1>
                {loadedStates.length == 0 && <h1 className="m-6">No saved states</h1>}
                {loadedStates.length != 0 && loadedStates.map((s,index) => (
                    <div key={index} className="inline-block m-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-all duration-200 border border-neutral-700 p-5 shadow-md hover:shadow-lg">
                        <div 
                      > 
                            <h1>{s.name}</h1>
                            <p className=" text-[12px]">{s.file_id}:{s.state_id}</p>
                            <p>{s.location}</p>
                            <p>{s.model_name}</p>
                            <p><span className=" font-bold">Created At:</span> {s.created_at}</p>
                        </div>
                        <div className="flex">
                            <img src={loadIcon} width={25} onClick={() => {
                            console.log(s.location);
                            handleSavedStateFile(s.location,s.model_name);
                            setFileID(s.file_id);
                            setStateID(s.state_id);
                            setStateChatID(s.state_chat_id);
                        }} 
                        className="cursor-pointer"
                        />
                            <img src={deleteIcon} width={25} className="cursor-pointer ml-2" onClick={
                                () => {
                                   console.log(s.location);
                                   handleDeleteState(s.state_chat_id,s.file_id,s.state_id,s.location); 
                                }
                            } />
                        </div>
                    </div>
                )
                )}
            </div>
            : 
        <div id="document-div">
            {uploadedFile && loadedDocument ? <DocumentExport setPageNumber={setPageNumber} docData={memoizedFile}/> : null}
            {uploadedFile && !loadedDocument ? <img src={loading} width={100}/> : null}
            <form id="upload-form">
                {!uploadedFile && selectedModel ? (
                <>
                    <button type="button" name="uploadDocBut" onClick={handleFile}>🗎 Upload</button>
                    {/* <input type="file" accept="application/pdf" onChange={handleFile}></input> */}
                    <p id="documentTypeText"> ☺ Content to be discussed about</p>
                </>
                ) : !uploadedFile ? <>
                    <img className="w-25 mx-auto" src={ollamaIcon}  id="ollamaIcon"/>
                    <p id="documentTypeText"> Select Model To Start A Conversation.</p>
                </> 
                : null
                }
            </form>
            


        </div>
        }
        </>
    );
}
