import React, { useContext, useEffect, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import SimulationItem from './SimulationItem';
import LoopItem from './LoopItem';

function SimulationDataPointDisplay() {
  const { simulationData, setAddCreateLoopModalOpen } = useContext(SimulationContext)

  const [simulationDataObject, setSimulationDataObject] = useState(simulationData)

  useEffect(() => {
    setSimulationDataObject(simulationData)
  }, [simulationData])

  const addLoopToSimulation = (event) => {
    event.preventDefault();
    setAddCreateLoopModalOpen(true);
  };

  console.log('11111 simulationDataObject', simulationDataObject);

  return (
    <div className='overflow-y-scroll gap-1 p-1'>
      {/* Simulation datapoints */}
      {simulationDataObject.mainSimulationDataPoints.map((dataPoint, index) => {
        if (dataPoint.dataGroup === 'simulation') {
          return <SimulationItem key={index} dataIndex={index} dataPoint={dataPoint} />
        } else if (dataPoint.dataGroup === 'loop') {
          return <LoopItem key={index} index={index} loopData={dataPoint} />
        } else {
          // Optionally handle any unexpected cases, or return null to render nothing
          return null;
        }
      })}
      <div className='mt-2'>
        <button
          onClick={(event) => addLoopToSimulation(event)}
          className='bg-yellow-400 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Add Loop +
        </button>
      </div>
    </div>
  );
}

export default SimulationDataPointDisplay;
