import React, { useContext, useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Context
import { UserContext } from '../../context/UserContext';

function LoadSimulationModal({ loadSimulationFile, closeLoadSimulationModal }) {
  const { user } = useContext(UserContext)
  const [userSimulations, setUserSimulations] = useState([]);

  useEffect(() => {
    console.log('PPP');
    client
    .get(`/simulations/user/${user.id}/get-all-simulations`)
    .then((res) => {
      console.log(res.data.data.libraryFiles);
      setUserSimulations(res.data.data.simulations);
    })
    .catch((err) => {
      console.error('Unable to retrieve simulation data', err);
    });
  }, [])

  return (
    <section className='grid outline outline-yellow-400 outline-2 z-20 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Load</h4>
        </div>

        <section className='mt-4'>
          <div className='grid w-full gap-2'>
            <div className='w-full'>
              <select
                name='file_type'
                id='file_type'
                className='w-full outline outline-1 outline-yellow-400 px-1 rounded-md'
              >
                {userSimulations.map((file, index) => {
                  return (
                    <option key={index} value={file.name}>
                      {file.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </section>

        <section className='grid grid-cols-2 gap-6 mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={closeLoadSimulationModal}
              className='bg-red-400 active:scale-95 px-4 py-2 w-full rounded-lg'
            >
              Close
            </button>
          </div>
          <div className='grid justify-center'>
            <button
              onClick={loadSimulationFile}
              className='bg-yellow-400 active:scale-95 px-4 py-2 w-full rounded-lg'
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
