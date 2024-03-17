import React from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';

function DataPlotsContainer({
  dataPointsCollections,
  handleChange,
  clearDataPoint,
}) {
  return (
    <div className='overflow-y-scroll gap-1 p-1'>
      {dataPointsCollections?.map((dataPoint, index) => {
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
                value={`x: ${dataPoint.xpos}, y: ${dataPoint.ypos}`}
                onChange={handleChange}
              />
            </div>
            {/* Delete button */}
            <div className='grid'>
              <button
                id='pointOne'
                onClick={clearDataPoint}
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

export default DataPlotsContainer;
