import React, { useEffect, useState } from 'react';
// Context
import { useModalContext } from '../../context/ModalContext';

function ConnectToDeviceModal() {
  const { toggleConnectToDeviceModal } = useModalContext();

  return (
    <section className='grid outline outline-main-colour outline-2 z-20 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
       <section className='grid grid-cols-2 gap-6 mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={toggleConnectToDeviceModal}
              className='grid bg-red-400 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
            >
              Close
            </button>
          </div>
          <div className='grid justify-center'>
            <button
              className='grid bg-main-colour w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
            >
              Connect
            </button>
          </div>
        </section>
    </section>
  );
}

export default ConnectToDeviceModal;
