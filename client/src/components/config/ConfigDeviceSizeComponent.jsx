import React, { useState } from 'react';
// Components
import DeviceSelectDropdownMenu from '../menus/DeviceSelectDropdownMenu';
// Data
import { availableDevicesForSimulations } from '../../utils/design/AvailableDevices';

let idNum = availableDevicesForSimulations.length; // Ensure unique IDs for custom devices

function ConfigDeviceSizeComponent() {
  const [selectedConfigDevice, setSelectedConfigDevice] = useState(
    availableDevicesForSimulations[0]
  );

  const [customDevice, setCustomDevice] = useState({
    title: '',
    xDimension: '',
    yDimension: '',
    xPixels: '',
    yPixels: '',
    depthDimension: '',
    inset: '2px',
    weight: '',
  });

  const handleDeviceChange = (event) => {
    const { value } = event.target;
    setSelectedConfigDevice(availableDevicesForSimulations[value]);
  };

  const handleCustomInputChange = (event) => {
    const { name, value } = event.target;
    setCustomDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const addCustomDevice = () => {
    const newDevice = {
      id: idNum++,
      title: customDevice.title || 'Custom Device',
      xDimension: parseFloat(customDevice.xDimension),
      yDimension: parseFloat(customDevice.yDimension),
      xPixels: parseInt(customDevice.xPixels, 10),
      yPixels: parseInt(customDevice.yPixels, 10),
      depthDimension: parseFloat(customDevice.depthDimension),
      inset: customDevice.inset,
      weight: parseFloat(customDevice.weight),
    };

    availableDevicesForSimulations.push(newDevice);
    setSelectedConfigDevice(newDevice);
    setCustomDevice({
      title: '',
      xDimension: '',
      yDimension: '',
      xPixels: '',
      yPixels: '',
      depthDimension: '',
      inset: '2px',
      weight: '',
    });
  };

  return (
    <section className='grid stripped_border p-2 container mx-auto'>
      <div className='grid lg:grid-cols-2 gap-4 bg-colour1 py-6 px-8'>
        <article className='mb-2'>
          <div className='mb-2'>
            <h2 className='text-xl text-colour5 font-semibold'>
              Configure your game device
            </h2>
          </div>
          <div className='grid py-6'>
            <p>
              Select your device from the list below, then choose a config file
              from the available download options. Or you can create a custom
              size.
            </p>
          </div>
          <div>
            <p>
              This will run tests to ensure your machine is calibrated
              correctly.
            </p>
          </div>
          <div className='pt-8'>
            <DeviceSelectDropdownMenu handleDeviceChange={handleDeviceChange} />
          </div>
        </article>

        <section className='grid'>
          <div className='grid space-y-4 md:space-y-2'>
            <div>
              <h4 className='text-lg font-medium text-gray-900 dark:text-white'>
                Custom Size
              </h4>
            </div>
            <input
              type='text'
              name='title'
              value={customDevice.title}
              onChange={handleCustomInputChange}
              placeholder='Device Name'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
              type='number'
              name='xDimension'
              value={customDevice.xDimension}
              onChange={handleCustomInputChange}
              placeholder='Width (mm)'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
              type='number'
              name='yDimension'
              value={customDevice.yDimension}
              onChange={handleCustomInputChange}
              placeholder='Height (mm)'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
              type='number'
              name='xPixels'
              value={customDevice.xPixels}
              onChange={handleCustomInputChange}
              placeholder='Width Pixels'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
              type='number'
              name='yPixels'
              value={customDevice.yPixels}
              onChange={handleCustomInputChange}
              placeholder='Height Pixels'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
              type='number'
              name='depthDimension'
              value={customDevice.depthDimension}
              onChange={handleCustomInputChange}
              placeholder='Depth (mm)'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
              type='text'
              name='inset'
              value={customDevice.inset}
              onChange={handleCustomInputChange}
              placeholder='Inset'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
              type='number'
              name='weight'
              value={customDevice.weight}
              onChange={handleCustomInputChange}
              placeholder='Weight (grams)'
              className='input_shadow focus:border-2 focus:border-solid focus:border-colour2 appearance-none border rounded w-full py-2 px-3 text-colour5 leading-tight focus:outline-none focus:shadow-outline'
            />
            <button
              onClick={addCustomDevice}
              className='inline-block px-6 py-2.5 w-full bg-colour2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:brightness-110 hover:shadow-lg focus:brightness-110 focus:shadow-lg focus:outline-none focus:ring-0 active:brightness-75 active:shadow-lg transition duration-150 ease-in-out'
            >
              Add Custom Device
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default ConfigDeviceSizeComponent;
