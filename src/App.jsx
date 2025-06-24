import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { invoke } from "@tauri-apps/api/core";
import nomicStatus from "./util/NomicEmbedStates";
import UpperSection from "./components/upperSection";
import OptionsSection from "./components/optionsSection";

import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {

  // const [nomicFound,setNomicFound] = useState(nomicStatus());
  const [selectedModel,setSelectedModel] = useState("");
  const [ollama,setOllama] = useState("");
  const [ollamaList, setOllamaList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      invoke('ollama_list').then((list) => {setOllamaList(list);});
    }
    fetchList();
  },[]);

  return (
    <>
    <section id="main-section">
      <OptionsSection setOllama={setOllama} ollamaList={ollamaList} setSelectedModel={setSelectedModel}></OptionsSection>
      <UpperSection ollama={ollama} selectedModel={selectedModel}></UpperSection>
    </section>
    </>
  )
}

export default App;
