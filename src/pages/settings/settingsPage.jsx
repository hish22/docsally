import ReturnButton from "./components/returnButton";
import LogoSide from "./components/logoSide";
export default function Settings({setOpenSettings}) {
    return (
        <>
            <div className="flex flex-col" id="settings-slide">
                <ReturnButton setOpenSettings={setOpenSettings}></ReturnButton>
                <LogoSide></LogoSide>
                <hr className=" bg-neutral-800 border-neutral-700"/>
                <div id="settings-sections">
                    <p>Model</p>
                </div>
            </div>
        </>
    )

}