import { Document,Page } from "react-pdf"
import { useEffect, useRef, useState } from "react";


const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export default function DocumentExport(props) {

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const [scale,setscale] = useState(1.3);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
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
        if (key === "control" && scale <= 2.0) {
            setscale((prev) => prev + 0.1);
        } else if (key === "alt" && scale >= 1.3) {
            setscale((prev) => prev - 0.1);
        }
    }

    useEffect(() => {
        DocRef.current?.focus();
    },[]);

    return (
        <div id="document-Wrapper" ref={DocRef} onKeyDown={increaseOrDecreaseScale} tabIndex={0}>
            <p>
                Pages {numPages}
            </p>
            <div onMouseUp={handleTextSelection} options={options}>
            <Document file={props.docData} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} style={{ marginBottom: '2rem' }}>
                    <Page pageNumber={index + 1} width={600} scale={scale} renderTextLayer={false} renderAnnotationLayer={false}/>
                </div>
                ))}
            </Document>
            </div>
        </div>
    )
}