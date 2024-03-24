import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Icons
import { IoReloadCircle } from 'react-icons/io5';
import { FaMousePointer } from 'react-icons/fa';
import {
  DragFunctionColour,
  MoveFunctionColour,
  MoveTapFunctionColour,
  TapFunctionColour,
  TimeoutFunctionColour,
  availablePointsToDisplayData,
} from '../../utils/design/Constants';

function CanvasDesignTool({ positionOfMouseAndCanvasVisible }) {
  const {
    // Canvas ref
    canvasRef,
    contextRef,
    dataPointMarkerRef,
    // Main sim data
    simulationData,
    setSimulationData,
    // Tools and data
    simulationToolSelected,
    numberOfFingerTapping,
    speedOfFingerMoving,
    timeoutLength,
    timeoutUnitSelected,
    dragSettingsModalOpen,
    speedOfDraggingArmMoving,
    selectedDevice,
    speedOfArmMoving,
    isCreatingEditingLoop,
    setDataCollection,
    dataCollection,
    setSimulationDataPoints,
    isLandscapeMode,
    rulersVisible,
    isPxOrMmDimensions,
    setIsPxOrMmDimensions,
    loopDataBeingEdited,
    setLoopDataBeingEdited,
    displaySimOrLoop,
    numberOfDataPointsToDisplay,
  } = useContext(SimulationContext);

  // State to manage tooltip visibility and position
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const [isCreatingDragDataPoint, setIsCreatingDragDataPoint] = useState(false);
  const [tempDragObject, setTempDragObject] = useState({});

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

  useEffect(() => {
    const storedSimulationData = localStorage.getItem('simulationData');
    if (storedSimulationData) {
      setSimulationData(JSON.parse(storedSimulationData));
    }
  }, []); // This effect runs only once on mount

  // Load current points on startup
  useEffect(() => {
    const context = contextRef.current;
    // Clear the canvas first
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let flattenedData = [];
    let displayCountMap = {
      infinite: Infinity, // Use Infinity for a mathematical approach
      one: 1,
      two: 2,
      three: 3,
      five: 5,
      ten: 10,
    };

    if (!isCreatingEditingLoop) {
      // Handling for simulation data points
      simulationData.mainSimulationDataPoints.forEach((point) => {
        // Create simulation data points
        if (point.dataGroup === 'simulation') {
          flattenedData.push(point);
        } else if (point.dataGroup === 'loop') {
          // Create loop simulation points
          // Expand with loop points if needed
          flattenedData.push(
            ...point.mainSimulationLoopDataPoints.map((loopPoint, index) => ({
              ...loopPoint,
              decimalIndex: parseFloat(
                `${flattenedData.length + 1}.${index + 1}`
              ),
            }))
          );
        }
      });
    } else {
      dataPointMarkerRef.current = 0;
      // Handling for loop data being edited
      // Assume loopDataBeingEdited.mainSimulationLoopDataPoints is similar to 'simulation' group data
      flattenedData = [...loopDataBeingEdited.mainSimulationLoopDataPoints];
    }

    // Determine the number of points to display
    let displayCount =
      displayCountMap[numberOfDataPointsToDisplay] || flattenedData.length;
    const pointsToDisplay = flattenedData.slice(-displayCount);

    let mainIndexTally = 1;
    let isDecimal = false;

    if (pointsToDisplay.length > 0) {
      // Draw the points
      pointsToDisplay.forEach((element, index) => {
        let markerIndex = element.decimalIndex || mainIndexTally; // Use decimalIndex if present, otherwise index + 1

        if (element.decimalIndex) {
          if (!isDecimal) {
            mainIndexTally++;
          }
          isDecimal = true;
        }

        if (!element.decimalIndex) {
          isDecimal = false;
          mainIndexTally++;
        }

        sortDataElements(element, markerIndex);
      });

      let newIndex = simulationData.mainSimulationDataPoints.length;
      dataPointMarkerRef.current = newIndex;
    }

    // Save simulationData to localStorage
    localStorage.setItem('simulationData', JSON.stringify(simulationData));
  }, [
    isCreatingEditingLoop,
    numberOfDataPointsToDisplay,
    simulationData,
    loopDataBeingEdited,
  ]);

  const sortDataElements = (element, markerIndex) => {
    // Use markerIndex for drawing the point
    switch (element.dataType) {
      case 'tap':
        drawPlotPoint(element, TapFunctionColour, markerIndex);
        break;
      case 'move':
        drawPlotPoint(element, MoveFunctionColour, markerIndex);
        break;
      case 'move_tap':
        drawPlotPoint(element, MoveTapFunctionColour, markerIndex);
        break;
      case 'drag':
        drawPlotPoint(element, DragFunctionColour, markerIndex);
        break;
      case 'timeout':
        drawPlotPoint(element, TimeoutFunctionColour, markerIndex);
        break;
      default:
        console.log('No matching action found');
    }
  };

  const drawPlotPoint = (newDataPoint, colour, markerIndex) => {
    const context = contextRef.current;
    context.strokeStyle = colour; // Sets the color of the circle's outline

    if (!isCreatingDragDataPoint) {
      context.beginPath();
      if (newDataPoint.dataType !== 'drag') {
        context.arc(
          newDataPoint.xPos,
          newDataPoint.yPos,
          1,
          0,
          2 * Math.PI,
          true
        );
        context.stroke();
        context.fillStyle = 'black'; // This will ensure the text is always black
        context.fillText(
          markerIndex,
          newDataPoint.xPos + 5,
          newDataPoint.yPos + 5
        );
      } else {
        // Is drag data point
        console.log('11111111111111');
        context.arc(
          newDataPoint.startxPos,
          newDataPoint.startyPos,
          1,
          0,
          2 * Math.PI,
          true
        );
        context.stroke();
        context.fillStyle = 'black'; // This will ensure the text is always black
        context.fillText(
          markerIndex,
          newDataPoint.startxPos + 5,
          newDataPoint.startyPos + 5
        );

        // Create drag point arrow
        if (
          newDataPoint.finishxPos !== null &&
          newDataPoint.finishyPos !== null
        ) {
          // Calculate direction vector
          let dx = newDataPoint.finishxPos - newDataPoint.startxPos;
          let dy = newDataPoint.finishyPos - newDataPoint.startyPos;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // Dynamically adjust gap and arrow head size based on distance
          let gap, headlen;
          if (distance < 40) {
            gap = 1; // Smaller gap for short distances
            headlen = 4; // Smaller arrow head for short distances
          } else {
            gap = 10; // Default gap size
            headlen = 10; // Default arrow head size
          }

          // Adjust start and end points for gap
          let gapXStart = (gap / distance) * dx;
          let gapYStart = (gap / distance) * dy;
          let gapEnd = gap + headlen; // Adjust end gap to include arrow head
          let gapXEnd = (gapEnd / distance) * dx;
          let gapYEnd = (gapEnd / distance) * dy;

          // Start the path for the line with adjusted start point
          context.beginPath();
          context.moveTo(
            newDataPoint.startxPos + gapXStart,
            newDataPoint.startyPos + gapYStart
          );
          context.lineTo(
            newDataPoint.finishxPos - gapXEnd,
            newDataPoint.finishyPos - gapYEnd
          );
          context.stroke(); // Apply the line to the canvas

          // Drawing the arrow head with adjusted size
          let angle = Math.atan2(dy, dx);
          context.beginPath();
          let adjustedFinishX = newDataPoint.finishxPos - gapXEnd;
          let adjustedFinishY = newDataPoint.finishyPos - gapYEnd;
          context.moveTo(adjustedFinishX, adjustedFinishY);
          context.lineTo(
            adjustedFinishX - headlen * Math.cos(angle - Math.PI / 6),
            adjustedFinishY - headlen * Math.sin(angle - Math.PI / 6)
          );
          context.lineTo(
            adjustedFinishX - headlen * Math.cos(angle + Math.PI / 6),
            adjustedFinishY - headlen * Math.sin(angle + Math.PI / 6)
          );
          context.lineTo(adjustedFinishX, adjustedFinishY);
          context.lineTo(
            adjustedFinishX - headlen * Math.cos(angle - Math.PI / 6),
            adjustedFinishY - headlen * Math.sin(angle - Math.PI / 6)
          );
          context.stroke(); // Apply the arrow head to the canvas
          context.fillStyle = 'black';
          context.fill(); // Fill the arrow head with black color
        }

        // Draw second data point
        context.beginPath();
        context.arc(
          newDataPoint.finishxPos,
          newDataPoint.finishyPos,
          1,
          0,
          2 * Math.PI,
          true
        );
        context.stroke();
        context.fillStyle = 'black'; // This will ensure the text is always black
        context.fillText(
          markerIndex,
          newDataPoint.finishxPos + 5,
          newDataPoint.finishyPos + 5
        );
      }
    } else {
      context.beginPath();
      context.arc(
        newDataPoint.finishxPos,
        newDataPoint.finishyPos,
        1,
        0,
        2 * Math.PI,
        true
      );
      context.stroke();
      context.fillStyle = 'black'; // This will ensure the text is always black
      context.fillText(
        markerIndex,
        newDataPoint.finishxPos + 5,
        newDataPoint.finishyPos + 5
      );
    }
  };

  const updatePositionMarker = ({ nativeEvent }) => {
    if (positionOfMouseAndCanvasVisible) {
      const { offsetX, offsetY } = nativeEvent;

      setTooltip({ x: offsetX, y: offsetY });
    }
  };

  const setupRulers = () => {
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

    if (isCreatingDragDataPoint) {
      setSecondDragPoint(offsetX, offsetY);
      return;
    }
    // Creating a loop or sim data point
    let dataGroup = 'simulation';
    if (isCreatingEditingLoop) {
      dataGroup = 'loop';
    }

    switch (simulationToolSelected) {
      case 'tap':
        createTapDataPoint(offsetX, offsetY, dataGroup);
        break;
      case 'move':
        createMoveDataPoint(offsetX, offsetY, dataGroup);
        break;
      case 'move_tap':
        createMoveAndTapDataPoint(offsetX, offsetY, dataGroup);
        break;
      case 'drag':
        createDragDataPoint(offsetX, offsetY, dataGroup);
        break;
      case 'timeout':
        createTimeoutDataPoint(offsetX, offsetY, dataGroup);
        break;
      default:
        console.log('No matching action found');
    }
  };

  // Tap
  const createTapDataPoint = (offsetX, offsetY, dataGroup) => {
    let newDataPoint = {
      dataGroup: dataGroup,
      dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: offsetX,
      yPos: offsetY,
      zSpeed: speedOfFingerMoving,
      numFingers: numberOfFingerTapping,
      timeLength: 0,
    };

    // Directly increment and use dataPointMarkerRef for new data points
    dataPointMarkerRef.current += 1;

    updateLoopState(newDataPoint);
    drawPlotPoint(newDataPoint, TapFunctionColour, dataPointMarkerRef.current);
  };

  // Move
  const createMoveDataPoint = (offsetX, offsetY, dataGroup) => {
    let newDataPoint = {
      dataGroup: dataGroup,
      dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
      xPos: offsetX,
      yPos: offsetY,
      xySpeed: speedOfArmMoving,
      timeLength: 0,
    };

    // Directly increment and use dataPointMarkerRef for new data points
    dataPointMarkerRef.current += 1;

    updateLoopState(newDataPoint);
    drawPlotPoint(newDataPoint, MoveFunctionColour, dataPointMarkerRef.current);
  };

  // Move And Tap
  const createMoveAndTapDataPoint = (offsetX, offsetY, dataGroup) => {
    let newDataPoint = {
      dataGroup: dataGroup,
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: offsetX,
      yPos: offsetY,
      xySpeed: speedOfArmMoving,
      zSpeed: speedOfFingerMoving,
      numFingers: numberOfFingerTapping,
      timeLength: 0,
    };

    // Directly increment and use dataPointMarkerRef for new data points
    dataPointMarkerRef.current += 1;

    updateLoopState(newDataPoint);
    drawPlotPoint(
      newDataPoint,
      MoveTapFunctionColour,
      dataPointMarkerRef.current
    );
  };

  // Drag
  const createDragDataPoint = (offsetX, offsetY, dataGroup) => {
    let newDataPoint = {
      dataGroup: dataGroup,
      dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
      startxPos: offsetX,
      startyPos: offsetY,
      finishxPos: null,
      finishyPos: null,
      xySpeed: speedOfArmMoving,
      zSpeed: speedOfFingerMoving,
      numFingers: numberOfFingerTapping,
      timeLength: 0,
    };

    // Directly increment and use dataPointMarkerRef for new data points
    dataPointMarkerRef.current += 1;

    drawPlotPoint(newDataPoint, DragFunctionColour, dataPointMarkerRef.current);

    setIsCreatingDragDataPoint(true);
    setTempDragObject(newDataPoint);
  };

  const setSecondDragPoint = (offsetX, offsetY) => {
    let completedObject = {
      ...tempDragObject,
      finishxPos: offsetX,
      finishyPos: offsetY,
    };
    // Update the tempDragObject with the new finish positions
    setTempDragObject((currentDragObject) => ({
      ...currentDragObject,
      finishxPos: offsetX,
      finishyPos: offsetY,
    }));

    drawPlotPoint(
      completedObject,
      DragFunctionColour,
      dataPointMarkerRef.current
    );

    updateLoopState(completedObject);
    setIsCreatingDragDataPoint(false);
  };

  // Timeout
  const createTimeoutDataPoint = (offsetX, offsetY, dataGroup) => {
    let newDataPoint = {
      dataGroup: dataGroup,
      dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
      xPos: offsetX,
      yPos: offsetY,
      timeoutLength: timeoutLength, // milliseconds only
    };

    // Directly increment and use dataPointMarkerRef for new data points

    dataPointMarkerRef.current += 1;
    updateLoopState(newDataPoint);
    drawPlotPoint(
      newDataPoint,
      TimeoutFunctionColour,
      dataPointMarkerRef.current
    );
  };

  function updateLoopState(newDataPoint) {
    if (isCreatingEditingLoop) {
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
