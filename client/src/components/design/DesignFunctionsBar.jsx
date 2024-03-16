import React from 'react';

function DesignFunctionsBar({
  createNewSimulationFile,
  saveCurrentSimulationFile,
  saveAsCurrentSimulationFile,
}) {
  return (
    <section className='bg-white border-r-2 border-solid border-black p-2'>
      {/* Header data */}
      <article>
        <h2 className='text-xl text-center'>Simulation Tools</h2>
      </article>

      {/* Divider */}
      <div className='w-full h-[1px] bg-slate-400'></div>

      {/* Tools */}
      <section>
        <div className='py-2'>
          <ul>
            <li
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
              onClick={createNewSimulationFile}
            >
              New Simulation
            </li>
            <li
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
              onClick={saveCurrentSimulationFile}
            >
              Save
            </li>
            <li
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
              onClick={saveAsCurrentSimulationFile}
            >
              Save As
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className='py-2'>
          <ul>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Tap Screen
            </li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Move To
            </li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Drag
            </li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Timeout
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className='py-2'>
          <ul>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Device Select
            </li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Dimensions
            </li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Custom
            </li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Offset
            </li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'>
              Layout
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}

export default DesignFunctionsBar;
