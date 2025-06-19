import "./../App.css";
import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";
import DocumentExport from "./documentExport";
import { useState, useMemo } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function DocumentSection() {

    const [uploadedFile,setUploadedFile] = useState(null);
    const [fileContent,setFileContent] = useState(null);

    const handleFile = async () => {
        const path = await open({
            multiple: false,
            directory: false,
            filters: [{name:"PDF Files",extensions:["pdf"]}]
        });

        if(path) {
            await setUploadedFile(path);
            const file = path;
            invoke('entry',{file});
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
            {uploadedFile ? <DocumentExport docData={memoizedFile}/> : null}
            <form id="upload-form">
                {!uploadedFile ? (
                    <>
                        <button type="button" name="uploadDocBut" onClick={handleFile}>🗎 Upload</button>
                        {/* <input type="file" accept="application/pdf" onChange={handleFile}></input> */}
                        <p id="documentTypeText"> ☺ Content to be discussed about</p>
                    </>
                ) : null}
            </form>
        </div>
    );
}