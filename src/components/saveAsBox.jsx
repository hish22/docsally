import React, { useEffect, useRef, useState } from "react";

import InsertNewFile from "../util/store/insert/insertNewFile";
import InsertNewState from "../util/store/insert/insertNewState";
import InsertNewStateChat from "../util/store/insert/insertNewStateChat";
import InsertNewChat from "../util/store/insert/insertNewChat";

export default function SaveAsBox({
  open = true,
  setOpenSaveAsPanel,
  onClose = () => {setOpenSaveAsPanel(false)},
  selectedModel = "",
  uploadedFile,
  defaultName = "",
  defaultLocation = "",
  setFileID,
  setStateID,
  fileID,
  stateID,
  chats,
  stateChatID,
  setStateChatID,
  setShowNotify,
  showNotify,
  setChats
}) {
  const [name, setName] = useState(defaultName);
  const [location, setLocation] = useState(defaultLocation);
  const panelRef = useRef(null);

  useEffect(() => {
    setName(defaultName);
    setLocation(uploadedFile);
  }, [defaultName, defaultLocation, open]);

  const showErr = (e) => {
    setShowNotify(true);
    { showNotify && <Notify message={e} onClose={() => setShowNotify(false)}/>}
  }

  // close on ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
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

  console.log(chats);

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
          <p className="mt-1 text-sm text-neutral-400">Choose a name for your Save.</p>

          <div className="mt-4 grid gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-neutral-800">Name</span>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Save name"
                className="mt-2 block w-full rounded-md border border-neutral-700 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-800"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-neutral-800">Location</span>
              <div className="mt-2 flex items-center gap-2">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={uploadedFile}
                  className="flex-1 rounded-md border border-neutral-700 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-800"
                  disabled
                  required
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
              onClick={() => {
                InsertNewFile(name,uploadedFile).then((file_r) => {
                  setFileID(file_r.lastInsertId);
                
                  InsertNewState(file_r.lastInsertId,selectedModel).then((state_r) => {
                    setStateID(state_r.lastInsertId);
                    
                    InsertNewStateChat(state_r.lastInsertId).then((state_chat_r) => {
                      setStateChatID(state_chat_r.lastInsertId);

                      chats.forEach((element,index) => {
                        InsertNewChat(element.type,element.text,index,state_chat_r.lastInsertId).then((r) => {
                          console.log(r);
                        }).catch((e) => {
                          showErr(e);
                        });

                        setShowNotify(true);
                        setChats([]);
                        onClose();

                      });

                    }).catch((e) => {
                      showErr(e);
                    })
                  
                  }).catch((e) => {
                    showErr(e);
                  });
                
                }).catch((e) => {
                  showErr(e);
                })
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
