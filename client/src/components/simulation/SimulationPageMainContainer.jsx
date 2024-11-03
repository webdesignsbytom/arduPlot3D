import React, { useContext } from 'react';
import SimulationDataToobar from '../toolbars/SimulationDataToobar';
import SimulationFunctionsToolbar from '../toolbars/SimulationFunctionsToolbar';
import SimulationPageTopToolBar from '../toolbars/SimulationPageTopToolBar';
import SimulationDisplayComponent from './SimulationDisplayComponent';
import { SimulationContext } from '../../context/SimulationContext';
import SimulationPageModelContainer from './SimulationPageModelContainer';

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
        <SimulationFunctionsToolbar />

        {/* canvas */}
        <section className='grid grid-rows-reg gap-2 p-2 overflow-hidden'>
          {/* Top tool bar menu */}
          <SimulationPageTopToolBar />

          {/* CANVAS container  Simulations or design*/}
          <SimulationDisplayComponent />
        </section>

        {/* data bar */}
        <section
          className={`${
            simulationDataIsOpen ? 'grid overflow-hidden' : 'hidden'
          }`}
        >
          <section
            className={`grid overflow-hidden h-full max-w-[300px] 2xl:max-w-[400px]`}
          >
            <SimulationDataToobar />
          </section>
        </section>
      </main>

      <SimulationPageModelContainer />
    </>
  );
}

export default SimulationPageMainContainer;
