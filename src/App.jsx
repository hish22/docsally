import {useContext, useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { invoke } from "@tauri-apps/api/core";
import UpperSection from "./components/upperSection";
import OptionsSection from "./components/optionsSection";
import checkSystem from "./util/checkSystem";

// Pages Import
import Settings from "./pages/settings/settingsPage";

// Import APP CSS
import "./App.css";
import "./css/PlatformBased.css";
import "./css/General.css";
import "./css/MainSection.css";
import "./css/OptionsSection.css";
import "./css/DocumentSection.css";
import "./css/ChatSection.css";
import { load } from "@tauri-apps/plugin-store";

// Import Settings CSS
import "./pages/settings/css/Settings.css";
import ModelSection from "./components/modelSection";

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
  const [openSettings,setOpenSettings] = useState(false);
  const [openModels,setOpenModels] = useState(0);
  // const [installNote,setInstallNote] = useState(true);
  const [pageNumber,setPageNumber] = useState(null);

  // useEffect(() => {
  //   const fetchNomicData = async () => {
  //     try{
  //       const status = await checkNomic();
  //       console.log(status);
  //       setInstallNote(status);
  //       if(!status) {
  //           const store = await load("settings.json",{ autoSave: false });
  //           const installed = await createNomicEmbedTextModel();
  //           const status = await store.set("installed_nomic",installed);
  //           await store.save();
  //           setInstallNote(status);
  //       }
  //     } catch (err){
  //       console.log("Failed to fetch data",err);
  //       setInstallNote(false);
  //     }
  //   }
  //   fetchNomicData();
  // },[installNote])

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
      <section id="main-page" style={openSettings ? {display: "none"}:{display:"flex"}}  >
        <OptionsSection pageNumber={pageNumber} 
                        setOllama={setOllama} 
                        ollamaList={ollamaList} 
                        setSelectedModel={setSelectedModel} 
                        disableModelSelection={disableModelSelection}>
        </OptionsSection>
        <UpperSection setPageNumber={setPageNumber} 
                      ollama={ollama} 
                      selectedModel={selectedModel} 
                      setDisableModelSelection={setDisableModelSelection} 
                      setOpenSettings={setOpenSettings} 
                      setOpenModels={setOpenModels} 
                      openModels={openModels} 
                      openSettings={openSettings}>
        </UpperSection>
      </section>
      <section id="settings-page" style={openSettings ? {display: "block"}:{display:"none"}}>
        <Settings setOpenSettings={setOpenSettings}></Settings>
      </section>
      <section>
        <ModelSection ollamaList={ollamaList} 
                      openModels={openModels} 
                      setSelectedModel={setSelectedModel} 
                      setOllama={setOllama}/>
      </section>
    </>
  )
}

export default App;
