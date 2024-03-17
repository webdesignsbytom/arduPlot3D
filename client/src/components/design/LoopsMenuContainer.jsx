import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
// Context
import { DesignContext } from '../../context/DesignContext';

function LoopsMenuContainer({
  dataPointsCollections,
  handleChange,
  clearDataPoint,
}) {
  const { simulationData } = useContext(DesignContext);

  const deleteLoop = (loop) => {
    console.log('loop', loop);
  };

  const openAndEditLoop = (loop) => {
    console.log('loop', loop);
  };

  return (
    <div className='overflow-y-scroll gap-1 p-1'>
      {simulationData.simulationLoops.map((loop, index) => {
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
            <div onClick={() => openAndEditLoop(loop)} className='grid bg-white grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer active:scale-95 hover:bg-yellow-200'>
              <div>{loop.loopTitle}</div>
              <div>T: {loop.loopTimeToComplete}</div>
            </div>
            {/* Delete button */}
            <div className='grid'>
              <button
                id='pointOne'
                onClick={() => deleteLoop(loop)}
                className='active:scale-95 no__highlights rounded-xl'
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

export default LoopsMenuContainer;
