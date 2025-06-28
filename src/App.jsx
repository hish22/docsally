import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { invoke } from "@tauri-apps/api/core";
import UpperSection from "./components/upperSection";
import OptionsSection from "./components/optionsSection";
import checkSystem from "./util/checkSystem";
import createNomicEmbedTextModel from "./util/installNomicEmbedText";
import "./App.css";
import { load } from "@tauri-apps/plugin-store";
import checkNomic from "./util/checkNomicEmbedText";
// Check if the platform is not out of bound.
checkSystem();

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {

  // const [nomicFound,setNomicFound] = useState(nomicStatus());
  const [selectedModel,setSelectedModel] = useState("");
  const [ollama,setOllama] = useState("");
  const [ollamaList, setOllamaList] = useState([]);
  const [disableModelSelection,setDisableModelSelection] = useState(false);
  const [installNote,setInstallNote] = useState(true);
  const [pageNumber,setPageNumber] = useState(null);
  
  useEffect(() => {
    const fetchNomicData = async () => {
      try{
        const status = await checkNomic();
        console.log(status);
        setInstallNote(status);
        if(!status) {
            const store = await load("settings.json",{ autoSave: false });
            const installed = await createNomicEmbedTextModel();
            const status = await store.set("installed_nomic",installed);
            await store.save();
            setInstallNote(status);
        }
      } catch (err){
        console.log("Failed to fetch data",err);
        setInstallNote(false);
      }
    }
    fetchNomicData();
  },[installNote])

  // useEffect(() => {
  //   if (installedNomic.current) {return;}
  //   installedNomic.current = true

  //   const nomicStatusCheck = async () => {
  //     const status = await nomicStatus();
  //     setInstallNote(status);
  //   }

  //   nomicStatusCheck();

  // },[]);

  useEffect(() => {
    const fetchList = async () => {
      await invoke('ollama_list').then((list) => {
        setOllamaList(list);
      });
    }
    fetchList();
  },[]);

  return (
    <>
    <section id="main-section">
      <OptionsSection pageNumber={pageNumber} installNote={!installNote} setOllama={setOllama} ollamaList={ollamaList} setSelectedModel={setSelectedModel} disableModelSelection={disableModelSelection}></OptionsSection>
      <UpperSection setPageNumber={setPageNumber} ollama={ollama} selectedModel={selectedModel} setDisableModelSelection={setDisableModelSelection}></UpperSection>
    </section>
    </>
  )
}

export default App;
