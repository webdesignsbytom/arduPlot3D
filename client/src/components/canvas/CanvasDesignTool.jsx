import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { DesignContext } from '../../context/DesignContext';

function CanvasDesignTool({
  canvasRef,
  contextRef,
  marketNumRef,
  lineRef,
  dataCollection,
  setDataCollection,
  setSimulationDataPoints,
  positionOfMouseAndCanvasVisible,
}) {
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
  } = useContext(DesignContext);

  // State to manage tooltip visibility and position
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // returns <context>
    const canvas = canvasRef.current;
    var rect = canvas.parentNode.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // set canvas to visible colour
    canvas.style.backgroundColor = '#bee0ec';

    const context = canvas.getContext('2d');

    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   var rect = canvas.parentNode.getBoundingClientRect();

  //   // Determine the desired padding (e.g., 20 pixels on top and bottom)
  //   const verticalPadding = 40; // Total for top and bottom

  //   // Adjust rect dimensions to account for padding
  //   const adjustedRectHeight = rect.height - verticalPadding;

  //   // Calculate the maximum scale ratio to fit the device in the adjusted screen space
  //   const scaleX = rect.width / selectedDevice.xDimension;
  //   const scaleY = adjustedRectHeight / selectedDevice.yDimension;
  //   const scaleRatio = Math.min(scaleX, scaleY);

  //   // Adjust canvas dimensions based on the selectedDevice size and scale ratio
  //   canvas.width = selectedDevice.xDimension * scaleRatio;
  //   canvas.height = selectedDevice.yDimension * scaleRatio;

  //   // Center the canvas vertically within the parent div
  //   const marginTop = (rect.height - canvas.height) / 2;
  //   canvas.style.marginTop = `${marginTop}px`;

  //   canvas.style.width = `${canvas.width}px`;
  //   canvas.style.height = `${canvas.height}px`;

  //   canvas.style.backgroundColor = '#bee0ec';

  //   const context = canvas.getContext('2d');
  //   context.scale(scaleRatio, scaleRatio); // Scale the context to fit the canvas
  //   context.lineCap = 'round';
  //   context.strokeStyle = 'black';
  //   context.lineWidth = 5 / scaleRatio; // Adjust line width based on the scale
  //   contextRef.current = context;
  // }, [selectedDevice]);

  const updatePositionMarker = ({ nativeEvent }) => {
    if (positionOfMouseAndCanvasVisible) {
      const { offsetX, offsetY } = nativeEvent;
      console.log('offsetX', offsetX);
      console.log('offsetY', offsetY);
      setTooltip({ x: offsetX, y: offsetY });
    }
  };

  const createMarker = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log('offsetX', offsetX);
    console.log('offsetY', offsetY);

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

    // contextRef.current.beginPath();
    // contextRef.current.arc(
    //   nativeEvent.offsetX,
    //   nativeEvent.offsetY,
    //   1,
    //   0,
    //   2 * Math.PI,
    //   true
    // );
    // contextRef.current.stroke();
    // contextRef.current.fillText(
    //   marketNumRef.current,
    //   nativeEvent.offsetX + 5,
    //   nativeEvent.offsetY + 5
    // );
    // marketNumRef.current++;
    // console.log('9B. contextRef.current', contextRef.current);
    // console.log('10. lineRef', lineRef);

    // // add to array of points
    // const tempStore = lineRef.current;
    // console.log('12. TempStore', tempStore);
    // const newObj = {
    //   xpos: offsetX,
    //   ypos: offsetY,
    // };
    // tempStore.push(newObj);
    // setDataCollection([...dataCollection, newObj]);
    // setSimulationDataPoints([...dataCollection, newObj]);

    // lineRef.current = tempStore;
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
    }

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
    }

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
    <div className='relative'>
      <canvas
        ref={canvasRef}
        onMouseMove={updatePositionMarker}
        onMouseUp={createMarker}
      />
      {positionOfMouseAndCanvasVisible && (
        <div className={`grid absolute left-0 top-0 bg-white z-50`}>
          {`X: ${tooltip.x}, Y: ${tooltip.y}`}
        </div>
      )}
    </div>
  );
}

export default CanvasDesignTool;
