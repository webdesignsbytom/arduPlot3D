import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import NewEditLoopData from '../simulation/NewEditLoopData';
import SimLoopButtons from '../simulation/SimLoopButtons';
import LoopsMenuDisplay from '../simulation/LoopsMenuDisplay';
import SimulationDataPointDisplay from '../simulation/SimulationDataPointDisplay';

function SimulationDataToobar() {
  const {
    displaySimOrLoop,
    isCreatingEditingLoop,
  } = useContext(SimulationContext);

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

      {/* Plot point information */}
      <section className='grid h-full w-full overflow-hidden'>
        <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
          {/* Sim or Loop selection Buttons */}
          {!isCreatingEditingLoop && <SimLoopButtons />}

          {/* Edit loop display */}
          {isCreatingEditingLoop ? (
            <div className='h-full grid overflow-hidden grid-rows-reg text-center'>
              <span>Loop Create/edit</span>
              <NewEditLoopData />
            </div>
          ) : (
            // Loop Or Simulaton display
            <form className='grid w-full overflow-hidden h-full'>
              {
                displaySimOrLoop === 'loop' ? (
                  <LoopsMenuDisplay />
                ) : displaySimOrLoop === 'simulation' ? (
                  <SimulationDataPointDisplay />
                ) : null // or any other default case you might want to handle
              }
            </form>
          )}
        </div>
      </section>
    </section>
  );
}

export default SimulationDataToobar;
