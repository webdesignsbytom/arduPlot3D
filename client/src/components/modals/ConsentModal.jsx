import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function ConsentModal({ consentMessage, cancalFunction }) {
  const { runConsentFunction } = useContext(SimulationContext);

  return (
    <section className='grid z-20 stripped_border_dense h-1/2 absolute p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-cardShadow'>
      <div className='grid grid-rows-[50px_1fr_auto] overflow-hidden bg-colour1'>
        {/* Header */}
        <section className='bg-main-colour w-full py-2'>
          <div className='grid items-center text-center h-full'>
            <p className='text-secondary-colour text-xl'>Please Confirm</p>
          </div>
        </section>

        {/* Artivle */}
        <section className='grid items-center px-4'>
          <div className='grid px-4 py-6'>
            <article className='grid grid-rows-reg text-center'>
              <div className='w-fit mx-auto'>
                <h4 className='text-2xl font-semibold'>
                  {consentMessage.title}
                </h4>
                <div className='h-[2px] w-full bg-black mt-1'></div>
              </div>
              <div className='w-2/3 mx-auto pt-6'>
                <h5 className='text-colour5'>{consentMessage.message}</h5>
              </div>
            </article>
          </div>
        </section>

        {/* Buttons */}
        <section className='mb-4'>
          <div className='grid grid-cols-2 gap-4 px-4 w-full'>
            <div className='grid w-full'>
              <button
                onClick={cancalFunction}
                className='grid bg-red-400 w-full h-fit px-2 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-75 active:scale-95 shadow-lg'
                aria-label='Cancel confirm'
              >
                Cancel
              </button>
            </div>

            <div className='grid w-full'>
              <button
                onClick={() => runConsentFunction(consentMessage.function)}
                className='grid bg-main-colour w-full h-fit px-2 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95'
                aria-label='Agree to confirmation requests'
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
