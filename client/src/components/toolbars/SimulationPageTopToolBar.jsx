import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Icons
import { FaRulerCombined } from 'react-icons/fa';
import { MdHideSource } from 'react-icons/md';
import { IoPhonePortrait } from 'react-icons/io5';
import { IoPhoneLandscape } from 'react-icons/io5';
import { TbHandFinger } from 'react-icons/tb';
import { TbHandTwoFingers } from 'react-icons/tb';
import { TbHandThreeFingers } from 'react-icons/tb';
import { RiDragDropLine } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdMove } from 'react-icons/io';
import { HiCursorArrowRipple } from 'react-icons/hi2';
import { GiArrowCursor } from 'react-icons/gi';
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { IoMdInfinite } from 'react-icons/io';
import { availablePointsToDisplayData } from '../../utils/design/Constants';

function SimulationPageTopToolBar({
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
  toggleMousePositionDisplay,
  positionOfMouseAndCanvasVisible,
}) {
  // Context
  const {
    rulersVisible,
    simulationIsRunning,
    isLandscapeMode,
    selectedDevice,
    displaySimOsrLoop,
    numberOfDataPointsToDisplay,
    setPointsToDisplaySettings,
  } = useContext(SimulationContext);

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
              ) : simulationToolSelected === 'move_tap' ? (
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

        {/* Move and tap tool */}
        <button
          onClick={selectTapAndMoveTool}
          title='Move and Tap tool'
          className={`px-2 ${
            simulationToolSelected === 'move_tap'
              ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-yellow-400'
          } py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-md`}
        >
          <div className='grid'>
            <FaArrowsTurnToDots className='' />
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

        {/* Timeout tool */}
        <button
          onClick={selectTimeoutTool}
          title='Timeout tool'
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
          title='Move tool'
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

        <div className='grid grid-cols-4 w-fit gap-2'>
          {/* Mouse position */}
          {positionOfMouseAndCanvasVisible ? (
            <button
              onClick={toggleMousePositionDisplay}
              title='Hide mouse position'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              <GiArrowCursor />
            </button>
          ) : (
            <button
              onClick={toggleMousePositionDisplay}
              title='Display mouse position'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              <HiCursorArrowRipple />
            </button>
          )}

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

          {/* Display points x numbers */}
          {numberOfDataPointsToDisplay === availablePointsToDisplayData[0] ? (
            <button
              onClick={setPointsToDisplaySettings}
              title='Display all data points'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              <IoMdInfinite />
            </button>
          ) : numberOfDataPointsToDisplay ===
            availablePointsToDisplayData[1] ? (
            <button
              onClick={setPointsToDisplaySettings}
              title='Display latest data point only'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              1
            </button>
          ) : numberOfDataPointsToDisplay ===
            availablePointsToDisplayData[2] ? (
            <button
              onClick={setPointsToDisplaySettings}
              title='Display two data point only'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              2
            </button>
          ) : numberOfDataPointsToDisplay ===
            availablePointsToDisplayData[3] ? (
            <button
              onClick={setPointsToDisplaySettings}
              title='Display three data point only'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              3
            </button>
          ) : numberOfDataPointsToDisplay ===
            availablePointsToDisplayData[4] ? (
            <button
              onClick={setPointsToDisplaySettings}
              title='Display five data point only'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              5
            </button>
          ) : numberOfDataPointsToDisplay ===
            availablePointsToDisplayData[5] ? (
            <button
              onClick={setPointsToDisplaySettings}
              title='Display 10 data point only'
              className='px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-md'
            >
              10
            </button>
          ) : null}

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
        </div>
        <div>
          <button
            title='Clear all data points in simulation - does not include saved loops'
            onClick={clearAllDataPoints}
            className='px-2 py-[0.5px] h-full outline-black outline outline-2 active:scale-95 no__highlights bg-red-400 hover:bg-red-100 rounded-md'
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimulationPageTopToolBar;
