export default function specificOsStyle() {
    let osPlatform = navigator.userAgent.toLocaleLowerCase();

    if(osPlatform.includes("ubuntu")) {
        document.getElementById("ollama-select").classList.add('linux-ollama-select');
    } else if(osPlatform.includes("windows")) {
        document.getElementById("ollama-select").classList.add('windows-ollama-select');
    }

}
