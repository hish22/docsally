import { useState } from "react";


export default function ModeSwithcer(props) {
  const [mode, setMode] = useState("pdf");

  const handleSwitch = (newMode) => {
    setMode(newMode);
  };

  const handlePDF = () => {
    props.setRenderText(false);
  }

  const handleText = () => {
    props.setRenderText(true);
  }

  return (
    <div className="">
      <button
        onClick={() => {
          handleSwitch("pdf");
          handlePDF();
        }}
        className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
          mode === "pdf"
            ? "bg-neutral-800 text-white shadow"
            : "bg-transparent text-gray-400 hover:text-white"
        }`}
      >
        PDF
      </button>
      <button
        onClick={() => {
          handleSwitch("text");
          handleText();
        }}
        className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
          mode === "text"
            ? "bg-neutral-800 text-white shadow"
            : "bg-transparent text-gray-400 hover:text-white"
        }`}
      >
        Text
      </button>
    </div>
  );
}