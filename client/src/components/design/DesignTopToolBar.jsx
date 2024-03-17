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
import { RiDragDropLine } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdMove } from 'react-icons/io';

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
  selectTapTool,
  selectTapAndMoveTool,
  selectDragTool,
  selectTimeoutTool,
  selectMoveTool,
  simulationToolSelected,
  speedOfArmMoving,
  speedOfDraggingArmMoving,
  speedOfFingerMoving,
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
        <div className='px-1 py-[0.5px] outline-black outline outline-2 no__highlights bg-white rounded-md'>
          {/* Times length */}
          <div className='text-xs'>
            <div>
              {simulationToolSelected === 'tap' ? (
                <div>
                  <label htmlFor='tap_speed'>Tap speed</label>
                  <div>{speedOfFingerMoving} mm/s</div>
                </div>
              ) : simulationToolSelected === 'tap_move' ? (
                <div className='grid grid-cols-2'>
                  <div>
                    <label htmlFor='tap_speed'>Tap speed</label>
                    <div>{speedOfFingerMoving} mm/s</div>
                  </div>
                  <div>
                    <label htmlFor='movement_speed'>Movement Sp</label>
                    <div>{speedOfArmMoving} mm/s</div>
                  </div>
                </div>
              ) : simulationToolSelected === 'drag' ? (
                <div>
                  <label htmlFor='drag_speed'>Drag speed</label>
                  <div>{speedOfDraggingArmMoving} mm/s</div>
                </div>
              ) : simulationToolSelected === 'timeout' ? (
                <div>
                  <label htmlFor='timeout_length'>Timeout</label>
                  <div>
                    {timeoutLength} {timeoutUnitSelected.symbol}
                  </div>
                </div>
              ) : simulationToolSelected === 'move' ? (
                <div>
                  <label htmlFor='movement_speed'>Movement Sp</label>
                  <div>{speedOfArmMoving} mm/s</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='bg-yellow-400 h-full w-[2px] outline outline-black outline-1 rounded-3xl'></div>

        <button
          onClick={selectTapTool}
          title='Tap tool'
          className={`px-2 ${
            simulationToolSelected === 'tap'
              ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-yellow-400'
          } py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-md`}
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

        {/* Tap and Move tool */}
        <button
          onClick={selectTapAndMoveTool}
          title='Tap and Move'
          className={`px-2 ${
            simulationToolSelected === 'tap_move'
              ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-yellow-400'
          } py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-md`}
        >
          <div className='grid'>
            <TbHandFinger className='' />
            <IoMdMove className='' />
          </div>
        </button>

        {/* Drag tool */}
        <button
          onClick={selectDragTool}
          title='Drag tool'
          className={`px-2 ${
            simulationToolSelected === 'drag'
              ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-yellow-400'
          } py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-md`}
        >
          <RiDragDropLine />
        </button>

        {/* Drag tool */}
        <button
          onClick={selectTimeoutTool}
          title='Drag tool'
          className={`px-2 ${
            simulationToolSelected === 'timeout'
              ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-yellow-400'
          } py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-md`}
        >
          <IoTimeOutline />
        </button>

        {/* Move tool */}
        <button
          onClick={selectMoveTool}
          title='Drag tool'
          className={`px-2 ${
            simulationToolSelected === 'move'
              ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-yellow-400'
          } py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-md`}
        >
          <IoMdMove />
        </button>

        {/* Divider */}
        <div className='bg-yellow-400 h-full w-[2px] outline outline-black outline-1 rounded-3xl'></div>

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
