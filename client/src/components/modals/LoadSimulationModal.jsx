import React, { useContext, useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Context
import { UserContext } from '../../context/UserContext';
import { useModalContext } from '../../context/ModalContext';
// Utils
import { loadSimulationFile } from '../../utils/simulation/SimulationUtils';

function LoadSimulationModal() {
  const { user } = useContext(UserContext);
  const { handleCloseLoadModal } = useModalContext();

  const [userSimulations, setUserSimulations] = useState([]);

  useEffect(() => {
    client
      .get(`/simulations/user/${user.id}/get-all-simulations`)
      .then((res) => {
        console.log(res.data.data.libraryFiles);
        setUserSimulations(res.data.data.simulations);
      })
      .catch((err) => {
        console.error('Unable to retrieve simulation data', err);
      });
  }, [user.id]);

  return (
    <section className='grid outline outline-main-colour outline-2 z-20 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='py-2 px-4'>
        <div className='text-center'>
          <h4 className='text-lg'>Load</h4>
        </div>

        <section className='py-4'>
          <div className='grid w-full gap-2'>
            <article>
              <div className='text-center'>
                <p>Load a simulation from your saved files.</p>
              </div>
            </article>
            <div className='w-full'>
              <select
                name='file_type'
                id='file_type'
                className='w-full outline outline-1 outline-main-colour p-1 rounded-md shadow-lg'
                aria-label='File type selector'
              >
                {userSimulations.length === 0 ? (
                  <option value='no_files'>Nothing to load</option>
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
            </div>
          </div>
        </section>

        <section className='grid grid-cols-2 gap-6 mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={handleCloseLoadModal}
              className='grid bg-red-400 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
            >
              Close
            </button>
          </div>
          <div className='grid justify-center'>
            <button
              onClick={loadSimulationFile()}
              className='grid bg-main-colour w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
            >
              Load
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default LoadSimulationModal;
