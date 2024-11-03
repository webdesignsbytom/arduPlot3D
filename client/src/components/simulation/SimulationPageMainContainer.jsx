import React, { useContext } from 'react';
// Components
import SimulationDataToobar from '../toolbars/SimulationDataToobar';
import SimulationFunctionsToolbar from '../toolbars/SimulationFunctionsToolbar';
import SimulationPageTopToolBar from '../toolbars/SimulationPageTopToolBar';
import SimulationDisplayComponent from './SimulationDisplayComponent';
import SimulationPageModelContainer from './SimulationPageModelContainer';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function SimulationPageMainContainer() {
  const { userMenuIsOpen, simulationDataIsOpen } =
    useContext(SimulationContext);

  return (
    <>
      {/* Main */}
      <main
        className={`relative grid h-full ${
          userMenuIsOpen && !simulationDataIsOpen
            ? 'grid-cols-reg'
            : simulationDataIsOpen && !userMenuIsOpen
            ? 'grid-cols-rev'
            : userMenuIsOpen && simulationDataIsOpen
            ? 'grid-cols-a1a'
            : ''
        } overflow-hidden`}
      >
        {/* Functions bar */}
        <section
          className={`${userMenuIsOpen ? 'grid overflow-hidden' : 'hidden'}`}
        >
          <div
            className={`grid overflow-hidden h-full max-w-[300px] 2xl:max-w-[400px]`}
          >
            <SimulationFunctionsToolbar />
          </div>
        </section>

        {/* Center main component and  canvas */}
        <section className='grid grid-rows-reg gap-2 p-2 overflow-hidden'>
          {/* Top tool bar menu */}
          <SimulationPageTopToolBar />

          {/* CANVAS container  Simulations or design*/}
          <SimulationDisplayComponent />
        </section>

        {/* Data bar - simuklation data points - right hand */}
        <section
          className={`${
            simulationDataIsOpen ? 'grid overflow-hidden' : 'hidden'
          }`}
        >
          <div
            className={`grid overflow-hidden h-full max-w-[300px] 2xl:max-w-[400px]`}
          >
            <SimulationDataToobar />
          </div>
        </section>
      </main>

      <SimulationPageModelContainer />
    </>
  );
}

export default SimulationPageMainContainer;
