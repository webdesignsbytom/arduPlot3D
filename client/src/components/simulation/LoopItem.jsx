import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function LoopItem({ index, loopData }) {
  const {
    openAndDisplayLoop,
    setIsCreatingEditingLoop,
    setLoopDataBeingEdited,
    displaySimOrLoop,
    deleteDataPointFromSimulation,
  } = useContext(SimulationContext);

  console.log('LI INDEX', index);
  console.log('LI DATA', loopData);

  const editLoop = (event, loop) => {
    event.preventDefault();

    setLoopDataBeingEdited(loop);
    setIsCreatingEditingLoop(true);
  };

  return (
    <div key={index} className='grid grid-cols-a1a h-[30px] w-full gap-2'>
      <div className='grid items-center justify-center w-[30px] bg-purple-400 h-full outline outline-2 outline-black px-2'>
        <label
          htmlFor='loop'
          className='h-full grid items-center justify-center'
        >
          {index + 1}L
        </label>
      </div>
      <div
        title='Click to view'
        onClick={() => openAndDisplayLoop(loopData, index)}
        className='grid bg-white grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer active:scale-95 hover:bg-yellow-200'
      >
        <div>{loopData.loopTitle}</div>
      </div>

      {/* Edit button */}
      <div className='grid grid-cols-2 gap-1'>
        <button
          title='Edit loop'
          id='edit_loop'
          onClick={(event) => editLoop(event, loopData)}
          className='active:scale-95 no__highlights rounded-xl'
        >
          <FaEdit />
        </button>

        {/* Delete button */}
        <button
          title='Delete loop'
          id='delete_loop'
          onClick={
            displaySimOrLoop === 'simulation'
              ? (event) => deleteDataPointFromSimulation(event, index)
              : null
          }
          className='active:scale-95 no__highlights rounded-xl'
        >
          <IoCloseCircleSharp />
        </button>
      </div>
    </div>
  );
}

export default LoopItem;
