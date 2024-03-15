import React, { useContext } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';

function DesignTopToolBar({
  drawConnectingLines,
  clearDataPoints,
  createNewSimulationLoop,
  saveNewSimulationLoop,
  hideCanvasRulers,
  displayCanvasRulers,
  runSimulation,
  stopSimulation,
  setSimulationLandScape,
  setSimulationPortrait,
}) {
  // Context
  const {
    isCreatingNewLoop,
    rulersVisible,
    simulationIsRunning,
    isLandscapeMode,
    selectedDevice,
  } = useContext(DesignContext);

  return (
    <div className='grid grid-flow-col justify-between'>

      {/* Device selected title */}
      <div className='bg-white'>
        <h4 className='text-xl font-semibold'>{selectedDevice.title}</h4>
      </div>

      <div className='flex gap-2'>

        {/* Landscape/portrait */}
        {isLandscapeMode ? (
          <button
            onClick={setSimulationPortrait}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Portrait
          </button>
        ) : (
          <button
            onClick={setSimulationLandScape}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Landscape
          </button>
        )}

        {/* Run simulation */}
        {simulationIsRunning ? (
          <button
            onClick={stopSimulation}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Stop
          </button>
        ) : (
          <button
            onClick={runSimulation}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Run
          </button>
        )}

        {/* Rules on canvas */}
        {rulersVisible ? (
          <button
            onClick={hideCanvasRulers}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Hide Rulers
          </button>
        ) : (
          <button
            onClick={displayCanvasRulers}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Rulers
          </button>
        )}

        {/* Create loop of commands */}
        {isCreatingNewLoop ? (
          <button
            onClick={saveNewSimulationLoop}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Save Loop
          </button>
        ) : (
          <button
            onClick={createNewSimulationLoop}
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            Create Loop
          </button>
        )}

        <button
          onClick={drawConnectingLines}
          className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
        >
          Draw
        </button>
        <button
          onClick={clearDataPoints}
          className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-red-400 hover:bg-red-100 rounded-md'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default DesignTopToolBar;
