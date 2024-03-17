import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
// Context
import { DesignContext } from '../../context/DesignContext';

function LoopItem({ loop, index, deleteLoop }) {
  const { openAndEditLoop } = useContext(DesignContext);

  return (
    <div key={index} className='grid grid-cols-a1a h-[30px] w-full gap-2'>
      <div className='grid items-center justify-center w-[30px] bg-slate-300 h-full outline outline-2 outline-black px-2'>
        <label
          htmlFor='loop'
          className='h-full grid items-center justify-center'
        >
          {index + 1}
        </label>
      </div>
      <div
        title='Click to edit'
        onClick={() => openAndEditLoop(loop, index)}
        className='grid bg-slate-200 grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer active:scale-95 hover:bg-yellow-200'
      >
        <div>{loop.loopTitle}</div>
        <div>T: {loop.loopTimeToComplete}</div>
      </div>

      {/* Delete button */}
      <div className='grid'>
        <button
          id='delete_loop'
          onClick={(event) => deleteLoop(event, loop)}
          className='active:scale-95 no__highlights rounded-xl'
        >
          <IoCloseCircleSharp />
        </button>
      </div>
    </div>
  );
}

export default LoopItem;
