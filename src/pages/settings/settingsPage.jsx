import ReturnButton from "./components/returnButton";
import LogoSide from "./components/logoSide";
import ModelSection from "./components/sections/modelSection";
export default function Settings({setOpenSettings}) {
    
    
    
    return (
        <section className="flex">
            <div className="flex flex-col" id="settings-slide">
                <ReturnButton setOpenSettings={setOpenSettings}></ReturnButton>
                <LogoSide></LogoSide>
                <hr className=" bg-neutral-900 border-neutral-700"/>
                <div id="settings-sections" className=" bg-neutral-600">
                    <p>Model</p>
                </div>
            </div>
            <div id="input-settings-sections">
                <ModelSection></ModelSection>
            </div>
        </section>
    )

}