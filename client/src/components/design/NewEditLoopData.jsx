import React, { useContext, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';
import SimulationItem from './SimulationItem';

function NewEditLoopData() {
  const {
    isCreatingEditingLoop,
    setIsCreatingEditingLoop,
    loopDataBeingEdited,
    clearDataPoints,
    setLoopDataBeingEdited,
  } = useContext(DesignContext);

  const [newLoopData, setNewLoopData] = useState({
    loopTitle: '',
    mainSimulationLoopDataPoints: [],
    loopTimeToComplete: 0,
  });

  const saveLoopPerminently = () => {
    setIsCreatingEditingLoop(false);
  };

  const deleteAllLoopData = () => {
    setIsCreatingEditingLoop(false);
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
    <div className='grid overflow-hidden w-full px-1'>
      <section className='grid w-full mb-2'>
        <div className='grid w-full'>
          <label htmlFor='loop_title' className='text-xs mb-1 text-left'>
            Loop Title
          </label>
        </div>
        <div className='grid w-full'>
          <input
            type='text'
            placeholder='undefined...'
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
