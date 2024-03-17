import React from 'react';

function DesignFunctionsBar({
  runSimulation,
  stopSimulation,
  resetSimulationToStartingPoint,
  createNewSimulationFile,
  saveCurrentSimulationFile,
  saveAsCurrentSimulationFile,
  openTimeoutSettingsModal,
  openTapSettingsModal,
  openMovementSettingsModal,
  openDragSettingsModal,
  openDeviceSelectModal,
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
              onClick={runSimulation}
            >
              Run Simulation
            </li>
            <li
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
              onClick={stopSimulation}
            >
              Stop Simulation
            </li>
            <li
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
              onClick={resetSimulationToStartingPoint}
            >
              Reset Simulation
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

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
            <li
              onClick={openTapSettingsModal}
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
            >
              Tap Settings
            </li>
            <li
              onClick={openMovementSettingsModal}
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
            >
              Move Settings
            </li>
            <li
              onClick={openDragSettingsModal}
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
            >
              Drag Settings
            </li>
            <li
              onClick={openTimeoutSettingsModal}
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
            >
              Timeout Settings
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className='py-2'>
          <ul>
            <li
              onClick={openDeviceSelectModal}
              className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
            >
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
