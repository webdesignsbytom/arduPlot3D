import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function LoopItem({ loop, index, deleteLoop }) {
  const {
    openAndEditLoop,
    isCreatingEditingLoop,
    setIsCreatingEditingLoop,
    setLoopDataBeingEdited,
  } = useContext(SimulationContext);

  const editLoop = (event, loop) => {
    event.preventDefault();
    console.log('PPPPPPPPPPPPPPPPPPPPPPPPPppp');
    setLoopDataBeingEdited(loop);
    setIsCreatingEditingLoop(true);
  };

  return (
    <div key={index} className='grid grid-cols-a1a h-[30px] w-full gap-2'>
      <div className='grid items-center justify-center w-[30px] bg-slate-300 h-full outline outline-2 outline-black px-2'>
        <label
          htmlFor='loop'
          className='h-full grid items-center justify-center'
        >
          {index + 1}
        </label>
      </div>
      <div
        title='Click to edit'
        onClick={() => openAndEditLoop(loop, index)}
        className='grid bg-white grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer active:scale-95 hover:bg-yellow-200'
      >
        <div>{loop.loopTitle}</div>
        <div>T: {loop.loopTimeToComplete}</div>
      </div>

      {/* Delete button */}
      <div className='grid grid-cols-2 gap-1'>
        <button
          title='Edit loop'
          id='edit_loop'
          onClick={(event) => editLoop(event, loop)}
          className='active:scale-95 no__highlights rounded-xl'
        >
          <FaEdit />
        </button>
        <button
          title='Delete loop'
          id='delete_loop'
          onClick={(event) => deleteLoop(event, loop)}
          className='active:scale-95 no__highlights rounded-xl'
        >
          <IoCloseCircleSharp />
        </button>
      </div>
    </div>
  );
}

export default LoopItem;
