import React, { useContext, useEffect, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';
// Components
import SimulationDataPoints from './SimulationDataPoints';
import LoopDataPoints from './LoopDataPoints';

function DesignDataBar({
  clearDataPoints,
  lineRef,
  dataCollection,
  setDataCollection,
}) {
  console.log('PPPP dataCollection', dataCollection);

  const { displaySimOrLoop, setDisplaySimOrLoop } = useContext(DesignContext);

  const handleChange = () => {};

  const toggleSimLoops = () => {
    setDisplaySimOrLoop(!displaySimOrLoop);
  };

  return (
    <section className='bg-white grid grid-rows-reg border-l-2 border-solid border-black p-1 overflow-hidden'>
      {/* Header data */}
      <article className='grid h-fit'>
        <h2 className='text-xl text-center'>Simulation Data</h2>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className='p-1'>
          <p className='leading-4 text-xs'>
            See a list of your movements and timing controls for a simulation.
            Edit and modify the positions to refine your simulation.
          </p>
        </div>
      </article>

      {/* List of plot points */}
      <section className='grid h-full w-full overflow-hidden'>
        <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
          {/* Buttons */}
          <section className='grid grid-cols-2 gap-2 h-fit w-full p-2'>
            <div className='grid w-full'>
              <button
                onClick={toggleSimLoops}
                className={`${displaySimOrLoop ? "bg-yellow-400" : "bg-slate-300"} px-2 rounded-lg text-black w-full outline outline-black outline-2 hover:brightness-90 active:scale-95`}
              >
                Simualtion
              </button>
            </div>
            <div className='grid w-full'>
              <button
                onClick={toggleSimLoops}
                className={`${displaySimOrLoop ? "bg-slate-300" : "bg-yellow-400"} px-2 rounded-lg text-black w-full outline outline-black outline-2 hover:brightness-90 active:scale-95`}
              >
                Loops
              </button>
            </div>
          </section>

          {/* List */}
          <form className='grid w-full overflow-hidden items-start'>
            {displaySimOrLoop ? (
              <LoopDataPoints
                dataCollection={dataCollection}
                handleChange={handleChange}
                clearDataPoints={clearDataPoints}
              />
            ) : (
              <SimulationDataPoints
                dataCollection={dataCollection}
                handleChange={handleChange}
                clearDataPoints={clearDataPoints}
              />
            )}
          </form>
        </div>
      </section>
    </section>
  );
}

export default DesignDataBar;
