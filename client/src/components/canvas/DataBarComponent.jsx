import React, { useContext } from 'react';
// Icons
import { IoReloadCircle } from 'react-icons/io5';
import { FaMousePointer } from 'react-icons/fa';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function DataBarComponent({
  isPxOrMmDimensions,
  toggleDeviceDimensions,
  positionOfMouseAndCanvasVisible,
  tooltip,
}) {
  const { simulationData } = useContext(SimulationContext);
  const commonStyles =
    'bg-secondary-colour outline outline-main-colour outline-1 rounded px-4';

  return (
    <section className='grid grid-cols-3 gap-2 w-full px-2 py-1'>
      {/* Dimensions */}

      <section className='grid w-full'>
        <div className={`grid grid-cols-rev ${commonStyles} px-6`}>
          <div>Dimensions: {isPxOrMmDimensions ? 'mm' : 'px'}</div>
          <div className='grid items-center pl-2 justify-center'>
            <IoReloadCircle
              className='active:scale-95 active:animate-spin duration-300 cursor-pointer'
              onClick={toggleDeviceDimensions}
            />
          </div>
        </div>
      </section>

      {/* Time */}
      <section className='grid w-full'>
        <div className={`grid justify-center items-center ${commonStyles}`}>
          {simulationData.simulationTimeToComplete} seconds
        </div>
      </section>

      {/* Mouse position */}
      <section className='grid w-full'>
        {positionOfMouseAndCanvasVisible && (
          <section className={`grid grid-cols-reg gap-2 ${commonStyles}`}>
            <div className='grid items-center justify-center pr-1'>
              <FaMousePointer />
            </div>
            <div>{`X: ${tooltip.x}, Y: ${tooltip.y}`}</div>
          </section>
        )}
      </section>
    </section>
  );
}

export default DataBarComponent;
