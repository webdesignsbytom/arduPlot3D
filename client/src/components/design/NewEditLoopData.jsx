import React, { useContext, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';
import SimulationItem from './SimulationItem';

function NewEditLoopData() {
  const {
    isCreatingEditingLoop,
    setIsCreatingEditingLoop,
    loopDataBeingEdited,clearDataPoints
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

  return (
    <div className='grid'>
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
