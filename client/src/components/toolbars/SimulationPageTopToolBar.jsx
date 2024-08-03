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
    rulesAndDataVisible,
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
      onClick: rulesAndDataVisible ? hideCanvasRulers : displayCanvasRulers,
      title: rulesAndDataVisible ? 'Hide Rulers' : 'Display Rulers',
      icon: rulesAndDataVisible ? <MdHideSource /> : <FaRulerCombined />,
    },
  ];

  const renderSimulationToolContent = () => {
    switch (simulationToolSelected) {
      case TAP_FUNCTION:
        return (
          <div>
            <label htmlFor='tap_speed'>Tap speed</label>
            <div>{speedOfFingerMoving} mm/s</div>
          </div>
        );
      case MOVE_TAP_FUNCTION:
        return (
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
        );
      case DRAG_FUNCTION:
        return (
          <div>
            <label htmlFor='drag_speed'>Drag speed</label>
            <div>{speedOfDraggingArmMoving} mm/s</div>
          </div>
        );
      case TIMEOUT_FUNCTION:
        return (
          <div>
            <label htmlFor='timeout_length'>Timeout</label>
            <div>
              {timeoutLength} {timeoutUnitSelected.symbol}
            </div>
          </div>
        );
      case MOVE_FUNCTION:
        return (
          <div>
            <label htmlFor='movement_speed'>Movement Sp</label>
            <div>{speedOfArmMoving} mm/s</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className='grid grid-flow-col justify-between'>
      {/* Device selected title */}
      <div className='bg-secondary-colour'>
        <h4 className='hidden lg:inline text-xl font-semibold'>{selectedDevice.title}</h4>
      </div>

      <div className='flex gap-2'>
        {/* Timeout */}
        <div className='grid items-center px-1 h-[32px] 2xl:h-[48px] w-full outline-black outline outline-2 no__highlights bg-secondary-colour rounded-md'>
          {/* Times length */}
          <div className='text-xs'>{renderSimulationToolContent()}</div>
        </div>

        {/* Divider */}
        <div className='bg-main-colour h-[32px] w-[2px] 2xl:h-[48px] outline outline-black outline-1 rounded-3xl'></div>

        {toolButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            title={button.title}
            className={`w-[32px] h-[32px] min-w-[32px] min-h-[32px] 2xl:min-h-[48px] 2xl:w-[48px] 2xl:h-[48px] 2xl:min-w-[48px] outline-black outline outline-2 active:scale-95 no__highlights ${
              button.selected
                ? 'bg-secondary-colour shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                : 'bg-main-colour hover:bg-yellow-100'
            } rounded-md`}
          >
            <div className='grid items-center justify-center'>
              {button.icon}
            </div>
          </button>
        ))}

        {/* Divider */}
        <div className='bg-main-colour h-[32px] 2xl:h-[48px] w-[2px] outline outline-black outline-1 rounded-3xl'></div>

        {displayButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            title={button.title}
            className={`w-[32px] h-[32px] min-w-[32px] min-h-[32px] 2xl:min-h-[48px] 2xl:w-[48px] 2xl:h-[48px] 2xl:min-w-[48px] outline-black outline outline-2 active:scale-95 no__highlights ${
              button.selected
                ? 'bg-secondary-colour shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                : 'bg-main-colour hover:bg-yellow-100'
            } rounded-md`}
          >
            <div className='grid items-center justify-center'>
              {button.icon}
            </div>
          </button>
        ))}
        <div>
          <button
            title='Clear all data points in simulation - does not include saved loops'
            onClick={clearAllDataPoints}
            className='px-2 h-[32px] 2xl:h-[48px] outline-black outline outline-2 active:scale-95 no__highlights bg-warning hover:brightness-90 rounded-md'
          >
            <div className='grid items-center justify-center'>
              <span>Clear</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimulationPageTopToolBar;
