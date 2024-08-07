import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Components
import LoopItem from './LoopItem';
// Icons
import { IoCloseCircleSharp } from 'react-icons/io5';
// Colours
import {
  DragFunctionColour,
  MoveFunctionColour,
  MoveTapFunctionColour,
  TapFunctionColour,
  TimeoutFunctionColour,
} from '../../utils/design/Constants';

function LoopItemContainer({ index, loopData }) {
  const {
    displayLoopDataPoints,
    displayLoopDataPointsIndex,
    displaySimOrLoop,
    deleteDataPointFromSimulation,
    deleteDataPointFromLoop,
    isCreatingEditingLoop,
  } = useContext(SimulationContext);

  const handleDataPointInputChange = (index, dataIndex, event) => {
    const { value } = event.target;
    console.log('Value', value);
    console.log('Index', index);
    console.log('DataIndex', dataIndex);
  };
  
  return (
    <>
      <LoopItem key={index} index={index} loopData={loopData} />

      {/* Loop data point items */}
      {displayLoopDataPoints &&
        index === displayLoopDataPointsIndex &&
        loopData.mainSimulationLoopDataPoints.map(
          (loopDataPoint, dataIndex) => {
            return (
              <div
                key={dataIndex}
                className='grid grid-cols-a1a h-[30px] w-full gap-2'
              >
                <div className='grid items-center justify-center w-[30px] bg-purple-300 h-full outline outline-2 outline-black px-2'>
                  <label
                    htmlFor='data_point'
                    className='h-full grid items-center justify-center'
                  >
                    {index + 1}.{dataIndex + 1}
                  </label>
                </div>
                <div className='grid w-full h-full bg-secondary-colour outline-black outline outline-2'>
                  <input
                    title={loopDataPoint.dataType}
                    className={`w-full h-full px-2`}
                    style={{
                      background:
                        loopDataPoint.dataType === 'tap'
                          ? `linear-gradient(${TapFunctionColour}, #98e5bc)`
                          : loopDataPoint.dataType === 'move_tap'
                          ? `linear-gradient(${MoveTapFunctionColour}, #e5d860)`
                          : loopDataPoint.dataType === 'move'
                          ? `linear-gradient(${MoveFunctionColour}, #c4b5fd)`
                          : loopDataPoint.dataType === 'drag'
                          ? `linear-gradient(${DragFunctionColour}, #f9a8d4)`
                          : loopDataPoint.dataType === 'timeout'
                          ? `linear-gradient(${TimeoutFunctionColour}, #93c5fd)`
                          : 'none',
                    }}
                    type='text'
                    name='data_point'
                    id='data_point'
                    value={`x: ${loopDataPoint.xPos}, y: ${loopDataPoint.yPos}`}
                    onChange={(event) =>
                      handleDataPointInputChange(index, dataIndex, event)
                    }
                    readOnly={isCreatingEditingLoop ? true : false}
                  />
                </div>
                {/* Delete button */}
                <div className='grid min-w-[16px]'>
                  <div></div>
                </div>
              </div>
            );
          }
        )}
    </>
  );
}

export default LoopItemContainer;
