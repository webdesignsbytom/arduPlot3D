import React, { useContext } from 'react';
// Device data
import { availableDevicesForSimulations } from '../../utils/design/AvailableDevices';
import DeviceSelectDropdownMenu from '../menus/DeviceSelectDropdownMenu';
// Context
import { SimulationContext } from '../../context/SimulationContext';
import { useModalContext } from '../../context/ModalContext';

function DeviceSelectModal() {
  const { handleCloseDeviceSelectModal } = useModalContext();
  const { setSelectedDevice } = useContext(SimulationContext);

  const handleDeviceChange = (event) => {
    const { value } = event.target;
    setSelectedDevice(availableDevicesForSimulations[value]);
  };

  return (
    <section className='grid outline z-20 outline-main-colour outline-2 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-cardShadow'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Device Selection</h4>
        </div>

        <section className='py-4 pl-6'>
          <DeviceSelectDropdownMenu handleDeviceChange={handleDeviceChange} />
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={handleCloseDeviceSelectModal}
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

export default DeviceSelectModal;
