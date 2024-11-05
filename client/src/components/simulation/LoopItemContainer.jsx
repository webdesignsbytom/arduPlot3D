import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import LoopItem from './LoopItem';
// Icons
import { TbHandFinger } from 'react-icons/tb';
import { TbHandTwoFingers } from 'react-icons/tb';
import { TbHandThreeFingers } from 'react-icons/tb';
import { RiDragDropLine } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdMove } from 'react-icons/io';
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { IoCloseCircleSharp } from 'react-icons/io5';
// Colours
import {
  DRAG_FUNCTION,
  DragFunctionColour,
  MOVE_FUNCTION,
  MOVE_TAP_FUNCTION,
  MoveFunctionColour,
  MoveTapFunctionColour,
  TAP_FUNCTION,
  TapFunctionColour,
  TIMEOUT_FUNCTION,
  TimeoutFunctionColour,
} from '../../utils/design/Constants';

function LoopItemContainer({ index, loopData }) {
  const {
    displayLoopDataPoints,
    displayLoopDataPointsIndex,
    displaySimOrLoop,
    deleteDataPointFromSimulation,
    deleteDataPointFromLoop,
    isCreatingEditingLoop,
  } = useContext(SimulationContext);

  const handleDataPointInputChange = (index, dataIndex, event) => {
    const { value } = event.target;
  };

  return (
    <>
      <LoopItem key={index} index={index} loopData={loopData} />

      {/* Loop data point items */}
      {displayLoopDataPoints &&
        index === displayLoopDataPointsIndex &&
        loopData.mainSimulationLoopDataPoints.map(
          (loopDataPoint, dataIndex) => {
            return (
              <div
                key={dataIndex}
                className='grid grid-cols-a1a h-[30px] w-full gap-2'
              >
                <div className='grid items-center justify-center w-[30px] bg-purple-300 h-full outline outline-2 outline-black'>
                  <label
                    htmlFor='data_point'
                    className='h-full grid text-xs font-medium items-center justify-center overflow-hidden'
                  >
                    {index + 1}.{dataIndex + 1}
                  </label>
                </div>
                <div className='grid grid-cols-reg w-full h-full outline-black outline outline-2'>
                  <div className='grid items-center bg-secondary-colour px-1'>
                    {loopDataPoint.dataType === TAP_FUNCTION &&
                    loopDataPoint.numFingers === 1 ? (
                      <TbHandFinger />
                    ) : loopDataPoint.dataType === TAP_FUNCTION &&
                      loopDataPoint.numFingers === 2 ? (
                      <TbHandTwoFingers />
                    ) : loopDataPoint.dataType === TAP_FUNCTION &&
                      loopDataPoint.numFingers === 3 ? (
                      <TbHandThreeFingers />
                    ) : loopDataPoint.dataType === MOVE_TAP_FUNCTION ? (
                      <FaArrowsTurnToDots />
                    ) : loopDataPoint.dataType === MOVE_FUNCTION ? (
                      <IoMdMove />
                    ) : loopDataPoint.dataType === DRAG_FUNCTION ? (
                      <RiDragDropLine />
                    ) : loopDataPoint.dataType === TIMEOUT_FUNCTION ? (
                      <IoTimeOutline />
                    ) : null}
                  </div>
                  <input
                    title={loopDataPoint.dataType}
                    className={`w-full h-full px-2`}
                    readOnly
                    style={{
                      background:
                        loopDataPoint.dataType === TAP_FUNCTION
                          ? `linear-gradient(${TapFunctionColour}, #87f4ad)`
                          : loopDataPoint.dataType === MOVE_TAP_FUNCTION
                          ? `linear-gradient(${MoveTapFunctionColour}, #e5d860)`
                          : loopDataPoint.dataType === MOVE_FUNCTION
                          ? `linear-gradient(${MoveFunctionColour}, #c4b5fd)`
                          : loopDataPoint.dataType === DRAG_FUNCTION
                          ? `linear-gradient(${DragFunctionColour}, #f9a8d4)`
                          : loopDataPoint.dataType === TIMEOUT_FUNCTION
                          ? `linear-gradient(${TimeoutFunctionColour}, #fa8773)`
                          : 'none',
                    }}
                    type='text'
                    name='data_point'
                    id='data_point'
                    value={
                      loopDataPoint.dataType === TAP_FUNCTION ||
                      loopDataPoint.dataType === MOVE_FUNCTION ||
                      loopDataPoint.dataType === MOVE_TAP_FUNCTION
                        ? `x: ${loopDataPoint.xPos}, y: ${loopDataPoint.yPos}`
                        : loopDataPoint.dataType === TIMEOUT_FUNCTION
                        ? `t: ${loopDataPoint.timeoutLength}`
                        : loopDataPoint.dataType === DRAG_FUNCTION
                        ? `x1: ${loopDataPoint.startxPos}, y1: ${loopDataPoint.startyPos} x2: ${loopDataPoint.finishxPos}, y2: ${loopDataPoint.finishyPos}`
                        : null
                    }
                  />
                </div>
                {/* Delete button */}
                <div className='grid min-w-[16px]'>
                  <div></div>
                </div>
              </div>
            );
          }
        )}
    </>
  );
}

export default LoopItemContainer;
