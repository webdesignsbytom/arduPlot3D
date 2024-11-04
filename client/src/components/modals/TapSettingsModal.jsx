import React, { useContext } from 'react';
import { SimulationContext } from '../../context/SimulationContext';
import { useModalContext } from '../../context/ModalContext';

function TapSettingsModal() {
  const {
    numberOfFingerTapping,
    changeNumberOfTappingFinger,
    speedOfFingerMoving,
    handleTapSpeedChange,
  } = useContext(SimulationContext);
  const { handleCloseTapSettingsModal } = useModalContext();

  const handleChangeNumberOfTappingFingers = (numFingers) => {
    changeNumberOfTappingFinger(numFingers);
  };

  return (
    <section className='grid outline z-20 outline-main-colour outline-2 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-cardShadow'>
      <div className='py-2 px-4'>
        <div className='text-center'>
          <h4 className='text-lg'>Tap Settings</h4>
        </div>

        <section className='mt-4'>
          <div>
            <label htmlFor='numberFingers' className='text-sm'>
              Set number of fingers tapping
            </label>
          </div>
          <div className='grid grid-cols-3 gap-0 mt-1'>
            <button
              id='finger1'
              onClick={() => handleChangeNumberOfTappingFingers(1)}
              className={`grid ${
                numberOfFingerTapping === 1 ? 'bg-colour2' : 'bg-colour1'
              } outline outline-1 outline-main-colour px-1 py-1 w-full h-fit rounded-tl-xl rounded-bl-xl active:scale-95 shadow-lg`}
            >
              1
            </button>
            <button
              id='finger2'
              onClick={() => handleChangeNumberOfTappingFingers(2)}
              className={`grid ${
                numberOfFingerTapping === 2 ? 'bg-colour2' : 'bg-colour1'
              } outline outline-1 outline-main-colour px-1 py-1 w-full h-fit active:scale-95 shadow-lg`}
            >
              2
            </button>
            <button
              id='finger3'
              onClick={() => handleChangeNumberOfTappingFingers(3)}
              className={`grid ${
                numberOfFingerTapping === 3 ? 'bg-colour2' : 'bg-colour1'
              } outline outline-1 outline-main-colour px-1 py-1 w-full h-fit rounded-tr-xl rounded-br-xl active:scale-95 shadow-lg`}
            >
              3
            </button>
          </div>
        </section>

        <section className='mt-4'>
          <div>
            <label htmlFor='numberFingers' className='text-sm'>
              Set speed of tap
            </label>
          </div>

          <div className='grid grid-cols-rev gap-2 mt-1'>
            <input
              className='outline outline-main-colour outline-1 bg-secondary-colour px-1 w-full shadow-lg'
              type='number'
              name='tapSpeed'
              id='tapSpeed'
              value={speedOfFingerMoving} // Controlled component
              onChange={handleTapSpeedChange} // Handle the change event
              aria-label='Change speed of tapping finger'
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
              onClick={handleCloseTapSettingsModal}
              className='bg-main-colour active:scale-95 px-4 sm:px-10 py-2 w-full rounded-lg hover:brightness-90 shadow-lg'
              aria-label='Close button modal'
            >
              Close
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default TapSettingsModal;
