import React, { useContext, useEffect, useRef } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import SimulationItem from './SimulationItem';
import { blankLoopObject } from '../../utils/design/TempData';

function NewEditLoopData() {
  const {
    setIsCreatingEditingLoop,
    loopDataBeingEdited,
    setLoopDataBeingEdited,
    displayLoopDataPointsIndex,
    simulationData,
    setSimulationData,
  } = useContext(SimulationContext);

  const endOfListRef = useRef(null); // Ref for the end of the list

  // Automatically scroll to the last item when the loop data points update
  useEffect(() => {
    endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [loopDataBeingEdited.mainSimulationLoopDataPoints]);

  const saveLoopPerminently = () => {
    const updatedLoop = loopDataBeingEdited;
    const indexToReplace = displayLoopDataPointsIndex;

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
    setLoopDataBeingEdited(blankLoopObject);
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

  console.log('XXX loopDataBeingEdited', loopDataBeingEdited);

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

      {loopDataBeingEdited.mainSimulationLoopDataPoints.map((dataPoint, index) => {
        const isLastItem = index === loopDataBeingEdited.mainSimulationLoopDataPoints.length - 1;
        return (
          <div ref={isLastItem ? endOfListRef : null} key={index}>
            <SimulationItem
              dataIndex={index}
              dataPoint={dataPoint}
            />
          </div>
        );
      })}
      
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
