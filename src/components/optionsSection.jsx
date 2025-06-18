import "./../App.css";

export default function OptionsSection({setOllama}) {
    return (
        <>
            <section id="options-section">
                {/* <button>+</button> */}
                <select name="ollamas" id="ollama-select" onChange={e=>setOllama(e.target.value)}>
                <option value={""}>Select Model</option>
                <option value={"qwen3"}>qwen3</option>
                <option value={"llama3.3"}>llama3.3</option>
                </select>
            </section>
        </>
    );
}