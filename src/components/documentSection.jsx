import "./../App.css";
import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";
import DocumentExport from "./documentExport";
import { useState, useMemo, createContext } from "react";
import { invoke } from "@tauri-apps/api/core";
import loading from "./../assets/icons/animated/tube-spinner.svg";
import ollamaIcon from "./../assets/icons/tools/ollama.svg";

export default function DocumentSection({ollama,setDisableChat,selectedModel}) {

    const [uploadedFile,setUploadedFile] = useState(null);
    const [fileContent,setFileContent] = useState(null);
    const [loadedDocument,setLoadedDocument] = useState(false);

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
    // No recreation or recompute until the dep changes
    const memoizedFile = useMemo(() => fileContent ? { data: fileContent } : null, [fileContent]);

    return(
        <div id="document-div">
            {uploadedFile && loadedDocument ? <DocumentExport docData={memoizedFile}/> : null}
            {uploadedFile && !loadedDocument ? <img src={loading} width={100}/> : null}
            <form id="upload-form">
                {!uploadedFile && selectedModel ? (
                    <>
                        <button type="button" name="uploadDocBut" onClick={handleFile}>🗎 Upload</button>
                        {/* <input type="file" accept="application/pdf" onChange={handleFile}></input> */}
                        <p id="documentTypeText"> ☺ Content to be discussed about</p>
                    </>
                ) : !uploadedFile ? <>
                        <img src={ollamaIcon} width={100} id="ollamaIcon"/>
                        <p id="documentTypeText"> Select Model To Start A Conversation.</p>
                    </> 
                    : null
                    }
            </form>
        </div>
    );
}