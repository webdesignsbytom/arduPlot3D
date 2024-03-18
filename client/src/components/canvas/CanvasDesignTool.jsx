import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';

function CanvasDesignTool({ positionOfMouseAndCanvasVisible }) {
  const {
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

    // Assume each 'unit' on the ruler represents 100 pixels
    // Adjust this scale as needed for your application
    const unitSize = 100; // Size of each unit on the ruler in pixels
    const rulerUnitsX = Math.ceil(deviceWidthPixels / unitSize);
    const rulerUnitsY = Math.ceil(deviceHeightPixels / unitSize);

    // Generate ruler markings for X and Y
    rulerX.innerHTML = generateRulerMarks(rulerUnitsX, 'horizontal');
    rulerY.innerHTML = generateRulerMarks(rulerUnitsY, 'vertical');
  };

  const generateRulerMarks = (units, orientation) => {
    let marks = '';
    for (let i = 0; i <= units; i++) {
      marks += `<div style="flex: none; padding: 2px;">${i * 100}</div>`;
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

    if (isCreatingEditingLoop) {
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

    setSimulationData((currentSimulationData) => ({
      ...currentSimulationData,
      mainSimulationDataPoints: [
        ...currentSimulationData.mainSimulationDataPoints,
        newDataPoint,
      ],
    }));
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

    setSimulationData((currentSimulationData) => ({
      ...currentSimulationData,
      mainSimulationDataPoints: [
        ...currentSimulationData.mainSimulationDataPoints,
        newDataPoint,
      ],
    }));
  };

  // Timeout
  const createTimeoutDataPoint = () => {
    let newDataPoint = {
      ...timeoutDataPoint,
    };

    setSimulationData((currentSimulationData) => ({
      ...currentSimulationData,
      mainSimulationDataPoints: [
        ...currentSimulationData.mainSimulationDataPoints,
        newDataPoint,
      ],
    }));
  };

  return (
    <div className={`relative grid justify-center items-center `}>
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
              className='flex absolute left-0 bottom-[100%] bg-green-500'
              ref={rulerRefX}
              style={{ justifyContent: 'space-between', width: '100%' }}
            ></div>
            <div
              className='flex flex-col absolute right-[100%] top-0 bg-[#F1998650]'
              ref={rulerRefY}
              style={{ justifyContent: 'space-between', height: '100%' }}
            ></div>
          </>
        )}
      </div>
      {positionOfMouseAndCanvasVisible && (
        <div className={`grid absolute left-0 top-0 bg-white z-50`}>
          {`X: ${tooltip.x}, Y: ${tooltip.y}`}
        </div>
      )}
    </div>
  );
}

export default CanvasDesignTool;
