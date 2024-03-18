import React, { useContext, useEffect, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';
// Components
import SimulationDataPoints from './SimulationDataPoints';
import LoopDataPoints from './LoopDataPoints';
import DataPlotsContainer from './DataPlotsContainer';
import LoopsMenuContainer from './LoopsMenuContainer';
import NewEditLoopData from './NewEditLoopData';

function DesignDataBar({
  clearDataPoint,
  lineRef,
  loopDataPoints,
  simulationDataPoints,
  setDataCollection,
}) {
  const { displaySimOrLoop, setDisplaySimOrLoop, isCreatingEditingLoop } =
    useContext(DesignContext);

  const handleChange = () => {};

  const selectLoopsList = () => {
    setDisplaySimOrLoop('loop');
  };

  const selectSimulationList = () => {
    setDisplaySimOrLoop('simulation');
  };

  return (
    <section className='bg-white h-full grid grid-rows-reg border-l-2 border-solid border-black p-1 overflow-hidden'>
      {/* Header data */}
      <article className='grid h-fit'>
        <h2 className='text-xl text-center'>Simulation Data</h2>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className='p-1'>
          <p className='leading-4 text-xs'>
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
                title='Main simulation data points'
                onClick={selectSimulationList}
                className={`${
                  displaySimOrLoop === 'simulation'
                    ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                    : 'bg-yellow-400'
                } px-2 rounded-lg text-black w-full outline outline-black outline-2 hover:brightness-90 active:scale-95`}
              >
                Simulation
              </button>
            </div>
            <div className='grid w-full'>
              <button
                title='Loops and loop data points'
                onClick={selectLoopsList}
                className={`${
                  displaySimOrLoop === 'loop'
                    ? 'bg-white shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
                    : 'bg-yellow-400'
                } px-2 rounded-lg text-black w-full outline outline-black outline-2 hover:brightness-90 active:scale-95`}
              >
                Loops
              </button>
            </div>
          </section>

          {isCreatingEditingLoop ? (
            <div className='h-full text-center mt-1'>
              <span>Loop Create/edit</span>
              <NewEditLoopData />
            </div>
          ) : (
            <form className='grid w-full overflow-hidden h-full'>
              {
                displaySimOrLoop === 'loop' ? (
                  <LoopsMenuContainer
                    dataPointsCollections={loopDataPoints}
                    handleChange={handleChange}
                    clearDataPoint={clearDataPoint}
                  />
                ) : displaySimOrLoop === 'simulation' ? (
                  <DataPlotsContainer
                    dataPointsCollections={simulationDataPoints}
                    handleChange={handleChange}
                    clearDataPoint={clearDataPoint}
                  />
                ) : null // or any other default case you might want to handle
              }
            </form>
          )}
        </div>
      </section>
    </section>
  );
}

export default DesignDataBar;
