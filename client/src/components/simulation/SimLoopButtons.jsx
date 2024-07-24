import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function SimLoopButtons() {
  const { displaySimOrLoop, setDisplaySimOrLoop } = useContext(SimulationContext);

  const selectLoopsList = () => {
    setDisplaySimOrLoop('loop');
  };

  const selectSimulationList = () => {
    setDisplaySimOrLoop('simulation');
  };
  
  return (
    <section className='grid grid-cols-2 gap-2 h-fit w-full p-2'>
      <div className='grid w-full'>
        <button
          title='Main simulation data points'
          onClick={selectSimulationList}
          className={`${
            displaySimOrLoop === 'simulation'
              ? 'bg-secondary-colour shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-main-colour'
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
              ? 'bg-secondary-colour shadow-[0_10px_20px_rgba(250,204,_21,_0.8)]'
              : 'bg-main-colour'
          } px-2 rounded-lg text-black w-full outline outline-black outline-2 hover:brightness-90 active:scale-95`}
        >
          Loops
        </button>
      </div>
    </section>
  );
}

export default SimLoopButtons;
