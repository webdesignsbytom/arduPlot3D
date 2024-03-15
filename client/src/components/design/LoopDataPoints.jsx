import React from 'react'
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';

function LoopDataPoints({ dataCollection, handleChange, clearDataPoints }) {
  return (
    <div className='grid overflow-y-scroll gap-1 items-start p-1'>
      {dataCollection?.map((item, index) => {
        return (
          <div key={index} className='grid grid-cols-a1a h-[30px] w-full gap-2'>
            <div className='grid items-center justify-center w-[30px] bg-slate-300 h-full outline outline-2 outline-black px-2'>
              <label
                htmlFor='pointOne'
                className='h-full grid items-center justify-center'
              >
                {index + 1}
              </label>
            </div>
            <div className='grid w-full h-full outline-black outline outline-2'>
              <input
                className='w-full h-full px-2'
                type='text'
                name='pointOne'
                id='pointOne'
                value={`x: ${item.xpos}, y: ${item.ypos}`}
                onChange={handleChange}
              />
            </div>
            {/* Delete button */}
            <div className='grid'>
              <button
                id='pointOne'
                onClick={clearDataPoints}
                className='active:scale-95 no__highlights hover:bg-yellow-100 rounded-xl'
              >
                <IoCloseCircleSharp />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LoopDataPoints