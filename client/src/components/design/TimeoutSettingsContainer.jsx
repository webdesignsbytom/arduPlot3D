import React from 'react';
import { timeoutUnitTypesAvailable } from '../../utils/design/DesignUtils';

function TimeoutSettingsContainer({
  timeoutLength,
  setTimeoutLength,
  timeoutUnitSelected,
  setTimeoutUnitSelected,
  closeTimeoutSettingsModal,
}) {
  console.log('timeoutUnitSelected', timeoutUnitSelected);
  const setTimeUnits = (event) => {
    const { id } = event.target;
    console.log('id xxx', id);
    if (id === 'seconds') {
      setTimeoutUnitSelected(timeoutUnitTypesAvailable[1]);
    } else if (id === 'milliseconds') {
      setTimeoutUnitSelected(timeoutUnitTypesAvailable[0]);
    }
  };

  const handleTimeoutChange = (event) => {
    const newLength = event.target.value; // Get the new speed value from the input
    setTimeoutLength(newLength); // Update the state with the new speed
  };

  return (
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Timeout Settings</h4>
        </div>

        <section className='mt-4'>
          <div>
            <label htmlFor='numberFingers' className='text-sm'>
              Set wait period before next movement
            </label>
          </div>
          <div className='grid grid-cols-2 gap-0 mt-1'>
            <button
              id='seconds'
              onClick={setTimeUnits}
              className={`grid bg-white ${
                timeoutUnitSelected.name === 'seconds'
                  ? 'bg-yellow-400'
                  : 'bg-white'
              } outline outline-1 outline-yellow-400 px-1 py-1 w-full h-fit rounded-tl-xl rounded-bl-xl active:scale-95`}
            >
              Seconds
            </button>
            <button
              id='milliseconds'
              onClick={setTimeUnits}
              className={`grid bg-white ${
                timeoutUnitSelected.name === 'milliseconds'
                  ? 'bg-yellow-400'
                  : 'bg-white'
              } outline outline-1 outline-yellow-400 px-1 py-1 w-full h-fit rounded-tr-xl rounded-br-xl active:scale-95`}
            >
              Milliseconds
            </button>
          </div>
        </section>

        <section className='mt-4'>
          <div>
            <label htmlFor='numberFingers' className='text-sm'>
              Wait for x amount of seconds before moving to next plot point
            </label>
          </div>

          <div className='grid grid-cols-rev gap-2 mt-1'>
            <input
              className='outline outline-yellow-400 outline-1 bg-white px-1 w-full'
              type='number'
              name='movementSpeed'
              id='movementSpeed'
              value={timeoutLength} // Controlled component
              onChange={handleTimeoutChange} // Handle the change event
            />
            <div>
              {timeoutUnitSelected.name === 'milliseconds' ? (
                <span className='text-sm' title='Millimeters per second'>
                  ms
                </span>
              ) : timeoutUnitSelected.name === 'seconds' ? (
                <span className='text-sm' title='Seconds per second'>
                  s
                </span>
              ) : null}
            </div>
          </div>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={closeTimeoutSettingsModal}
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

export default TimeoutSettingsContainer;
