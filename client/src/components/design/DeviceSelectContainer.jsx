import React, { useContext, useState } from 'react';
// Device data
import { availableDevicesForSimulations } from '../../utils/design/AvailableDevices';
// Context
import { DesignContext } from '../../context/DesignContext';

function DeviceSelectContainer({ closeDeviceSelectModal }) {
  const { selectedDevice, setSelectedDevice } = useContext(DesignContext);

  const [availableDevices, setAvailableDevices] = useState(
    availableDevicesForSimulations
  );

  const handleDeviceChange = (event) => {
    const { value } = event.target;
    console.log('se; device: ', value);
    setSelectedDevice(availableDevicesForSimulations[value]);
  };

  return (
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Device Selection</h4>
        </div>

        <section className='mt-4'>
          <div>
            <label htmlFor='mobile_device' className='text-sm'>
              Select mobile device
            </label>
            <div>
              <select
                onChange={handleDeviceChange}
                name='device_options'
                id='device_options'
                className='outline outline-1 outline-yellow-400 px-1 rounded-lg'
              >
                {availableDevices.map((device, index) => {
                  return (
                    <option key={index} value={device.id}>
                      {device.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={closeDeviceSelectModal}
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

export default DeviceSelectContainer;
