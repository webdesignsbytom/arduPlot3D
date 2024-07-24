import React, { useContext, useEffect, useState } from 'react';
// Context
import { ToggleContext } from '../../context/ToggleContext';
// Components
import Navbar from '../../components/nav/Navbar';
import DeviceSelectDropdownMenu from '../../components/menus/DeviceSelectDropdownMenu';
// Data
import { availableDevicesForSimulations } from '../../utils/design/AvailableDevices';
// Constants
import { CONFIGURATION_PAGE_URL } from '../../utils/Constants';

function ConfigurationPage() {
  const { setActiveNav } = useContext(ToggleContext);
  const [selectedConfigDevice, setSelectedConfigDevice] = useState(
    availableDevicesForSimulations[0]
  );

  useEffect(() => {
    setActiveNav(CONFIGURATION_PAGE_URL);
  }, []);

  const handleDeviceChange = (event) => {
    const { value } = event.target;
    setSelectedConfigDevice(availableDevicesForSimulations[value]);
  };

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

      {/* Main */}
      <main className='grid h-full overflow-hidden'>
        <section className='grid grid-rows-reg mx-auto my-auto bg-white outline outline-2 outline-black rounded-lg px-4 py-2'>
          <article className='mb-2'>
            <div className='mb-2'>
              <h2 className='text-xl text-yellow-400 font-semibold'>Configure your device</h2>
            </div>
            <div>
              <p>
                Select your device from the list below, then choose a config
                file from the available download options.
              </p>
            </div>
            <div>
              <p>
                This will run tests to ensure your machine is callibrated
                correctly.
              </p>
            </div>
          </article>

          <section>
            <div>
              <DeviceSelectDropdownMenu
                handleDeviceChange={handleDeviceChange}
              />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default ConfigurationPage;
