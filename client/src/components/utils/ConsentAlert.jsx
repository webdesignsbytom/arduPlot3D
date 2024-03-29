import React, { useContext } from 'react';
import { SimulationContext } from '../../context/SimulationContext';

function ConsentAlert({ consentMessage, cancalFunction }) {
  const { runConsentFunction } = useContext(SimulationContext);

  return (
    <section className='grid gap-4 outline z-20 outline-yellow-400 outline-2 rounded-lg p-2 bg-white h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='grid px-4'>
        <article className='text-center'>
          <h4 className='text-black font-semibold'>{consentMessage}</h4>
        </article>
      </div>
      <div className='grid grid-cols-2 w-full'>
        <div className='grid w-full justify-center'>
          <button
            onClick={cancalFunction}
            className='grid bg-red-400 w-full px-2 py-1 text-white cursor-pointer hover:brightness-110 hover:scale-95'
          >
            Cancel
          </button>
        </div>
        <div className='grid w-full justify-center'>
          <button
            onClick={runConsentFunction}
            className='grid bg-yellow-400 w-full px-2 py-1 text-white cursor-pointer hover:brightness-110 hover:scale-95'
          >
            Agree
          </button>
        </div>
      </div>
    </section>
  );
}

export default ConsentAlert;
