import React, { useEffect, useRef, useState } from "react";

export default function SaveAsBox({
  open = true,
  setOpenSaveAsPanel,
  onClose = () => {setOpenSaveAsPanel(false)},
  defaultName = "",
  defaultLocation = "",
}) {
  const [name, setName] = useState(defaultName);
  const [location, setLocation] = useState(defaultLocation);
  const panelRef = useRef(null);

  useEffect(() => {
    setName(defaultName);
    setLocation(defaultLocation);
  }, [defaultName, defaultLocation, open]);

  // close on ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && open) handleSave();
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, name, location]);

  if (!open) return null;

  function handleBackdropClick(e) {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onMouseDown={handleBackdropClick}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-xl mx-4 rounded-2xl bg-neutral-800 shadow-lg ring-1 ring-neutral-700"
        onMouseDown={(e) => e.stopPropagation()} // keep clicks inside panel from triggering backdrop
      >
        <div className="px-6 py-5">
          <h3 className="text-lg font-semibold text-white">Save As</h3>
          <p className="mt-1 text-sm text-neutral-400">Choose a name and location for your file.</p>

          <div className="mt-4 grid gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-neutral-800">Name</span>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Save name"
                className="mt-2 block w-full rounded-md border border-neutral-700 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-800"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-neutral-800">Location</span>
              <div className="mt-2 flex items-center gap-2">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="/home/user/Documents"
                  className="flex-1 rounded-md border border-neutral-700 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-800"
                  disabled
                />
              </div>
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700 cursor-pointer"
            >
              Cancel
            </button>

            <button
              className="inline-flex items-center rounded-lg bg-neutral-600 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
