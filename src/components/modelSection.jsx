import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function ModelSection({ ollamaList, openModels, setSelectedModel, setOllama, setOpenModels }) {
    const [searchValue, setSearchValue] = useState("");

    return (
        <AnimatePresence>
            {openModels && (
                <motion.div
                    key="model-section"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                        duration: 0.2,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.1 },
                    }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-700 p-2 rounded-xl"
                >
                    <div className="flex px-4 py-3 rounded-md border-2 border-white overflow-hidden max-w-md mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white mr-3 rotate-90">
                            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search Model..."
                            className="w-full outline-none bg-transparent text-white text-sm"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <div className="flex">
                        <div>
                            {ollamaList
                                .filter((item) => item !== "nomic-embed-text:latest")
                                .filter((item) => item.includes(searchValue))
                                .map((item, index) => (
                                    <div
                                        className="w-100 hover:border-l-2 hover:border-neutral-800 cursor-pointer hover:opacity-80"
                                        key={index}
                                        onClick={() => {
                                            setSelectedModel(item);
                                            setOllama(item);
                                            setOpenModels(0);
                                        }}
                                    >
                                        <p className="font-bold m-2 p-2">{item}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
