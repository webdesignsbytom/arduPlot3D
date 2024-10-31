import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import SimulationItem from './SimulationItem';
import LoopItem from './LoopItem';
// Icons
import LoopItemContainer from './LoopItemContainer';

function SimulationDataPointDisplay() {
  const {
    simulationData,
  } = useContext(SimulationContext);

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
      {simulationDataObject.mainSimulationDataPoints.map((dataPoint, index) => {
        let isLastItem =
          index === simulationDataObject.mainSimulationDataPoints.length - 1; // Check if it's the last item
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
      })}
      <div ref={endOfListRef} /> {/* Invisible div at the end of the list */}
    </div>
  );
}

export default SimulationDataPointDisplay;
