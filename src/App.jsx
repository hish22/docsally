import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { invoke } from "@tauri-apps/api/core";
import nomicStatus from "./util/NomicEmbedStates";
import UpperSection from "./components/upperSection";
import OptionsSection from "./components/optionsSection";
import checkSystem from "./util/checkSystem";
import "./App.css";
import InstallDepSection from "./components/installDepSection";
import createNomicEmbedTextModel from "./util/installNomicEmbedText";
import { load } from "@tauri-apps/plugin-store";
// Check if the platform is not out of bound.
checkSystem();

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const store = await load("settings.json",{ autoSave: false });

function App() {

  // const [nomicFound,setNomicFound] = useState(nomicStatus());
  const [selectedModel,setSelectedModel] = useState("");
  const [ollama,setOllama] = useState("");
  const [ollamaList, setOllamaList] = useState([]);
  const [disableModelSelection,setDisableModelSelection] = useState(false);
  const [installNote,setInstallNote] = useState(true);
  const installedNomic = useRef(false);

  useEffect(() => {
    const fetchNomicData = async () => {
      try{
        const v = await store.get("installed_nomic");
        setInstallNote(v === undefined ? false : true );
      } catch (err){
        console.log("Failed to fetch data",err);
        setInstallNote(false);
      }
    }
    fetchNomicData();
  },[])

  useEffect(() => {
    if (installedNomic.current) {return;}
    installedNomic.current = true

    const nomicInstallation = async () => {
      const status = await nomicStatus();
      setInstallNote(status);
    }

    nomicInstallation();

  },[]);

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
      <OptionsSection installNote={!installNote} setOllama={setOllama} ollamaList={ollamaList} setSelectedModel={setSelectedModel} disableModelSelection={disableModelSelection}></OptionsSection>
      <UpperSection ollama={ollama} selectedModel={selectedModel} setDisableModelSelection={setDisableModelSelection}></UpperSection>
    </section>
    </>
  )
}

export default App;
