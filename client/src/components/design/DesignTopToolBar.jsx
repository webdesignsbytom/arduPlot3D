import React, { useContext } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';
// Icons
import { FaRulerCombined } from 'react-icons/fa';
import { MdHideSource } from 'react-icons/md';
import { IoPhonePortrait } from 'react-icons/io5';
import { IoPhoneLandscape } from 'react-icons/io5';
import { ImLoop } from 'react-icons/im';
import { FaRegSave } from 'react-icons/fa';
import { TbHandFinger } from 'react-icons/tb';
import { TbHandTwoFingers } from 'react-icons/tb';
import { TbHandThreeFingers } from 'react-icons/tb';

function DesignTopToolBar({
  drawConnectingLines,
  clearAllDataPoints,
  createNewSimulationLoop,
  saveNewSimulationLoop,
  hideCanvasRulers,
  displayCanvasRulers,
  stopSimulation,
  setSimulationLandScape,
  setSimulationPortrait,
  timeoutLength,
  timeoutUnitSelected,
  numberOfFingerTapping,
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
        {/* Timeout */}
        <div className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'>
          <div>
            T/O: {timeoutLength} {timeoutUnitSelected.symbol}
          </div>
        </div>

        <button
          onClick={setSimulationPortrait}
          title='Orientatate Portrait'
          className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
        >
          {
            numberOfFingerTapping === 1 ? (
              <TbHandFinger />
            ) : numberOfFingerTapping === 2 ? (
              <TbHandTwoFingers />
            ) : numberOfFingerTapping === 3 ? (
              <TbHandThreeFingers />
            ) : null // Default case if needed
          }
        </button>

        {/* Landscape/portrait */}
        {isLandscapeMode ? (
          <button
            onClick={setSimulationPortrait}
            title='Orientatate Portrait'
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            <IoPhonePortrait />
          </button>
        ) : (
          <button
            onClick={setSimulationLandScape}
            title='Orientatate Landscape'
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            <IoPhoneLandscape />
          </button>
        )}

        {/* Rules on canvas */}
        {rulersVisible ? (
          <button
            onClick={hideCanvasRulers}
            title='Hide Rulers'
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            <MdHideSource />
          </button>
        ) : (
          <button
            onClick={displayCanvasRulers}
            title='Display Rulers'
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            <FaRulerCombined />
          </button>
        )}

        {/* Create loop of commands */}
        {isCreatingNewLoop ? (
          <button
            onClick={saveNewSimulationLoop}
            title='Save New Loop'
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            <FaRegSave />
          </button>
        ) : (
          <button
            onClick={createNewSimulationLoop}
            title='Create New Loop'
            className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
          >
            <ImLoop />
          </button>
        )}

        <button
          onClick={clearAllDataPoints}
          className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-red-400 hover:bg-red-100 rounded-md'
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default DesignTopToolBar;
