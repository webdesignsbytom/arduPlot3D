import React from 'react';

function MovementSettingsModal({
  speedOfArmMoving,
  setSpeedOfArmMoving,
  closeMovementSettingsModal,
}) {
  const handleSpeedChange = (event) => {
    const newSpeed = event.target.value; // Get the new speed value from the input
    setSpeedOfArmMoving(newSpeed); // Update the state with the new speed
  };

  return (
    <section className='grid outline z-20 outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='py-2 px-4'>
        <div className='text-center'>
          <h4 className='text-lg'>Movement Settings</h4>
        </div>

        <section className='py-4'>
          <div>
            <label htmlFor='numberFingers' className='text-sm'>
              Movement speed
            </label>
          </div>

          <div className='grid grid-cols-rev gap-2 mt-1'>
            <input
              className='outline outline-yellow-400 outline-1 bg-white px-1 w-full'
              type='number'
              name='movementSpeed'
              id='movementSpeed'
              value={speedOfArmMoving} // Controlled component
              onChange={handleSpeedChange} // Handle the change event
            />
            <div>
              <span className='text-sm' title='Millimeters per second'>
                mm/s
              </span>
            </div>
          </div>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
          <button
              onClick={closeMovementSettingsModal}
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

export default MovementSettingsModal;
