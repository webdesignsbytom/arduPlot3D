import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import LoopItemContainer from './LoopItemContainer';

function LoopsMenuDisplay() {
  const { simulationData, setSimulationData, createNewLoop } =
    useContext(SimulationContext);

  const endOfListRef = useRef(null); // Create a ref for the bottom of the list

  const [loopDataArray, setLoopDataArray] = useState(simulationData.loops);

  useEffect(() => {
    setLoopDataArray(simulationData.loops);
  }, [simulationData.loops]);

  useEffect(() => {
    // Scroll to the end of the list whenever simulationData.loops changes
    endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simulationData.loops]);

  return (
    <div className='overflow-y-auto gap-1 p-1'>
      {loopDataArray.map((loop, index) => (
        <LoopItemContainer key={index} index={index} loopData={loop} />
      ))}
      {/* Invisible div at the bottom of the list to attach the ref */}
      <div ref={endOfListRef}></div>
      <div className='mt-2'>
        <button
          onClick={(event) => createNewLoop(event)}
          className='bg-main-colour rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Create New Loop +
        </button>
      </div>
    </div>
  );
}

export default LoopsMenuDisplay;
