import React, { useContext } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';

function AddLoopContainer() {
  const { setAddCreateLoopModalOpen, simulationData } =
    useContext(DesignContext);

  const closeModal = () => {
    setAddCreateLoopModalOpen(false);
  };

  const createNewLoop = () => {
    setAddCreateLoopModalOpen(false);
  };


  return (
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Add Loop</h4>
        </div>

        <section className='mt-4'>
          <div>
            <label htmlFor='numberFingers' className='text-sm'>
              Create new loop or select from list
            </label>
          </div>

          <div className='grid w-full text-center'>
            <select
              className='outline outline-1 outline-yellow-400 px-1 rounded-lg w-full min-w-[200px]'
              name=''
              id=''
            >
              {simulationData.simulationLoops.map((loop, index) => {
                return (
                  <option value={loop} key={index}>
                    {loop.loopTitle}
                  </option>
                );
              })}
            </select>
          </div>

          <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={createNewLoop}
              className='outline outline-1 outline-yellow-400 bg-white active:scale-95 px-4 py-2 w-full rounded-lg'
            >
              Create New Loop
            </button>
          </div>
        </section>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={closeModal}
              className='bg-yellow-400 active:scale-95 px-4 py-2 w-full rounded-lg'
            >
              Close
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AddLoopContainer;
