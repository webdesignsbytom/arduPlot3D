import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import LoopItem from './LoopItem';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';

function LoopItemContainer({
  index,
  loopData,
}) {
  const {
    displayLoopDataPoints,
    displayLoopDataPointsIndex,
  } = useContext(SimulationContext);

  console.log('DADADADAD', loopData);
  return (
    <>
      <LoopItem key={index} index={index} loopData={loopData} />

      {/* Loop data point items */}
      {displayLoopDataPoints &&
        index === displayLoopDataPointsIndex &&
        loopData.mainSimulationLoopDataPoints.map((loopDataPoint, dataIndex) => {
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
                  title={loopDataPoint.dataType}
                  className={`w-full h-full px-2 ${
                    loopDataPoint.dataType === 'tap'
                      ? 'bg-green-200'
                      : loopDataPoint.dataType === 'move_tap'
                      ? 'bg-yellow-200'
                      : loopDataPoint.dataType === 'move'
                      ? 'bg-purple-200'
                      : loopDataPoint.dataType === 'drag'
                      ? 'bg-pink-200'
                      : loopDataPoint.dataType === 'timeout'
                      ? 'bg-blue-200'
                      : null
                  }`}
                  type='text'
                  name='data_point'
                  id='data_point'
                  value={`x: ${loopDataPoint.xPos}, y: ${loopDataPoint.yPos}`}
                  //onChange={handleChange}
                />
              </div>
              {/* Delete button */}
              <div className='grid'>
                <button
                  id='pointOne'
                  //onClick={clearDataPoints}
                  className='active:scale-95 no__highlights rounded-xl'
                >
                  <IoCloseCircleSharp />
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default LoopItemContainer;
