import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
import { TbHandFinger } from 'react-icons/tb';
import { TbHandTwoFingers } from 'react-icons/tb';
import { TbHandThreeFingers } from 'react-icons/tb';
import { RiDragDropLine } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdMove } from 'react-icons/io';
import { FaArrowsTurnToDots } from "react-icons/fa6";
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Colours
import { DragFunctionColour, MoveFunctionColour, MoveTapFunctionColour, TapFunctionColour, TimeoutFunctionColour } from '../../utils/design/Constants';

function SimulationItem({ dataIndex, dataPoint }) {
  const { handleDataPointChange, deleteDataPointFromSimulation } = useContext(SimulationContext);

  return (
    <div key={dataIndex} className='grid grid-cols-a1a h-[30px] w-full gap-2'>
      <div className='grid items-center justify-center w-[30px] bg-blue-200 h-full outline outline-2 outline-black px-2'>
        <label
          htmlFor='data_point'
          className='h-full grid items-center justify-center'
        >
          {dataIndex + 1}
        </label>
      </div>
      <div className='grid grid-cols-reg w-full h-full outline-black outline outline-2'>
        <div className='grid items-center bg-white px-1'>
          {dataPoint.dataType === 'tap' && dataPoint.numFingers === 1 ? (
            <TbHandFinger />
          ) : dataPoint.dataType === 'tap' && dataPoint.numFingers === 2 ? (
            <TbHandTwoFingers />
          ) : dataPoint.dataType === 'tap' && dataPoint.numFingers === 3 ? (
            <TbHandThreeFingers />
          ) : dataPoint.dataType === 'move_tap' ? (
            <FaArrowsTurnToDots />
          ) : dataPoint.dataType === 'move' ? (
            <IoMdMove />
          ) : dataPoint.dataType === 'drag' ? (
            <RiDragDropLine />
          ) : dataPoint.dataType === 'timeout' ? (
            <IoTimeOutline />
          ) : null}
        </div>
        <input
          title={dataPoint.dataType}
          className={`w-full h-full px-2`}
          style={{
            background: dataPoint.dataType === 'tap' ? `linear-gradient(${TapFunctionColour}, #98e5bc)`
              : dataPoint.dataType === 'move_tap' ? `linear-gradient(${MoveTapFunctionColour}, #e5d860)`
              : dataPoint.dataType === 'move' ? `linear-gradient(${MoveFunctionColour}, #c4b5fd)`
              : dataPoint.dataType === 'drag' ? `linear-gradient(${DragFunctionColour}, #f9a8d4)`
              : dataPoint.dataType === 'timeout' ? `linear-gradient(${TimeoutFunctionColour}, #93c5fd)`
              : 'none'
          }}
          type='text'
          name='data_point'
          id='data_point'
          value={
            dataPoint.dataType === 'tap' ||
            dataPoint.dataType === 'move' ||
            dataPoint.dataType === 'move_tap'
              ? `x: ${dataPoint.xPos}, y: ${dataPoint.yPos}`
              : dataPoint.dataType === 'timeout'
              ? `t: ${dataPoint.timeoutLength}`
              : dataPoint.dataType === 'drag'
              ? `x1: ${dataPoint.startxPos}, y1: ${dataPoint.startyPos} x2: ${dataPoint.finishxPos}, y2: ${dataPoint.finishyPos}`
              : null
          }
          onChange={handleDataPointChange}
        />
      </div>
      {/* Delete button */}
      <div className='grid'>
        <button
          id='pointOne'
          onClick={(event) => deleteDataPointFromSimulation(event, dataIndex)}
          className='active:scale-95 no__highlights rounded-xl'
        >
          <IoCloseCircleSharp />
        </button>
      </div>
    </div>
  );
}

export default SimulationItem;
