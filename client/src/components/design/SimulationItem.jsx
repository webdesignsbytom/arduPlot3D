import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
import { FaRulerCombined } from 'react-icons/fa';
import { MdHideSource } from 'react-icons/md';
import { ImLoop } from 'react-icons/im';
import { FaRegSave } from 'react-icons/fa';
import { TbHandFinger } from 'react-icons/tb';
import { TbHandTwoFingers } from 'react-icons/tb';
import { TbHandThreeFingers } from 'react-icons/tb';
import { RiDragDropLine } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdMove } from 'react-icons/io';
import { HiCursorArrowRipple } from 'react-icons/hi2';
import { GiArrowCursor } from 'react-icons/gi';
import { DesignContext } from '../../context/DesignContext';

function SimulationItem({
  dataIndex,
  dataPoint,
}) {
  const { handleDataPointChange, clearDataPoints } = useContext(DesignContext)

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
            <IoMdMove />
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
          className={`w-full h-full px-2 ${
            dataPoint.dataType === 'tap'
              ? 'bg-green-200'
              : dataPoint.dataType === 'move_tap'
              ? 'bg-yellow-200'
              : dataPoint.dataType === 'move'
              ? 'bg-purple-200'
              : dataPoint.dataType === 'drag'
              ? 'bg-pink-200'
              : dataPoint.dataType === 'timeout'
              ? 'bg-blue-200'
              : null
          }`}
          type='text'
          name='data_point'
          id='data_point'
          value={`x: ${dataPoint.xPos}, y: ${dataPoint.yPos}`}
          onChange={handleDataPointChange}
        />
      </div>
      {/* Delete button */}
      <div className='grid'>
        <button
          id='pointOne'
          onClick={clearDataPoints}
          className='active:scale-95 no__highlights rounded-xl'
        >
          <IoCloseCircleSharp />
        </button>
      </div>
    </div>
  );
}

export default SimulationItem;
