import React, { useContext, useState } from 'react';
// Context
import { useModalContext } from '../../context/ModalContext';
import { SimulationContext } from '../../context/SimulationContext';

function SaveAsModal() {
  const { handleCloseSaveAsModal } = useModalContext();
  const { handleSaveNewSimulation } = useContext(SimulationContext);

  const [fileName, setFileName] = useState(''); // State for file name

  // Handler for input change
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <section
      role="dialog"
      aria-labelledby="save-as-modal-header"
      aria-describedby="save-as-modal-description"
      className="grid outline outline-colour1 outline-2 z-20 rounded-lg bg-secondary-colour h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
    >
      {/* Header */}
      <section
        id="save-as-modal-header"
        className="bg-main-colour w-full py-2"
      >
        <div className="grid items-center text-center h-full">
          <h2 className="text-secondary-colour text-xl">Save new file</h2>
        </div>
      </section>

      <div className="grid p-4">
        <section
          id="save-as-modal-description"
          className="py-4"
        >
          <div className="grid w-full">
            <div className="w-full">
              <label htmlFor="file_name" className="sr-only">
                File Name
              </label>
              <input
                type="text"
                name="file_name"
                id="file_name"
                placeholder="File name..."
                aria-placeholder="Enter file name"
                aria-required="true"
                className="w-full outline outline-1 outline-main-colour p-1 rounded-md shadow-lg"
                value={fileName} // Bind state to input value
                onChange={handleFileNameChange} // Handle input changes
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-6 mt-4">
          <div className="grid justify-center">
            <button
              onClick={handleCloseSaveAsModal}
              aria-label="Close Save As modal"
              className="grid bg-red-400 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg"
            >
              Close
            </button>
          </div>
          <div className="grid justify-center">
            <button
              onClick={() => handleSaveNewSimulation(fileName)}
              aria-label="Save new file"
              className="grid bg-colour2 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-colour1 cursor-pointer hover:brightness-110 active:scale-95 shadow-lg"
            >
              Save
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default SaveAsModal;
