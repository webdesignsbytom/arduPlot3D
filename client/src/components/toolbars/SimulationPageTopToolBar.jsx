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
import {
  availablePointsToDisplayData,
  DRAG_FUNCTION,
  MOVE_FUNCTION,
  MOVE_TAP_FUNCTION,
  TAP_FUNCTION,
  TIMEOUT_FUNCTION,
} from '../../utils/design/Constants';

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
    isLandscapeMode,
    selectedDevice,
    numberOfDataPointsToDisplay,
    setPointsToDisplaySettings,
  } = useContext(SimulationContext);

  const toolButtons = [
    {
      onClick: selectTapTool,
      title: 'Tap tool',
      selected: simulationToolSelected === 'tap',
      icon:
        numberOfFingerTapping === 1 ? (
          <TbHandFinger />
        ) : numberOfFingerTapping === 2 ? (
          <TbHandTwoFingers />
        ) : numberOfFingerTapping === 3 ? (
          <TbHandThreeFingers />
        ) : null,
    },
    {
      onClick: selectTapAndMoveTool,
      title: 'Move and Tap tool',
      selected: simulationToolSelected === 'move_tap',
      icon: <FaArrowsTurnToDots />,
    },
    {
      onClick: selectDragTool,
      title: 'Drag tool',
      selected: simulationToolSelected === 'drag',
      icon: <RiDragDropLine />,
    },
    {
      onClick: selectTimeoutTool,
      title: 'Timeout tool',
      selected: simulationToolSelected === 'timeout',
      icon: <IoTimeOutline />,
    },
    {
      onClick: selectMoveTool,
      title: 'Move tool',
      selected: simulationToolSelected === 'move',
      icon: <IoMdMove />,
    },
  ];

  const displayButtons = [
    {
      onClick: toggleMousePositionDisplay,
      title: positionOfMouseAndCanvasVisible
        ? 'Hide mouse position'
        : 'Display mouse position',
      icon: positionOfMouseAndCanvasVisible ? (
        <GiArrowCursor />
      ) : (
        <HiCursorArrowRipple />
      ),
    },
    {
      onClick: isLandscapeMode ? setSimulationPortrait : setSimulationLandScape,
      title: isLandscapeMode ? 'Orientate Portrait' : 'Orientate Landscape',
      icon: isLandscapeMode ? <IoPhonePortrait /> : <IoPhoneLandscape />,
    },
    {
      onClick: setPointsToDisplaySettings,
      title: `Display ${
        numberOfDataPointsToDisplay === availablePointsToDisplayData[0]
          ? 'all data points'
          : numberOfDataPointsToDisplay + ' data points only'
      }`,
      icon:
        numberOfDataPointsToDisplay === availablePointsToDisplayData[0] ? (
          <IoMdInfinite />
        ) : (
          numberOfDataPointsToDisplay
        ),
    },
    {
      onClick: rulersVisible ? hideCanvasRulers : displayCanvasRulers,
      title: rulersVisible ? 'Hide Rulers' : 'Display Rulers',
      icon: rulersVisible ? <MdHideSource /> : <FaRulerCombined />,
    },
  ];

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
              {simulationToolSelected === TAP_FUNCTION ? (
                <div>
                  <label htmlFor='tap_speed'>Tap speed</label>
                  <div>{speedOfFingerMoving} mm/s</div>
                </div>
              ) : simulationToolSelected === MOVE_TAP_FUNCTION ? (
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
              ) : simulationToolSelected === DRAG_FUNCTION ? (
                <div>
                  <label htmlFor='drag_speed'>Drag speed</label>
                  <div>{speedOfDraggingArmMoving} mm/s</div>
                </div>
              ) : simulationToolSelected === TIMEOUT_FUNCTION ? (
                <div>
                  <label htmlFor='timeout_length'>Timeout</label>
                  <div>
                    {timeoutLength} {timeoutUnitSelected.symbol}
                  </div>
                </div>
              ) : simulationToolSelected === MOVE_FUNCTION ? (
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

        {toolButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            title={button.title}
            className={`px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights ${
              button.selected
                ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                : 'bg-yellow-400 hover:bg-yellow-100'
            } rounded-md`}
          >
            {button.icon}
          </button>
        ))}

        {/* Divider */}
        <div className='bg-yellow-400 h-full w-[2px] outline outline-black outline-1 rounded-3xl'></div>

        <div className='grid grid-cols-4 w-fit gap-2'>
          {displayButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              title={button.title}
              className={`px-2 py-[0.5px] outline-black outline outline-2 active:scale-95 no__highlights ${
                button.selected
                  ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                  : 'bg-yellow-400 hover:bg-yellow-100'
              } rounded-md`}
            >
              {button.icon}
            </button>
          ))}
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
