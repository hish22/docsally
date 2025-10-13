// Import of icons
import deepseek_r1 from "./../assets/icons/models/deepseek-r1.png";
import devstral from "./../assets/icons/models/devstral.png";
import qwen3 from "./../assets/icons/models/qwen3.png";
import gemma3 from "./../assets/icons/models/gemma3.png";
import llama4 from"./../assets/icons/models/llama4.png";
import phi_4 from "./../assets/icons/models/Microsoft_icon.svg.png";
import mistral from "./../assets/icons/models/mistral-color.svg";
import olmo from "./../assets/icons/models/olmo.png";

export default function ModelSection({ollamaList,openModels,setSelectedModel,setOllama}) {
    
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-700 p-2 rounded-xl" style={openModels ? {display: "block"}:{display:"none"}}>
            <form className="max-w-md mx-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" placeholder="Search for models.." />
                    {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Search</button> */}
                </div>
            </form>
            {/* setSelectedModel */}
            <div className="flex">
                <div>
                    {ollamaList.filter((item) => item != "nomic-embed-text:latest").map((item,index) => (
                        <div className="bg-neutral-600 w-100 rounded-2xl m-2 cursor-pointer hover:opacity-80" key={index} onClick={() => {
                            setSelectedModel(item)
                            setOllama(item)
                            console.log(item)
                            }}>
                            <p className="font-bold m-2 p-2">{item}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}