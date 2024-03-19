import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';
// Icons
import { IoReloadCircle } from 'react-icons/io5';
import { FaMousePointer } from 'react-icons/fa';

function CanvasDesignTool({ positionOfMouseAndCanvasVisible }) {
  const {
    simulationData,
    setSimulationData,
    simulationToolSelected,
    tapDataPoint,
    setTapDataPoint,
    numberOfFingerTapping,
    speedOfFingerMoving,
    movementDataPoint,
    setMovementDataPoint,
    moveAndTapDataPoint,
    setMoveAndTapDataPoint,
    dragDataPoint,
    setDragDataPoint,
    timeoutDataPoint,
    setTimeoutDataPoint,
    timeoutModalOpen,
    setTimeoutModalOpen,
    timeoutLength,
    setTimeoutLength,
    timeoutUnitSelected,
    setTimeoutUnitSelected,
    dragSettingsModalOpen,
    setDragSettingsModalOpen,
    speedOfDraggingArmMoving,
    setSpeedOfDraggingArmMoving,
    selectedDevice,
    speedOfArmMoving,
    isCreatingEditingLoop,
    canvasRef,
    contextRef,
    marketNumRef,
    lineRef,
    setDataCollection,
    dataCollection,
    setSimulationDataPoints,
    isLandscapeMode,
    rulersVisible,
    isPxOrMmDimensions,
    setIsPxOrMmDimensions,
    loopDataBeingEdited,
    setLoopDataBeingEdited,
  } = useContext(DesignContext);

  // State to manage tooltip visibility and position
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  const rulerRefX = useRef(null); // Ref for the X-axis ruler
  const rulerRefY = useRef(null); // Ref for the Y-axis ruler

  useEffect(() => {
    // returns <context>
    const canvas = canvasRef.current;
    var rect = canvas.parentNode.getBoundingClientRect();

    let deviceWidthPixels = selectedDevice.xPixels; // Default to Samsung S20 Ultra's width in pixels
    let deviceHeightPixels = selectedDevice.yPixels; // Default to Samsung S20 Ultra's height in pixels

    if (isLandscapeMode) {
      // If in portrait mode, swap the width and height
      [deviceWidthPixels, deviceHeightPixels] = [
        deviceHeightPixels,
        deviceWidthPixels,
      ];
    }

    // Set canvas dimensions to match the device's dimensions in the current orientation
    canvas.width = deviceWidthPixels;
    canvas.height = deviceHeightPixels;

    // set canvas to visible colour
    canvas.style.backgroundColor = '#bee0ec';

    const context = canvas.getContext('2d');

    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;

    if (rulersVisible) {
      // Setup rulers if visible
      setupRulers();
    }
  }, [isLandscapeMode, rulersVisible, selectedDevice]);

  const updatePositionMarker = ({ nativeEvent }) => {
    if (positionOfMouseAndCanvasVisible) {
      const { offsetX, offsetY } = nativeEvent;

      setTooltip({ x: offsetX, y: offsetY });
    }
  };

  const setupRulers = () => {
    const canvas = canvasRef.current;
    const rulerX = rulerRefX.current;
    const rulerY = rulerRefY.current;

    let deviceWidthPixels = selectedDevice.xPixels; // Width in pixels
    let deviceHeightPixels = selectedDevice.yPixels; // Height in pixels

    if (isLandscapeMode) {
      [deviceWidthPixels, deviceHeightPixels] = [
        deviceHeightPixels,
        deviceWidthPixels,
      ];
    }

    // Generate ruler markings for X and Y
    rulerX.innerHTML = generateRulerMarks(deviceWidthPixels, 'horizontal');
    rulerY.innerHTML = generateRulerMarks(deviceHeightPixels, 'vertical');
  };

  const generateRulerMarks = (pixels, orientation) => {
    let marks = '';
    const unitSize = 100; // Size of each unit on the ruler in pixels
    const divisionSize = 10;
    const units = Math.floor(pixels / unitSize); // Use floor to not exceed device dimensions

    for (let i = 0; i <= units; i++) {
      marks += `<div style="flex: none; padding: 2px;">${i * 100}</div>`;
    }
    // To handle the last segment if it doesn't reach another full 100 pixels
    if (pixels % unitSize > 0) {
      marks += `<div style="flex: none; padding: 2px;">${pixels}</div>`;
    }
    return marks;
  };

  const createMarker = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    switch (simulationToolSelected) {
      case 'tap':
        createTapDataPoint(offsetX, offsetY);
        break;
      case 'move':
        createMoveDataPoint(offsetX, offsetY);
        break;
      case 'move_tap':
        createMoveAndTapDataPoint(offsetX, offsetY);
        break;
      case 'drag':
        createDragDataPoint(offsetX, offsetY);
        break;
      case 'timeout':
        createTimeoutDataPoint(offsetX, offsetY);
        break;
      default:
        console.log('No matching action found');
    }

    contextRef.current.beginPath();
    contextRef.current.arc(
      nativeEvent.offsetX,
      nativeEvent.offsetY,
      1,
      0,
      2 * Math.PI,
      true
    );
    contextRef.current.stroke();
    contextRef.current.fillText(
      marketNumRef.current,
      nativeEvent.offsetX + 5,
      nativeEvent.offsetY + 5
    );
    marketNumRef.current++;
    // console.log('9B. contextRef.current', contextRef.current);
    // console.log('10. lineRef', lineRef);

    // add to array of points
    const tempStore = lineRef.current;
    // console.log('12. TempStore', tempStore);
    const newObj = {
      xpos: offsetX,
      ypos: offsetY,
    };
    tempStore.push(newObj);
    setDataCollection([...dataCollection, newObj]);
    setSimulationDataPoints([...dataCollection, newObj]);

    lineRef.current = tempStore;
  };

  // Tap
  const createTapDataPoint = (offsetX, offsetY) => {
    let newDataPoint = {
      ...tapDataPoint,
      xPos: offsetX,
      yPos: offsetY,
      numFingers: numberOfFingerTapping,
      zSpeed: speedOfFingerMoving,
    };

    updateLoopState(newDataPoint);
  };

  // Move
  const createMoveDataPoint = (offsetX, offsetY) => {
    let newDataPoint = {
      dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
      xPos: offsetX,
      yPos: offsetY,
      xySpeed: speedOfArmMoving,
      timeLength: 0,
    };

    updateLoopState(newDataPoint);
  };

  // Move And Tap
  const createMoveAndTapDataPoint = (offsetX, offsetY) => {
    let newDataPoint = {
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 0,
      yPos: 0,
      xySpeed: speedOfArmMoving,
      zSpeed: speedOfFingerMoving,
      numFingers: 1,
      timeLength: 0,
    };

    updateLoopState(newDataPoint);
  };

  // Drag
  const createDragDataPoint = (offsetX, offsetY) => {
    let newDataPoint = {
      dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
      startxPos: 0,
      startyPos: 0,
      finishxPos: 0,
      finishyPos: 0,
      xySpeed: speedOfArmMoving,
      zSpeed: speedOfFingerMoving,
      numFingers: 1,
      timeLength: 0,
    };

    updateLoopState(newDataPoint);
  };

  // Timeout
  const createTimeoutDataPoint = () => {
    let newDataPoint = {
      ...timeoutDataPoint,
    };

    updateLoopState(newDataPoint);
  };

  function updateLoopState(newDataPoint) {
    if (isCreatingEditingLoop) {
      console.log('AAAAAAAAAAAAAA');
      setLoopDataBeingEdited((currentLoopData) => ({
        ...currentLoopData,
        mainSimulationLoopDataPoints: [
          ...currentLoopData.mainSimulationLoopDataPoints,
          newDataPoint, // Add the new data point to the existing array
        ],
      }));
    } else {
      // Update the simulationData state with the new data point
      setSimulationData((currentSimulationData) => {
        return {
          ...currentSimulationData,
          mainSimulationDataPoints: [
            ...currentSimulationData.mainSimulationDataPoints,
            newDataPoint,
          ],
        };
      });
    }
  }

  const toggleDeviceDimensions = () => {
    setIsPxOrMmDimensions(!isPxOrMmDimensions);
  };

  return (
    <div className={`relative grid justify-center items-center `}>
      {rulersVisible && (
        <div className='absolute grid grid-cols-rev top-1 right-1 z-10 outline outline-yellow-400 outline-1 rounded-xl px-6 py-1'>
          {isPxOrMmDimensions ? (
            <div>Dimensions: mm </div>
          ) : (
            <div>Dimensions: px </div>
          )}
          <div className='grid items-center pl-2 justify-center'>
            <IoReloadCircle
              className='active:scale-95 active:animate-spin duration-300 cursor-pointer'
              onClick={toggleDeviceDimensions}
            />
          </div>
        </div>
      )}

      <div className='grid absolute top-1 left-1/2 transform -translate-x-1/2'>
        <div className='outline outline-yellow-400 outline-1 rounded-xl px-4 py-1 grid justify-center items-center'>
          {simulationData.simulationTimeToComplete} seconds
        </div>
      </div>

      <div className='relative'>
        <canvas
          ref={canvasRef}
          onMouseMove={updatePositionMarker}
          onMouseUp={createMarker}
          className={`border-solid border-black border-2 rounded-xl`}
        />
        {rulersVisible && (
          <>
            <div
              className='flex absolute left-0 bottom-[100.5%] bg-yellow-400 rounded outline outline-[1px] outline-black'
              ref={rulerRefX}
              style={{ justifyContent: 'space-between', width: '100%' }}
            ></div>
            <div
              className='flex flex-col absolute right-[100.5%] text-right top-0 bg-yellow-400 rounded outline outline-[1px] outline-black'
              ref={rulerRefY}
              style={{ justifyContent: 'space-between', height: '100%' }}
            ></div>
          </>
        )}
      </div>
      {positionOfMouseAndCanvasVisible && (
        <div
          className={`grid grid-cols-reg gap-2 absolute left-1 top-1 bg-white z-50 outline outline-yellow-400 outline-1 rounded-xl px-4 py-1`}
        >
          <div className='grid items-center justify-center pr-1'>
            <FaMousePointer />
          </div>
          <div>{`X: ${tooltip.x}, Y: ${tooltip.y}`}</div>
        </div>
      )}

      <div className='grid absolute bottom-2 left-2 text-2xl font-bold uppercase'>
        Base
      </div>
      <div className='grid absolute bottom-2 right-2 text-2xl font-bold uppercase'>
        Top
      </div>
    </div>
  );
}

export default CanvasDesignTool;
