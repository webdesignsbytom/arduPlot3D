import React, { useContext, useEffect } from 'react'
// Context
import { ToggleContext } from '../../context/ToggleContext';
// Components
import Navbar from '../../components/nav/Navbar';

function ConfigurationPage() {
    const { setActiveNav } = useContext(ToggleContext);

    useEffect(() => {
        setActiveNav('/device-configuration');
      }, []);
      
  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

      {/* Main */}
      <main className='grid h-full grid-cols-a1a overflow-hidden'>
        Config
      </main>
    </div>
  )
}

export default ConfigurationPage