import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function ConsentModal({ consentMessage, cancalFunction }) {
  const { runConsentFunction } = useContext(SimulationContext);

  return (
    <section className='grid outline z-20 outline-main-colour outline-2 rounded-lg bg-secondary-colour h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl'>
      <div className='grid grid-rows-[40px_1fr_auto] overflow-hidden'>
        {/* Header */}
        <section className='bg-main-colour w-full'>
          <div className='grid items-center text-center h-full'>
            <p className='text-secondary-colour text-xl'>Confirm</p>
          </div>
        </section>

        {/* Artivle */}
        <section>
          <div className='grid px-4 py-6'>
            <article className='grid grid-rows-reg text-center'>
              <h4 className='text-black text-2xl font-semibold'>
                {consentMessage.title}
              </h4>
              <div className='w-2/3 mx-auto pt-6'>
                <h5 className='text-black'>
                  {consentMessage.message}
                </h5>
              </div>
            </article>
          </div>
        </section>

        {/* Buttons */}
        <section className='mb-4'>
          <div className='grid grid-cols-2 gap-6 px-4 w-full'>
            <div className='grid w-full'>
              <button
                onClick={cancalFunction}
                className='grid bg-red-400 w-full h-fit px-2 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95'
              >
                Cancel
              </button>
            </div>

            <div className='grid w-full'>
              <button
                onClick={() => runConsentFunction(consentMessage.function)}
                className='grid bg-main-colour w-full h-fit px-2 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95'
              >
                Agree
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default ConsentModal;
