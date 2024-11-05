import React, { useContext } from 'react';
// Icons
import { IoReloadCircle } from 'react-icons/io5';
import { MdTimer } from 'react-icons/md';
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
  const commonStyles = 'bg-colour1 text-lg px-1 py-1 border-2 border-solid border-gray-300 shadow-cardShadow';

  return (
    <section className='grid grid-cols-3 gap-2 w-full px-2 pt-2 pb-2'>
      {/* Dimensions */}
      <section className='grid w-full'>
        <div
          className={`grid grid-flow-col gap-4 justify-center ${commonStyles}`}
        >
          <div>
            <span>Dimensions: {isPxOrMmDimensions ? 'mm' : 'px'}</span>
          </div>
          <div className='grid items-center justify-center'>
            <IoReloadCircle
              className='active:scale-95 cursor-pointer text-xl'
              onClick={toggleDeviceDimensions}
              title={`${isPxOrMmDimensions ? 'Show in px' : 'Show in mm'}`}
            />
          </div>
        </div>
      </section>

      {/* Time */}
      <section className='grid w-full'>
        <div
          className={`grid grid-flow-col gap-4 justify-center items-center ${commonStyles}`}
        >
          <MdTimer />
          <span>{simulationData.timeToComplete} seconds</span>
        </div>
      </section>

      {/* Mouse position */}
      <section className='grid w-full'>
        {positionOfMouseAndCanvasVisible && (
          <section
            className={`grid grid-flow-col gap-4 justify-center ${commonStyles}`}
          >
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
