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
      <article>
        <h1 className='text-xl font-semibold'>{selectedDevice.title}</h1>
      </article>
      <div className='flex gap-4'>

        {/* Landscape/portrait */}
        {isLandscapeMode ? (
          <button
            onClick={setSimulationPortrait}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Portrait
          </button>
        ) : (
          <button
            onClick={setSimulationLandScape}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Landscape
          </button>
        )}

        {/* Run simulation */}
        {simulationIsRunning ? (
          <button
            onClick={stopSimulation}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Stop
          </button>
        ) : (
          <button
            onClick={runSimulation}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Run
          </button>
        )}

        {/* Rules on canvas */}
        {rulersVisible ? (
          <button
            onClick={hideCanvasRulers}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Hide Rulers
          </button>
        ) : (
          <button
            onClick={displayCanvasRulers}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Rulers
          </button>
        )}

        {/* Create loop of commands */}
        {isCreatingNewLoop ? (
          <button
            onClick={saveNewSimulationLoop}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Save Loop
          </button>
        ) : (
          <button
            onClick={createNewSimulationLoop}
            className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
          >
            Create Loop
          </button>
        )}

        <button
          onClick={drawConnectingLines}
          className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
        >
          Draw
        </button>
        <button
          onClick={clearDataPoints}
          className='px-4 py-2 outline-black outline outline-2 active:scale-95 no__highlights bg-red-400 hover:bg-red-100 rounded-xl'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default DesignTopToolBar;
