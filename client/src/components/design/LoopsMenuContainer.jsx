import React, { useContext, useState } from 'react';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
// Context
import { DesignContext } from '../../context/DesignContext';

function LoopsMenuContainer({
  dataPointsCollections,
  handleChange,
  clearDataPoint,
}) {
  const { simulationData, setSimulationData } = useContext(DesignContext);
  const [displayDataPoints, setDisplayDataPoints] = useState(false);
  const [displayDataPointsIndex, setDisplayDataPointsIndex] = useState(0);

  const deleteLoop = (event, loop) => {
    event.preventDefault(); // This will prevent the default action
    console.log('loop', loop);

    let arrayOfLoops = simulationData.simulationLoops;
    var found = arrayOfLoops.filter(
      (arrayLoop) => arrayLoop.loopTitle !== loop.loopTitle
    );
    console.log('found', found);
    console.log('arrayOfLoops', arrayOfLoops);

    setSimulationData({
      ...simulationData,
      simulationLoops: found,
    });
  };

  const openAndEditLoop = (loop, index) => {
    console.log('loop', loop);
    setDisplayDataPoints(true);
    setDisplayDataPointsIndex(index);
  };

  const deleteLoopDataPoint = (event, dataPoint) => {
    event.preventDefault(); // This will prevent the default action

    console.log('dataPoint', dataPoint);
  };

  const createNewLoop = (event) => {
    event.preventDefault(); // This will prevent the default action
    console.log('S');
  };

  return (
    <div className='overflow-y-scroll gap-1 p-1'>
      {simulationData.simulationLoops.map((loop, index) => {
        return (
          <>
            <div
              key={index}
              className='grid grid-cols-a1a h-[30px] w-full gap-2'
            >
              <div className='grid items-center justify-center w-[30px] bg-slate-300 h-full outline outline-2 outline-black px-2'>
                <label
                  htmlFor='loop'
                  className='h-full grid items-center justify-center'
                >
                  {index + 1}
                </label>
              </div>
              <div
                title='Click to edit'
                onClick={() => openAndEditLoop(loop, index)}
                className='grid bg-white grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer active:scale-95 hover:bg-yellow-200'
              >
                <div>{loop.loopTitle}</div>
                <div>T: {loop.loopTimeToComplete}</div>
              </div>
              {/* Delete button */}
              <div className='grid'>
                <button
                  id='delete_loop'
                  onClick={(event) => deleteLoop(event, loop)}
                  className='active:scale-95 no__highlights rounded-xl'
                >
                  <IoCloseCircleSharp />
                </button>
              </div>
            </div>
            {displayDataPoints && index === displayDataPointsIndex && (
              <div>
                {simulationData.simulationLoops[
                  index
                ].mainSimulationLoopDataPoints.map((dataPoint, index) => {
                  return (
                    <div
                      key={index}
                      className='grid grid-cols-a1a h-[30px] w-full gap-2'
                    >
                      <div className='grid items-center justify-center w-[30px] bg-slate-300 h-full outline outline-2 outline-black px-2'>
                        <label
                          htmlFor='loop'
                          className='h-full grid items-center justify-center'
                        >
                          {index + 1}
                        </label>
                      </div>

                      <div className='grid bg-white grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer hover:bg-yellow-200'>
                        {dataPoint}
                      </div>
                      {/* Delete button */}
                      <div className='grid'>
                        <button
                          id='delete_loop'
                          onClick={(event) =>
                            deleteLoopDataPoint(event, dataPoint)
                          }
                          className='active:scale-95 no__highlights rounded-xl'
                        >
                          <IoCloseCircleSharp />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );
      })}
      <div className='mt-2'>
        <button
          onClick={(event) => createNewLoop(event)}
          className='bg-yellow-400 rounded-lg px-2 w-full py-1 active:scale-95 hover:brightness-110'
        >
          Create Loop +
        </button>
      </div>
    </div>
  );
}

export default LoopsMenuContainer;
