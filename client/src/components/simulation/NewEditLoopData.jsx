import React, { useContext, useEffect, useRef } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import SimulationItem from './SimulationItem';

function NewEditLoopData() {
  const {
    setIsCreatingEditingLoop,
    loopDataBeingEdited,
    setLoopDataBeingEdited,
    displayLoopDataPointsIndex,
    saveLoopPerminently,
    dataPointMarkerRef,
    deleteSavedLoopFromSimulation,
  } = useContext(SimulationContext);

  // Automatically scroll to the last item when the loop data points update
  const endOfListRef = useRef(null); // Ref for the end of the list

  useEffect(() => {
    // TODO: 
    endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
    dataPointMarkerRef.current =
      loopDataBeingEdited.mainSimulationLoopDataPoints.length;
  }, [loopDataBeingEdited.mainSimulationLoopDataPoints]);

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

  return (
    <div className='grid overflow-y-auto h-full w-full px-1'>
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
          const isLastItem =
            index ===
            loopDataBeingEdited.mainSimulationLoopDataPoints.length - 1;
          return (
            <div ref={isLastItem ? endOfListRef : null} key={index}>
              <SimulationItem dataIndex={index} dataPoint={dataPoint} />
            </div>
          );
        }
      )}

      <div className='mt-2'>
        <button
          onClick={saveLoopPerminently}
          className='bg-green-400 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Save
        </button>
      </div>
      <div className='mt-2'>
        <button
          onClick={deleteAllLoopData}
          className='bg-yellow-600 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Reset
        </button>
      </div>
      <div className='mt-2'>
        <button
          onClick={(event) => deleteSavedLoopFromSimulation(event, displayLoopDataPointsIndex)}
          className='bg-red-500 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NewEditLoopData;
