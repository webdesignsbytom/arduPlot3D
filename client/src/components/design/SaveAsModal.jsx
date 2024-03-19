import React, { useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// File data
import { saveFileTypes } from '../../utils/design/DesignUtils';

function SaveAsModal({ saveAsNewFile, closeSaveAsModal }) {
  const [availableFileTypes] = useState(saveFileTypes);

  useEffect(() => {
    client
      .post('/simulations/create-new-simulation')
      .then((res) => {
        console.log('RES', res.data.data.newSimulation);
      })

      .catch((err) => {
        console.error('Unable to create simulation', err);
      });
  }, []);

  return (
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Save As</h4>
        </div>

        <section className='mt-4'>
          <div className='grid grid-cols-2x w-full gap-2'>
            <div className='w-full'>
              <input
                type='text'
                name='file_name'
                id='file_name'
                className='w-full outline outline-1 outline-yellow-400 px-1 rounded-md'
              />
            </div>
            <div className='w-full'>
              <select
                name='file_type'
                id='file_type'
                className='w-full outline outline-1 outline-yellow-400 px-1 rounded-md'
              >
                {availableFileTypes.map((file, index) => {
                  return (
                    <option key={index} value={file.name}>
                      {file.name}
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
              onClick={closeSaveAsModal}
              className='bg-red-400 active:scale-95 px-4 py-2 w-full rounded-lg'
            >
              Close
            </button>
          </div>
          <div className='grid justify-center'>
            <button
              onClick={saveAsNewFile}
              className='bg-yellow-400 active:scale-95 px-4 py-2 w-full rounded-lg'
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
