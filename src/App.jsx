import { useState } from "react";
import UpperSection from "./components/upperSection";
import OptionsSection from "./components/OptionsSection";
import "./App.css";

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
