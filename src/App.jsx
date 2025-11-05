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
import SaveAsBox from "./components/saveAsBox";

// Check if the platform is not out of bound.
checkSystem();

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {

  const [selectedModel,setSelectedModel] = useState("");
  const [ollama,setOllama] = useState("");
  const [ollamaList, setOllamaList] = useState([]);
  const [disableModelSelection,setDisableModelSelection] = useState(false);
  const [disableStateSelection,setDisableStateSelection] = useState(false);
  const [disableSaveButton,setDisableSaveButton] = useState(false);
  const [openSettings,setOpenSettings] = useState(false);
  const [openModels,setOpenModels] = useState(0);
  const [pageNumber,setPageNumber] = useState(null);
  const [uploadedFile,setUploadedFile] = useState(null);

  const [openSaveAsPanel,setOpenSaveAsPanel] = useState(false);

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
      <section id="main-page" style={openSettings ? {display: "none"}:{display:"flex"}} onClick={() => {openModels && setOpenModels(0)}}>
        <OptionsSection disableStateSelection={disableStateSelection}
                        setOllama={setOllama} 
                        ollamaList={ollamaList} 
                        setSelectedModel={setSelectedModel} 
                        disableModelSelection={disableModelSelection}>
        </OptionsSection>
        <UpperSection setPageNumber={setPageNumber}
                      pageNumber={pageNumber}  
                      ollama={ollama} 
                      selectedModel={selectedModel} 
                      setDisableModelSelection={setDisableModelSelection}
                      disableModelSelection={disableModelSelection}
                      setOpenSettings={setOpenSettings} 
                      setOpenModels={setOpenModels} 
                      openModels={openModels} 
                      openSettings={openSettings}
                      setDisableStateSelection={setDisableStateSelection}
                      disableSaveButton={disableSaveButton}
                      setDisableSaveButton={setDisableSaveButton}
                      uploadedFile={uploadedFile}
                      setUploadedFile={setUploadedFile}
                      setOpenSaveAsPanel={setOpenSaveAsPanel}
                      >
        </UpperSection>
      </section>
      <section id="settings-page" style={openSettings ? {display: "block"}:{display:"none"}}>
        <Settings setOpenSettings={setOpenSettings}></Settings>
      </section>
      <section id="models-modal">
        <ModelSection ollamaList={ollamaList} 
                      openModels={openModels} 
                      setSelectedModel={setSelectedModel} 
                      setOllama={setOllama}
                      setOpenModels={setOpenModels}
                      />
      </section>
      <section style={openSaveAsPanel ? {display: "block"}:{display:"none"}}>
        <SaveAsBox
          setOpenSaveAsPanel={setOpenSaveAsPanel}
        />
      </section>
    </>
  )
}

export default App;
