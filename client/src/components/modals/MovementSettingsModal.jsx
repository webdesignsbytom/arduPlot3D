import React, { useContext } from 'react';
import { SimulationContext } from '../../context/SimulationContext';
import { useModalContext } from '../../context/ModalContext';

function MovementSettingsModal() {
  const { changeMovementSpeed, speedOfArmMoving } =
    useContext(SimulationContext);
  const { handleCloseMovementSettingsModal } = useModalContext();

  const handleMovementSpeedChange = (event) => {
    const newSpeed = event.target.value;
    changeMovementSpeed(newSpeed);
  };

  return (
    <section className='grid outline z-20 outline-main-colour outline-2 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
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
              className='outline outline-main-colour outline-1 bg-secondary-colour px-1 w-full shadow-lg'
              type='number'
              name='movementSpeed'
              id='movementSpeed'
              value={speedOfArmMoving} // Controlled component
              onChange={handleMovementSpeedChange} // Handle the change event
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
              onClick={handleCloseMovementSettingsModal}
              className='bg-main-colour active:scale-95 px-4 sm:px-10 py-2 w-full rounded-lg hover:brightness-90 shadow-lg'
              aria-label='Close modal button'
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
