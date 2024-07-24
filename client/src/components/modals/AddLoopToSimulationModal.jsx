import React, { useContext, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function AddLoopToSimulationModal() {
  const { setAddCreateLoopModalOpen, simulationData, setDisplaySimOrLoop, simulationLoopData, setSimulationData, createNewLoop } =
    useContext(SimulationContext);

  const [availableLoops, setAvailableLoops] = useState(
    simulationData.simulationLoops
  );

  const [loopToAdd, setLoopToAdd] = useState(simulationData.simulationLoops[0]);

  const closeModal = () => {
    setAddCreateLoopModalOpen(false);
  };


  const addLoopToSimulation = () => {
    setSimulationData({
      ...simulationData,
      mainSimulationDataPoints: [...simulationData.mainSimulationDataPoints, loopToAdd],
    });
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

  return (
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg z-20 bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
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
                className='outline outline-1 outline-yellow-400 px-1 rounded-lg w-full min-w-[200px]'
                onChange={handleLoopChange}
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
                onClick={() => addLoopToSimulation()}
                className='outline outline-1 outline-yellow-400 bg-white active:scale-95 px-4 py-2 w-full rounded-lg hover:text-white hover:bg-yellow-400'
              >
                Add
              </button>
            </div>
          </section>

          <section className='grid mt-4'>
            <div className='grid justify-center'>
              <button
                onClick={createNewLoop}
                className='outline outline-1 outline-yellow-400 bg-white active:scale-95 px-4 py-2 w-full rounded-lg hover:text-white hover:bg-yellow-400'
              >
                Create New Loop
              </button>
            </div>
          </section>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={closeModal}
              className='bg-yellow-400 active:scale-95 px-4 sm:px-10 py-2 w-full rounded-lg hover:brightness-90'
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
