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
  const { simulationData, setSimulationData, simulationLoopData } =
    useContext(DesignContext);

  const [displayDataPoints, setDisplayDataPoints] = useState(false);
  const [displayDataPointsIndex, setDisplayDataPointsIndex] = useState(0);
  const [arrayOfLoopData, setArrayOfLoopData] = useState([]);

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
    if (displayDataPoints && index === displayDataPointsIndex) {
      setDisplayDataPoints(false);
      return;
    }

    console.log('loop', loop);
    setDisplayDataPoints(true);
    setDisplayDataPointsIndex(index);
    setArrayOfLoopData(simulationData.simulationLoops[index]);
  };

  const deleteLoopDataPoint = (event, dataPoint) => {
    event.preventDefault(); // This will prevent the default action

    console.log('dataPoint', dataPoint);
  };
  
  const createNewLoop = (event) => {
    event.preventDefault(); // This will prevent the default action
  
    // Determine the new loop's index based on the current array length
    const newLoopIndex = simulationData.simulationLoops.length;
  
    // Construct the new loop name by adding 1 to the new loop's index
    const newLoopName = `Loop ${newLoopIndex + 1}`;
  
    // Assuming simulationLoopData is structured correctly but needs a name update
    let newLoop = {
      ...simulationLoopData,
      loopTitle: newLoopName, // Update the loop title with the new name
    };
  
    // Use the spread operator to copy existing loops and add the new loop
    setSimulationData({
      ...simulationData,
      simulationLoops: [...simulationData.simulationLoops, newLoop],
    });
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
                className='grid bg-slate-200 grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer active:scale-95 hover:bg-yellow-200'
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

            {/*  */}
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
