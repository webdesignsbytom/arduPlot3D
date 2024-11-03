import React, { useState } from 'react';
// Components
import ConfigDeviceSizeComponent from './ConfigDeviceSizeComponent';
import ConnectToDeviceComponent from './ConnectToDeviceComponent';
// Icons
import { MdCastConnected } from 'react-icons/md';
import { IoMdMove } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';

function ConfigPageContent() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const selectDisplayComponent = (component) => {
    setSelectedComponent(component);
  };

  // Button configuration array
  const buttons = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'device-size', label: 'Device Size', icon: <IoMdMove /> },
    {
      id: 'connect-device',
      label: 'Connect Device',
      icon: <MdCastConnected />,
    },
  ];

  return (
    <section className='grid grid-cols-reg'>
      {/* Sidebar Navigation */}
      <section className='grid w-full bg-colour2 h-full'>
        <nav>
          <ul className='grid px-1 py-2'>
            {buttons.map((button) => (
              <li key={button.id}>
                <div>
                  <button
                    onClick={() => selectDisplayComponent(button.id)}
                    className={`grid grid-flow-col gap-4 px-2 py-1 justify-between bg-black text-colour1 w-full text-lg active:scale-95 hover:bg-colour2 ${
                      selectedComponent === button.id
                        ? 'bg-colour2 text-black'
                        : ''
                    }`}
                  >
                    <div>
                      <span>{button.label}</span>
                    </div>
                    <div className='grid items-center justify-center h-full'>
                      {button.icon}
                    </div>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Main Content Section */}
      <section className='grid p-4'>
        {selectedComponent === 'home' && (
          <section className='grid grid-rows-reg gap-8'>
            <div>
              <h1 className='text-xl font-semibold text-colour5'>Home</h1>
            </div>
            <p className='text-colour5'>
              Welcome to the device configuration page.
            </p>
          </section>
        )}

        {selectedComponent === 'device-size' && (
          <section className='grid grid-rows-reg gap-8'>
            <div>
              <h1 className='text-xl font-semibold text-colour5'>
                Device Size Configuration
              </h1>
            </div>
            <ConfigDeviceSizeComponent />
          </section>
        )}

        {selectedComponent === 'connect-device' && (
          <section className='grid grid-rows-reg gap-8'>
            <div>
              <h1 className='text-xl font-semibold text-colour5'>
                Connect Device
              </h1>
            </div>
            <ConnectToDeviceComponent />
          </section>
        )}
      </section>
    </section>
  );
}

export default ConfigPageContent;
