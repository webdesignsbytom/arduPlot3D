import React, { useContext } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
// Context
import { DesignContext } from '../../context/DesignContext';
import LoopItem from './LoopItem';

function DataPlotsContainer({
  dataPointsCollections,
  handleChange,
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
                    <div
                      key={dataIndex}
                      className='grid grid-cols-a1a h-[30px] w-full gap-2'
                    >
                      <div className='grid items-center justify-center w-[30px] bg-blue-200 h-full outline outline-2 outline-black px-2'>
                        <label
                          htmlFor='data_point'
                          className='h-full grid items-center justify-center'
                        >
                          {dataIndex + 1}
                        </label>
                      </div>
                      <div className='grid w-full h-full bg-white outline-black outline outline-2'>
                        <input
                          title={dataPoint.dataType}
                          className={`w-full h-full px-2 ${
                            dataPoint.dataType === 'tap'
                              ? 'bg-green-200'
                              : dataPoint.dataType === 'move_tap'
                              ? 'bg-yellow-200'
                              : dataPoint.dataType === 'move'
                              ? 'bg-purple-200'
                              : dataPoint.dataType === 'drag'
                              ? 'bg-pink-200'
                              : dataPoint.dataType === 'timeout'
                              ? 'bg-blue-200'
                              : null
                          }`}
                          type='text'
                          name='data_point'
                          id='data_point'
                          value={`x: ${dataPoint.xPos}, y: ${dataPoint.yPos}`}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Delete button */}
                      <div className='grid'>
                        <button
                          id='pointOne'
                          onClick={clearDataPoint}
                          className='active:scale-95 no__highlights rounded-xl'
                        >
                          <IoCloseCircleSharp />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
          </>
        ) : (
          <div key={index} className='grid grid-cols-a1a h-[30px] w-full gap-2'>
            <div className='grid items-center justify-center w-[30px] bg-slate-300 h-full outline outline-2 outline-black px-2'>
              <label
                htmlFor='data_point'
                className='h-full grid items-center justify-center'
              >
                {index + 1}
              </label>
            </div>
            <div className='grid w-full h-full bg-white outline-black outline outline-2'>
              <input
                title={dataPoint.dataType}
                className={`w-full h-full px-2 ${
                  dataPoint.dataType === 'tap'
                    ? 'bg-green-200'
                    : dataPoint.dataType === 'move_tap'
                    ? 'bg-yellow-200'
                    : dataPoint.dataType === 'move'
                    ? 'bg-purple-200'
                    : dataPoint.dataType === 'drag'
                    ? 'bg-pink-200'
                    : dataPoint.dataType === 'timeout'
                    ? 'bg-blue-200'
                    : null
                }`}
                type='text'
                name='data_point'
                id='data_point'
                value={`x: ${dataPoint.xPos}, y: ${dataPoint.yPos}`}
                onChange={handleChange}
              />
            </div>
            {/* Delete button */}
            <div className='grid'>
              <button
                id='pointOne'
                onClick={clearDataPoint}
                className='active:scale-95 no__highlights rounded-xl'
              >
                <IoCloseCircleSharp />
              </button>
            </div>
          </div>
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
