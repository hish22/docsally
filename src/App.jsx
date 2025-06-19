import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { invoke } from "@tauri-apps/api/core";
import nomicStatus from "./util/NomicEmbedStates";
import UpperSection from "./components/upperSection";
import OptionsSection from "./components/OptionsSection";

import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Install nomic-embed-text
function App() {

  const [nomicFound,setNomicFound] = useState(nomicStatus());
  const [ollama,setOllama] = useState("");
  const [ollamaList, setOllamaList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      await invoke('ollama_list').then((list) => {setOllamaList(list); console.log(list)});
    }
    fetchList();
  },[]);

  return (
    <>
    <section id="main-section">
      <OptionsSection setOllama={setOllama} ollamaList={ollamaList} nomicState={nomicFound}></OptionsSection>
      <UpperSection ollama={ollama}></UpperSection>
    </section>
    </>
  )
}

export default App;
