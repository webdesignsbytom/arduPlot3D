import React from 'react';

function TapSettingsModal({
  numberOfFingerTapping,
  setNumberOfFingerTapping,
  speedOfFingerMoving,
  setSpeedOfFingerMoving,
  closeTapSettingsModal,
}) {
  const setNumberOfFingers = (event) => {
    console.log('XXXX', event.target.id);
    const { id } = event.target;

    if (id === 'finger1') {
      setNumberOfFingerTapping(1);
    } else if (id === 'finger2') {
      setNumberOfFingerTapping(2);
    } else if (id === 'finger3') {
      setNumberOfFingerTapping(3);
    }
  };

  const handleSpeedChange = (event) => {
    const newSpeed = event.target.value; // Get the new speed value from the input
    setSpeedOfFingerMoving(newSpeed); // Update the state with the new speed
  };

  return (
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Tap Settings</h4>
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
              onClick={setNumberOfFingers}
              className={`grid bg-white ${
                numberOfFingerTapping === 1 ? 'bg-yellow-400' : 'bg-white'
              } outline outline-1 outline-yellow-400 px-1 py-1 w-full h-fit rounded-tl-xl rounded-bl-xl active:scale-95`}
            >
              1
            </button>
            <button
              id='finger2'
              onClick={setNumberOfFingers}
              className={`grid bg-white ${
                numberOfFingerTapping === 2 ? 'bg-yellow-400' : 'bg-white'
              } outline outline-1 outline-yellow-400 px-1 py-1 w-full h-fit active:scale-95`}
            >
              2
            </button>
            <button
              id='finger3'
              onClick={setNumberOfFingers}
              className={`grid bg-white ${
                numberOfFingerTapping === 3 ? 'bg-yellow-400' : 'bg-white'
              } outline outline-1 outline-yellow-400 px-1 py-1 w-full h-fit rounded-tr-xl rounded-br-xl active:scale-95`}
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
              className='outline outline-yellow-400 outline-1 bg-white px-1 w-full'
              type='number'
              name='tapSpeed'
              id='tapSpeed'
              value={speedOfFingerMoving} // Controlled component
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
              onClick={closeTapSettingsModal}
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

export default TapSettingsModal;
