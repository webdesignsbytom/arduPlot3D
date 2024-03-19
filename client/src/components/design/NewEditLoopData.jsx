import React, { useContext, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';
import SimulationItem from './SimulationItem';

function NewEditLoopData() {
  const {
    setIsCreatingEditingLoop,
    loopDataBeingEdited,
    setLoopDataBeingEdited,
    displayDataPointsIndex,
    simulationData,
    setSimulationData,
  } = useContext(DesignContext);

  const saveLoopPerminently = () => {
    const updatedLoop = loopDataBeingEdited;
    const indexToReplace = displayDataPointsIndex;
    console.log('updated loop', updatedLoop);

    const newSimulationLoops = simulationData.simulationLoops.map(
      (loop, index) => {
        if (index === indexToReplace) {
          return updatedLoop; // Replace the loop at this index with the updated loop
        } else {
          return loop; // Otherwise, keep the loop as is
        }
      }
    );

    // Then, we set the updated simulation data with the new array of simulation loops
    setSimulationData({
      ...simulationData, // Spread the existing properties of simulationData
      simulationLoops: newSimulationLoops, // Replace simulationLoops with the new array
    });

    setIsCreatingEditingLoop(false);
  };

  const deleteAllLoopData = () => {
    setIsCreatingEditingLoop(false);
    setLoopDataBeingEdited({
      loopTitle: '',
      mainSimulationLoopDataPoints: [],
      loopTimeToComplete: 0,
    });
  };

  const handleChangeLoopTitleName = (event) => {
    const { value } = event.target;

    setLoopDataBeingEdited({
      ...loopDataBeingEdited,
      loopTitle: value,
    });
  };

  console.log('loopDataBeingEdited', loopDataBeingEdited);

  return (
    <div className='grid overflow-y-scroll h-full w-full px-1'>
      <section className='grid w-full mb-2'>
        <div className='grid w-full'>
          <label htmlFor='loop_title' className='text-xs mb-1 text-left'>
            Loop Title
          </label>
        </div>
        <div className='grid w-full'>
          <input
            type='text'
            value={loopDataBeingEdited.loopTitle}
            onChange={handleChangeLoopTitleName}
            className='outline outline-yellow-400 outline-1 rounded-xl px-1 py-1 bg-white w-full'
          />
        </div>
      </section>

      {loopDataBeingEdited.mainSimulationLoopDataPoints.map(
        (dataPoint, index) => {
          return (
            <SimulationItem
              key={index}
              dataIndex={index}
              dataPoint={dataPoint}
            />
          );
        }
      )}
      <div className='mt-2'>
        <button
          onClick={saveLoopPerminently}
          className='bg-yellow-400 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Save
        </button>
      </div>
      <div className='mt-2'>
        <button
          onClick={deleteAllLoopData}
          className='bg-red-400 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NewEditLoopData;
