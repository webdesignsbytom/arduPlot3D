import React, { useContext, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
import { useModalContext } from '../../context/ModalContext';

function AddLoopToSimulationModal() {
  const { simulationData, createNewLoop, addLoopToSimulation } =
    useContext(SimulationContext);

  const { handleCloseLoopModal } = useModalContext();

  const [availableLoops] = useState(simulationData.simulationLoops);
  const [loopToAdd, setLoopToAdd] = useState(simulationData.simulationLoops[0]);

  const handleAddSimulationLoop = () => {
    addLoopToSimulation(loopToAdd);
  };

  const handleLoopChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10); // Ensure the value is treated as an integer
    if (!isNaN(selectedIndex)) {
      const selectedLoop = availableLoops[selectedIndex];
      setLoopToAdd(selectedLoop);
    } else {
      console.log('Invalid selection index:', event.target.value); // Diagnostic log for invalid selections
    }
  };

  const handleCreateNewLoop = (event) => {
    event.preventDefault();
    createNewLoop();
  };

  return (
    <section className='grid outline outline-colour2 outline-2 rounded-lg z-20 bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='py-2 px-4'>
        <div className='text-center'>
          <h4 className='text-lg'>Add Loop</h4>
        </div>

        <section className='mt-4'>
          <div>
            <label htmlFor='numberFingers' className='text-sm'>
              Create new loop or select from list
            </label>
          </div>

          <section className='grid grid-cols-rev gap-2'>
            <div className='grid w-full text-center'>
              <select
                className='outline outline-1 outline-colour2 px-1 rounded-lg w-full min-w-[200px] shadow-lg'
                onChange={handleLoopChange}
                aria-label='List of available premade loops'
              >
                {availableLoops.map((loop, index) => (
                  <option value={index} key={index}>
                    {loop.loopTitle}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={handleAddSimulationLoop}
                className='outline outline-1 outline-colour2 bg-secondary-colour active:scale-95 px-4 py-2 w-full rounded-lg  hover:bg-colour2 shadow-lg hover:text-secondary-colour'
                aria-label='Add selected loop to simulation button'
              >
                Add
              </button>
            </div>
          </section>

          <section className='grid mt-4'>
            <div className='grid justify-center'>
              <button
                onClick={handleCreateNewLoop}
                className='outline outline-1 outline-colour2 bg-secondary-colour active:scale-95 px-4 py-2 w-full rounded-lg hover:text-secondary-colour hover:bg-colour2 shadow-lg'
                aria-label='Create a new loop button'
              >
                Create New Loop
              </button>
            </div>
          </section>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={handleCloseLoopModal}
              className='bg-colour2 active:scale-95 px-4 sm:px-10 py-2 w-full rounded-lg hover:brightness-90'
              aria-label='Close Add Loop modal'
            >
              Close
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AddLoopToSimulationModal;
