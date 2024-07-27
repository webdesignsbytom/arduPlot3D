import React, { useState } from 'react';
// Data
import { availableDevicesForSimulations } from '../../utils/design/AvailableDevices';

function DeviceSelectDropdownMenu({ handleDeviceChange }) {
  const [availableDevices, setAvailableDevices] = useState(
    availableDevicesForSimulations
  );

  return (
    <div>
      <label htmlFor='mobile_device' className='text-sm'>
        Select mobile device
      </label>
      <div>
        <select
          onChange={handleDeviceChange}
          name='device_options'
          id='device_options'
          className='outline outline-1 outline-main-colour px-1 rounded-lg p-1 shadow-lg'
          aria-label='Select phone options'
        >
          {availableDevices.map((device, index) => {
            return (
              <option key={index} value={device.id} aria-label={`${device.title} option`}>
                {device.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default DeviceSelectDropdownMenu;
