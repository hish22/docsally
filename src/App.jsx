import { useState } from "react";
import { pdfjs } from "react-pdf";

import UpperSection from "./components/upperSection";
import OptionsSection from "./components/OptionsSection";

import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


function App() {

  const [ollama,setOllama] = useState("");

  return (
    <>
    <section id="main-section">
      <OptionsSection setOllama={setOllama}></OptionsSection>
      <UpperSection ollama={ollama}></UpperSection>
    </section>
    </>
  )
}

export default App;
