import React, { useContext, useEffect, useState } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import LoopItemContainer from './LoopItemContainer';

function LoopsMenuDisplay() {
  const {
    simulationData,
    setSimulationData,
    createNewLoop
  } = useContext(SimulationContext);


  const deleteLoop = (event, loop) => {
    event.preventDefault(); // This will prevent the default action
    console.log('loop', loop);

    let arrayOfLoops = simulationData.simulationLoops;
    var found = arrayOfLoops.filter(
      (arrayLoop) => arrayLoop.loopTitle !== loop.loopTitle
    );
    console.log('found', found);
    console.log('arrayOfLoops', arrayOfLoops);

    setSimulationData({
      ...simulationData,
      simulationLoops: found,
    });
  };

  const deleteLoopDataPoint = (event, dataPoint) => {
    event.preventDefault(); // This will prevent the default action

    console.log('dataPoint', dataPoint);
  };

  return (
    <div className='overflow-y-scroll gap-1 p-1'>
      {simulationData.simulationLoops.map((loop, index) => {
        return (
          <LoopItemContainer key={index} index={index} loopData={loop} />
        );
      })}
      <div className='mt-2'>
        <button
          onClick={(event) => createNewLoop(event)}
          className='bg-yellow-400 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Create New Loop +
        </button>
      </div>
    </div>
  );
}

export default LoopsMenuDisplay;
