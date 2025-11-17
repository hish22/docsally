import React, { useEffect } from "react";

export default function Notify({message, type = "success", onClose}) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => onClose(), 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);


    if (!message) return null;


    const typeStyles = {
    success: "bg-green-950/80 border-green-700 text-green-100",
    error: "bg-red-950/80 border-red-700 text-red-100",
    warning: "bg-yellow-900/80 border-yellow-700 text-yellow-100",
    };


    return (
        <div className={`fixed z-10 bottom-5 right-5 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm transition-all ${typeStyles[type]}`}>
        <p className="text-sm font-medium">{message}</p>
        </div>
    );
}