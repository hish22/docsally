import { Document,Page } from "react-pdf"
import { useEffect, useRef, useState } from "react";
import ModeSwithcer from "./ModeSwitcher";
import Markdown from "react-markdown";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';


const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export default function DocumentExport(props) {

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const [renderText,setRenderText] = useState(false);
    const [renderMode,setRenderMode] = useState("canvas");

    const [scale,setscale] = useState(1.3);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
        props.setPageNumber(numPages+" pages");
    }

    function handleTextSelection() {
        const selection = window.getSelection();
        const text = selection?.toString();

        if (text?.trim()) {
            console.log("Selected text:", text);
            // You can now trigger something, store it, highlight it, etc.
        }
    }

    const DocRef = useRef(null);

    const increaseOrDecreaseScale = (event) => {
        const key = event.key.toLowerCase();
        if (key === "shift" && scale <= 2.0) {
            setscale((prev) => prev + 0.1);
        } else if (key === "alt" && scale >= 1.3) {
            setscale((prev) => prev - 0.1);
        }
    }

    useEffect(() => {
        DocRef.current?.focus();
    },[]);

    return (
        <div>
            <ModeSwithcer setRenderText={setRenderText} setRenderMode={setRenderMode}/>
            <div id="document-Wrapper" ref={DocRef} onKeyDown={increaseOrDecreaseScale} tabIndex={0}>
                <div onMouseUp={handleTextSelection} options={options}>
                <Document file={props.docData} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} style={{ marginBottom: '2rem', color:"black", fontSize:"25px"}}>
                        {/* <Page pageNumber={index + 1} className={renderText && " text-left p-12"} width={600} scale={scale} renderMode={renderMode} renderTextLayer={renderText} renderAnnotationLayer={false}/> */}
                        <Page
                        pageNumber={index + 1}
                        className={renderText ? "m-1" : ""}
                        width={600}
                        scale={scale}
                        renderTextLayer={renderText}
                        customTextRenderer={({ str }) => {
                            return str.replace(
                                /Tauri/gi,
                                match => `<span>${match}</span>`
                            )
                        }}
                        renderAnnotationLayer={true}
                        />
                    </div>
                    ))}
                </Document>
                </div>
            </div>
        </div>
    )
}