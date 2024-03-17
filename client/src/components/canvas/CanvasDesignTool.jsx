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
    console.log('9B. contextRef.current', contextRef.current);
    console.log('10. lineRef', lineRef);

    // add to array of points
    const tempStore = lineRef.current;
    console.log('12. TempStore', tempStore);
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
  const createMoveDataPoint = () => {};
  // Move And Tap
  const createMoveAndTapDataPoint = () => {};
  // Drag
  const createDragDataPoint = () => {};
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
