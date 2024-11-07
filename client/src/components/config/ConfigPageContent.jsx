import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Components
import ConfigDeviceSizeComponent from './ConfigDeviceSizeComponent';
import ConnectToDeviceComponent from './ConnectToDeviceComponent';
import ConfigHomeComponent from './ConfigHomeComponent';
// Icons
import { MdCastConnected } from 'react-icons/md';
import { IoMdMove } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { TfiLayoutGrid3 } from 'react-icons/tfi';
import UserSimulationsComponent from './UserSimulationsComponent';

function ConfigPageContent() {
  const location = useLocation();

  const [selectedComponent, setSelectedComponent] = useState('home');

  const selectDisplayComponent = (component) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    console.log('location: ', location.state);
    if (location.state) {
      setSelectedComponent(location.state);
    }
  }, []);

  // Button configuration array
  const buttons = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'simulations', label: 'Simulations', icon: <TfiLayoutGrid3 /> },
    { id: 'device-size', label: 'Device Size', icon: <IoMdMove /> },
    {
      id: 'connect-device',
      label: 'Connect Device',
      icon: <MdCastConnected />,
    },
  ];

  return (
    <section className='grid grid-cols-reg overflow-hidden h-full w-full'>
      {/* Sidebar Navigation */}
      <section className='grid w-full bg-colour2 h-full border-solid border-r-2 border-black'>
        <nav className='p-2'>
          <ul className='grid border-2 border-solid border-colour1 sp'>
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
      <section className='grid py-8 px-8 overflow-hidden'>
        {selectedComponent === 'home' && <ConfigHomeComponent />}

        {selectedComponent === 'device-size' && <ConfigDeviceSizeComponent />}

        {selectedComponent === 'connect-device' && <ConnectToDeviceComponent />}

        {selectedComponent === 'simulations' && <UserSimulationsComponent />}
      </section>
    </section>
  );
}

export default ConfigPageContent;
