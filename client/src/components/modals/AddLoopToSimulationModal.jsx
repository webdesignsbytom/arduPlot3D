import React, { useContext, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';

function AddLoopToSimulationModal() {
  const { setAddCreateLoopModalOpen, simulationData, setDisplaySimOrLoop, simulationLoopData, setSimulationData } =
    useContext(DesignContext);

  const [availableLoops, setAvailableLoops] = useState(
    simulationData.simulationLoops
  );

  console.log('availableLoops', availableLoops);

  const [loopToAdd, setLoopToAdd] = useState(simulationData.simulationLoops[0]);

  const closeModal = () => {
    setAddCreateLoopModalOpen(false);
  };

  const createNewLoop = () => {
    setAddCreateLoopModalOpen(false);
    setDisplaySimOrLoop('loop')

    // Determine the new loop's index based on the current array length
    const newLoopIndex = simulationData.simulationLoops.length;
  
    // Construct the new loop name by adding 1 to the new loop's index
    const newLoopName = `Loop ${newLoopIndex + 1}`;
  
    // Assuming simulationLoopData is structured correctly but needs a name update
    let newLoop = {
      ...simulationLoopData,
      loopTitle: newLoopName, // Update the loop title with the new name
    };
  
    // Use the spread operator to copy existing loops and add the new loop
    setSimulationData({
      ...simulationData,
      simulationLoops: [...simulationData.simulationLoops, newLoop],
    });
  };

  const addLoopToSimulation = () => {
    console.log('addLoopToSimulation() - loopToAdd', loopToAdd);
    setSimulationData({
      ...simulationData,
      mainSimulationDataPoints: [...simulationData.mainSimulationDataPoints, loopToAdd],
    });
  };

  const handleLoopChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10); // Ensure the value is treated as an integer
    if (!isNaN(selectedIndex)) {
      const selectedLoop = availableLoops[selectedIndex];
      console.log('Selected device: ', selectedLoop); // Diagnostic log
      setLoopToAdd(selectedLoop);
    } else {
      console.log('Invalid selection index:', event.target.value); // Diagnostic log for invalid selections
    }
  };

  return (
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Add Loop</h4>
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
                className='outline outline-1 outline-yellow-400 bg-white active:scale-95 px-4 py-2 w-full rounded-lg'
              >
                Add
              </button>
            </div>
          </section>

          <section className='grid mt-4'>
            <div className='grid justify-center'>
              <button
                onClick={createNewLoop}
                className='outline outline-1 outline-yellow-400 bg-white active:scale-95 px-4 py-2 w-full rounded-lg'
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
              className='bg-yellow-400 active:scale-95 px-4 py-2 w-full rounded-lg'
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
