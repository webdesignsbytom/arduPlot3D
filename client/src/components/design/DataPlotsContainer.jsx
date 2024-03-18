import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
// Context
import { DesignContext } from '../../context/DesignContext';
import LoopItem from './LoopItem';
import SimulationItem from './SimulationItem';

function DataPlotsContainer({
  dataPointsCollections,
  clearDataPoint,
}) {
  const {
    setAddCreateLoopModalOpen,
    simulationData,
    setSimulationData,
    simulationLoopData,
    displayDataPoints,
    displayDataPointsIndex,
    arrayOfLoopData,
  } = useContext(DesignContext);

  const addLoopToSimulation = (event) => {
    event.preventDefault();
    setAddCreateLoopModalOpen(true);
  };

  return (
    <div className='overflow-y-scroll gap-1 p-1'>
      {simulationData?.mainSimulationDataPoints.map((dataPoint, index) =>
        dataPoint.loopTitle ? (
          <>
            <LoopItem loop={dataPoint} key={index} index={index} />

            {displayDataPoints &&
              index === displayDataPointsIndex &&
              arrayOfLoopData.mainSimulationLoopDataPoints.map(
                (dataPoint, dataIndex) => {
                  return (
                    <SimulationItem key={index} dataIndex={dataIndex} dataPoint={dataPoint} clearDataPoint={clearDataPoint} />
                  );
                }
              )}
          </>
        ) : (
          <SimulationItem key={index} dataIndex={index} dataPoint={dataPoint} clearDataPoint={clearDataPoint} />
        )
      )}
      <div className='mt-2'>
        <button
          onClick={addLoopToSimulation}
          className='bg-yellow-400 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Add Loop +
        </button>
      </div>
    </div>
  );
}

export default DataPlotsContainer;
