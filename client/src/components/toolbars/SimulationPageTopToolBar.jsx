import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Icons
import { FaRulerCombined } from 'react-icons/fa';
import { TbHandFinger } from 'react-icons/tb';
import { BiSolidHide } from 'react-icons/bi';
import { TbHandTwoFingers } from 'react-icons/tb';
import { TbHandThreeFingers } from 'react-icons/tb';
import { RiDragDropLine } from 'react-icons/ri';
import { IoMdMove } from 'react-icons/io';
import { HiCursorArrowRipple } from 'react-icons/hi2';
import { GiArrowCursor } from 'react-icons/gi';
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { IoMdInfinite } from 'react-icons/io';
import { ImClock } from 'react-icons/im';
import { HiMiniDevicePhoneMobile } from 'react-icons/hi2';
import {
  availablePointsToDisplayData,
  DRAG_FUNCTION,
  MOVE_FUNCTION,
  MOVE_TAP_FUNCTION,
  TAP_FUNCTION,
  TIMEOUT_FUNCTION,
} from '../../utils/design/Constants';

function SimulationPageTopToolBar() {
  // Context
  const {
    rulesAndDataVisible,
    isLandscapeMode,
    selectedDevice,
    numberOfDataPointsToDisplay,
    setPointsToDisplaySettings,
    clearAllDataPoints,
    displayCanvasRulers,
    hideCanvasRulers,
    handleSelectTapTool,
    handleSelectTapAndMoveTool,
    handleSelectDragTool,
    handleSelectTimeoutTool,
    handleSelectMoveTool,
    simulationToolSelected,
    numberOfFingerTapping,
    speedOfFingerMoving,
    timeoutLength,
    timeoutUnitSelected,
    speedOfArmMoving,
    speedOfDraggingArmMoving,
    setSimulationLandScape,
    setSimulationPortrait,
    toggleMousePositionDisplay,
    positionOfMouseAndCanvasVisible,
  } = useContext(SimulationContext);

  const toolButtons = [
    {
      onClick: handleSelectMoveTool,
      title: 'Move tool',
      selected: simulationToolSelected === 'move',
      icon: <IoMdMove />,
    },
    {
      onClick: handleSelectTapTool,
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
      onClick: handleSelectTapAndMoveTool,
      title: 'Move and Tap tool',
      selected: simulationToolSelected === 'move_tap',
      icon: <FaArrowsTurnToDots />,
    },
    {
      onClick: handleSelectDragTool,
      title: 'Drag tool',
      selected: simulationToolSelected === 'drag',
      icon: <RiDragDropLine />,
    },
    {
      onClick: handleSelectTimeoutTool,
      title: 'Timeout tool',
      selected: simulationToolSelected === 'timeout',
      icon: <ImClock />,
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
      icon: isLandscapeMode ? (
        <HiMiniDevicePhoneMobile />
      ) : (
        <HiMiniDevicePhoneMobile className='rotate-90' />
      ),
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
      icon: rulesAndDataVisible ? <BiSolidHide /> : <FaRulerCombined />,
    },
  ];

  const renderSimulationToolContent = () => {
    switch (simulationToolSelected) {
      case MOVE_FUNCTION:
        return (
          <div className='flex 2xl:grid gap-1'>
            <label htmlFor='movement_speed'>Movement Sp</label>
            <div>{speedOfArmMoving} mm/s</div>
          </div>
        );
      case TAP_FUNCTION:
        return (
          <div className='flex 2xl:grid gap-1'>
            <label htmlFor='tap_speed'>Tap speed</label>
            <div>{speedOfFingerMoving} mm/s</div>
          </div>
        );
      case MOVE_TAP_FUNCTION:
        return (
          <div className='grid grid-cols-2'>
            <div className='flex 2xl:grid gap-1'>
              <label htmlFor='tap_speed'>Tap speed</label>
              <div>{speedOfFingerMoving} mm/s</div>
            </div>
            <div className='flex 2xl:grid gap-1'>
              <label htmlFor='movement_speed'>Movement Sp</label>
              <div>{speedOfArmMoving} mm/s</div>
            </div>
          </div>
        );
      case DRAG_FUNCTION:
        return (
          <div className='flex 2xl:grid gap-1'>
            <label htmlFor='drag_speed'>Drag speed</label>
            <div>{speedOfDraggingArmMoving} mm/s</div>
          </div>
        );
      case TIMEOUT_FUNCTION:
        return (
          <div className='flex 2xl:grid gap-1'>
            <label htmlFor='timeout_length'>Timeout</label>
            <div>
              {timeoutLength} {timeoutUnitSelected.symbol}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className='grid grid-flow-col justify-between'>
      {/* Device selected title */}
      <div className='hidden xl:grid bg-secondary-colour  items-center px-2 border-2 border-black border-solid rounded-tr-xl rounded-br-xl shadow-cardShadow'>
        <h4 className=' text-lg font-semibold'>{selectedDevice.title}</h4>
      </div>

      <div className='grid grid-flow-col items-center gap-2'>
        {/* Selected */}
        <div className='grid items-center px-1 h-[32px] 2xl:h-[56px] w-full outline-black outline outline-2 no__highlights bg-secondary-colour rounded shadow-cardShadow'>
          {/* Times length */}
          <div className='text-xs'>{renderSimulationToolContent()}</div>
        </div>

        {/* Divider */}
        <div className='bg-main-colour h-[32px] w-[2px] 2xl:h-[56px] outline outline-black outline-1 rounded-3xl'></div>

        {toolButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            title={button.title}
            className={`w-[32px] h-[32px] min-w-[32px] min-h-[32px] 2xl:min-h-[56px] 2xl:w-[56px] 2xl:h-[56px] 2xl:min-w-[56px] outline-black outline outline-2 active:scale-95 no__highlights ${
              button.selected
                ? 'bg-secondary-colour shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                : 'bg-colour4 hover:bg-yellow-100 shadow-cardShadow'
            } rounded-md`}
          >
            <div className='grid items-center justify-center text-xl'>
              {button.icon}
            </div>
          </button>
        ))}

        {/* Divider */}
        <div className='bg-main-colour h-[32px] 2xl:h-[56px] w-[2px] outline outline-black outline-1 rounded-3xl'></div>

        {displayButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            title={button.title}
            className={`w-[32px] h-[32px] min-w-[32px] min-h-[32px] 2xl:min-h-[56px] 2xl:w-[56px] 2xl:h-[56px] 2xl:min-w-[56px] outline-black outline outline-2 active:scale-95 no__highlights ${
              button.selected
                ? 'bg-secondary-colour shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                : 'bg-colour4 hover:bg-yellow-100 shadow-cardShadow'
            } rounded-md`}
          >
            <div className='grid items-center justify-center text-xl'>
              {button.icon}
            </div>
          </button>
        ))}
        <div>
          <button
            title='Clear all data points in simulation - does not include saved loops'
            onClick={clearAllDataPoints}
            className='px-2 h-[32px] 2xl:h-[56px] outline-black outline outline-2 active:scale-95 no__highlights bg-warning hover:brightness-90 rounded-md shadow-cardShadow'
          >
            <div className='grid items-center justify-center'>
              <span className='text-colour1'>CLEAR</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimulationPageTopToolBar;
