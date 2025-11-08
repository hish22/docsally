import "./../App.css";
import Switcher from "./Switcher";

export default function OptionsSection({setOllama,ollamaList,setSelectedModel,disableModelSelection,fileID,stateID,setSavedChats}) {
        
    return (
        <>
            <section id="options-section">
                {(fileID && stateID ?
                    <p style={{fontSize:"11px"}}>{fileID}:{stateID} | Docsally<span className="m-1">0.3.0v</span></p>
                :
                    <p style={{fontSize:"11px"}}>Docsally<span className="m-1">0.3.0v</span></p>
                )}
                
                <div>
                    <Switcher disableModelSelection={disableModelSelection} setSavedChats={setSavedChats}></Switcher>
                </div>
            </section>
        </>
    );
}