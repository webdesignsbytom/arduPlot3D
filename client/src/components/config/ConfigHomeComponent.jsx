import React from 'react';
// Images
import RobotImage from '../../assets/images/robot/arduplot-3d-printed-machine.png';
function ConfigHomeComponent() {
  return (
    <section className='grid grid-rows-reg gap-6 container mx-auto overflow-hidden'>
      <div className='grid h-fit'>
        <div>
          <h1 className='text-xl font-semibold text-colour5'>Home</h1>
        </div>
        <p className='text-colour5'>
          Welcome to the device configuration page.
        </p>
      </div>

      <section className='grid stripped_border p-2 overflow-hidden'>
        <div className='grid bg-white overflow-hidden items-center justify-center'>
          <img src={RobotImage} alt='' className='object-cover w-2/3 mx-auto' />
        </div>
      </section>
    </section>
  );
}

export default ConfigHomeComponent;
