import { Document,Page } from "react-pdf"
import { useState } from "react";


const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export default function DocumentExport(props) {

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);


    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }
    return (
        <div style={{ overflowY: 'scroll', height: '90vh', padding: '1rem'  }}>
            <Document file={props.docData} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} style={{ marginBottom: '2rem' }}>
                    <Page pageNumber={index + 1} width={600} scale={1.3} renderTextLayer={false} renderAnnotationLayer={false}/>
                </div>
                ))}
            </Document>
            <p style={{position:'fixed', top:'35pt'}}>
                Pages {numPages}
            </p>
        </div>
    )
}