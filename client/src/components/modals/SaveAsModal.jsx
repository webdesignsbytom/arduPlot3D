import React, { useEffect, useState } from 'react';
// File data
import { saveFileTypes } from '../../utils/design/DesignUtils';

function SaveAsModal({ saveAsNewFile, closeSaveAsModal }) {
  const [availableFileTypes] = useState(saveFileTypes);

  return (
    <section className='grid outline outline-main-colour outline-2 z-20 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='py-2 px-4'>
        <div className='text-center'>
          <h4 className='text-lg'>Save As</h4>
        </div>

        <section className='py-4'>
          <div className='grid grid-cols-2x w-full gap-2'>
            <div className='w-full'>
              <input
                type='text'
                name='file_name'
                id='file_name'
                className='w-full outline outline-1 outline-main-colour p-1 rounded-md shadow-lg'
              />
            </div>
            <div className='w-full'>
              <select
                name='file_type'
                id='file_type'
                className='w-full outline outline-1 outline-main-colour p-1 rounded-md shadow-lg'
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
              className='grid bg-red-400 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
            >
              Close
            </button>
          </div>
          <div className='grid justify-center'>
            <button
              onClick={saveAsNewFile}
              className='grid bg-main-colour w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
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
