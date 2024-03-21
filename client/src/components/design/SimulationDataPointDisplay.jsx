import React, { useContext, useEffect, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import SimulationItem from './SimulationItem';
import LoopItem from './LoopItem';

function SimulationDataPointDisplay() {
  const { simulationData } = useContext(SimulationContext)

  const [simulationDataObject, setSimulationDataObject] = useState(simulationData)

  useEffect(() => {
    setSimulationDataObject(simulationData)
  }, [simulationData])

  console.log('11111 simulationDataObject', simulationDataObject);

  return (
    <div className='overflow-y-scroll gap-1 p-1'>
      {/* Simulation datapoints */}
      {simulationDataObject.mainSimulationDataPoints.map((dataPoint, index) => {
        if (dataPoint.dataGroup === 'simulation') {
          return <SimulationItem key={index} dataIndex={index} dataPoint={dataPoint} />
        } else if (dataPoint.dataGroup === 'loop') {
          return <LoopItem key={index} loop={dataPoint} />
        } else {
          // Optionally handle any unexpected cases, or return null to render nothing
          return null;
        }
      })}
    </div>
  );
}

export default SimulationDataPointDisplay;
