import React, { useContext, useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Context
import { useModalContext } from '../../context/ModalContext';
import { SimulationContext } from '../../context/SimulationContext';
import { useUser } from '../../context/UserContext';
// Constants
import { GET_USER_SIMULATIONS_LIST_API } from '../../utils/Constants';

function LoadSimulationModal() {
  const { user } = useUser();
  const { handleCloseLoadModal } = useModalContext();
  const { loadSelectedSimulation } = useContext(SimulationContext);

  const [userSimulations, setUserSimulations] = useState([]);
  const [selectedFile, setSelectedFile] = useState(''); // State for selected file

  useEffect(() => {
    client
      .get(`${GET_USER_SIMULATIONS_LIST_API}`, true)
      .then((res) => {
        setUserSimulations(res.data.simulations);
        console.log('res.data.simulations', res.data.simulations);
      })
      .catch((err) => {
        console.error('Unable to retrieve simulation data', err);
      });
  }, [user.id]);

  // Handler for dropdown change
  const handleSelectChange = (event) => {
    setSelectedFile(event.target.value);
  };

  return (
    <section
      role='dialog'
      aria-labelledby='save-as-modal-header'
      aria-describedby='load-simulation-modal-description'
      className='grid outline outline-colour1 outline-2 z-20 rounded-lg bg-secondary-colour h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden'
    >
      {/* Header */}
      <section id='save-as-modal-header' className='bg-main-colour w-full py-2'>
        <div className='grid items-center text-center h-full'>
          <h2 className='text-secondary-colour text-xl'>Load files</h2>
        </div>
      </section>

      <section
        className='py-4 px-4 grid'
        id='load-simulation-modal-description'
      >
        <p className='text-center'>Load your simulations.</p>
        <p className='text-center text-xs pt-1'>
          You will lose any unsaved data!
        </p>

        <section className='py-4'>
          <label htmlFor='file_type' className='sr-only'>
            Select a simulation to load
          </label>
          <select
            name='file_type'
            id='file_type'
            className='w-full outline outline-1 outline-main-colour p-1 rounded-md shadow-lg'
            aria-label='File type selector'
            defaultValue=''
            onChange={handleSelectChange} // Set selected file on change
          >
            <option value='' disabled>
              Select a file
            </option>
            {userSimulations.length === 0 ? (
              <option value='no_files' disabled>
                Nothing to load
              </option>
            ) : (
              userSimulations.map((file, index) => (
                <option
                  key={index}
                  value={file.name}
                  aria-label={`${file.title} option`}
                >
                  {file.title}
                </option>
              ))
            )}
          </select>
        </section>

        <section className='grid grid-cols-2 gap-4 mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={handleCloseLoadModal}
              aria-label='Close load simulation modal'
              className='grid bg-red-400 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
            >
              Close
            </button>
          </div>
          <div className='grid justify-center'>
            <button
              onClick={() => loadSelectedSimulation(selectedFile)} // Use selected file on load
              aria-label='Load selected simulation file'
              className='grid bg-main-colour w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
              disabled={!selectedFile} // Disable button if no file selected
            >
              Load
            </button>
          </div>
        </section>
      </section>
    </section>
  );
}

export default LoadSimulationModal;
