import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import CanvasSimulationTool from '../canvas/CanvasSimulationTool';
import CanvasDesignTool from '../canvas/CanvasDesignTool';
// Icons
import { FaClipboardList } from 'react-icons/fa';

function SimulationDisplayComponent({
  isResettingAnimation,
}) {
  const { simulationIsRunning, positionOfMouseAndCanvasVisible, setUserMenuIsOpen, userMenuIsOpen, simulationDataIsOpen, setSimulationDataIsOpen } =
    useContext(SimulationContext);

  return (
    <section className='relative grid stripped_border_dense bg-gray-200 h-full w-full p-1.5 overflow-hidden'>

      {/* User menu buttons */}
      {!userMenuIsOpen && (
        <button className='absolute left-3 z-50 hover:brightness-90 cursor-pointer top-3 grid p-2 bg-main-colour h-fit items-center justify-center rounded-full shadow-cardShadow'>
          <FaClipboardList
            size={30}
            onClick={() => setUserMenuIsOpen(true)}
            title='Open menu'
            className='text-secondary-colour'
          />
        </button>
      )}

      {!simulationDataIsOpen && (
        <button className='absolute right-3 z-50 hover:brightness-90 cursor-pointer top-3 grid p-2 bg-main-colour h-fit items-center justify-center rounded-full shadow-cardShadow'>
          <FaClipboardList
            size={30}
            onClick={() => setSimulationDataIsOpen(true)}
            title='Open menu'
            className='text-secondary-colour'
          />
        </button>
      )}

      {simulationIsRunning ? (
        <CanvasSimulationTool isResettingAnimation={isResettingAnimation} />
      ) : (
        <CanvasDesignTool
          positionOfMouseAndCanvasVisible={positionOfMouseAndCanvasVisible}
        />
      )}
    </section>
  );
}

export default SimulationDisplayComponent;
