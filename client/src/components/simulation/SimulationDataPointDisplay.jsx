import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import SimulationItem from './SimulationItem';
// Icons
import LoopItemContainer from './LoopItemContainer';
import { VscGraphScatter } from 'react-icons/vsc';

function SimulationDataPointDisplay() {
  const { simulationData } = useContext(SimulationContext);

  const [simulationDataObject, setSimulationDataObject] =
    useState(simulationData);

  const endOfListRef = useRef(null); // Ref for the end of the list

  useEffect(() => {
    setSimulationDataObject(simulationData);
  }, [simulationData]);

  // Scroll to the last item when the data changes
  useEffect(() => {
    endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simulationDataObject]);

  return (
    <div className='overflow-y-auto gap-1 p-1' style={{ maxHeight: '80vh' }}>
      {/* Simulation datapoints */}
      {simulationDataObject.mainSimulationDataPoints.length > 0 ? (
        simulationDataObject.mainSimulationDataPoints.map(
          (dataPoint, index) => {
            let isLastItem =
              index ===
              simulationDataObject.mainSimulationDataPoints.length - 1; // Check if it's the last item
            if (dataPoint.dataGroup === 'simulation') {
              return (
                <div ref={isLastItem ? endOfListRef : null} key={index}>
                  <SimulationItem
                    key={index}
                    dataIndex={index}
                    dataPoint={dataPoint}
                  />
                </div>
              );
            } else if (dataPoint.dataGroup === 'loop') {
              return (
                <div ref={isLastItem ? endOfListRef : null} key={index}>
                  <LoopItemContainer
                    key={index}
                    index={index}
                    loopData={dataPoint}
                  />
                </div>
              );
            } else {
              // Optionally handle any unexpected cases, or return null to render nothing
              return null;
            }
          }
        )
      ) : (
        <section className='grid items-center justify-center h-full'>
          <div>
            <div className='grid justify-center'>
              <VscGraphScatter className='text-colour5 text-6xl' />
            </div>
            <div className='text-center'>
              <p>
                Create and Edit <br /> Plot Points
              </p>
            </div>
          </div>
        </section>
      )}
      <div ref={endOfListRef} /> {/* Invisible div at the end of the list */}
    </div>
  );
}

export default SimulationDataPointDisplay;
