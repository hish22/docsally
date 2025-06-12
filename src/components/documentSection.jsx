import "./../App.css";

import DocumentExport from "./documentExport";


export default function DocumentSection() {
    return(
        <div id="document-div">
            {/* <DocumentExport /> */}
            <form>
                <input type="button" name="uploadDocBut" value={'Upload'}></input>
                <p id="documentTypeText">pdf, word, etc..</p>
            </form>
        </div>
    );
}