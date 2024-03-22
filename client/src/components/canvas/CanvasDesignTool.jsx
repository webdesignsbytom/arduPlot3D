import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Icons
import { IoReloadCircle } from 'react-icons/io5';
import { FaMousePointer } from 'react-icons/fa';
import { DragFunctionColour, MoveFunctionColour, MoveTapFunctionColour, TapFunctionColour, TimeoutFunctionColour } from '../../utils/design/Constants';

function CanvasDesignTool({ positionOfMouseAndCanvasVisible }) {
  const {
    // Canvas ref
    canvasRef,
    contextRef,
    marketNumRef,
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
  } = useContext(SimulationContext);

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
  // console.log('LINE REFFFF', lineRef.current);

  useEffect(() => {
    let currentData = simulationData.mainSimulationDataPoints;
    console.log('Current data:', currentData);

    currentData.forEach((element) => {
      switch (element.dataType) {
        case 'tap':
          drawPlotPoint(element.xPos, element.yPos, TapFunctionColour);
          break;
        case 'move':
          drawPlotPoint(element.xPos, element.yPos, MoveFunctionColour);
          break;
        case 'move_tap':
          drawPlotPoint(element.xPos, element.yPos, MoveTapFunctionColour);
          break;
        case 'drag':
          drawPlotPoint(element.startxPos, element.startyPos, DragFunctionColour);
          break;
        case 'timeout':
          drawPlotPoint(element.xPos, element.yPos, TimeoutFunctionColour);
          break;
        default:
          console.log('No matching action found');
      }
    });
  }, []);

  const drawPlotPoint = (xPos, yPos, colour) => {

    contextRef.current.strokeStyle = colour; // Sets the color of the circle's outline
    
    contextRef.current.beginPath();
    contextRef.current.arc(
      xPos,
      yPos,
      1,
      0,
      9 * Math.PI,
      true
    );
    contextRef.current.stroke();

    contextRef.current.fillStyle = 'black'; // This will ensure the text is always black

    contextRef.current.fillText(
      marketNumRef.current,
      xPos + 5,
      yPos + 5
    );
    marketNumRef.current++;
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

    // Creating a loop or sim data point
    let dataGroup = displaySimOrLoop;

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

    updateLoopState(newDataPoint);
    drawPlotPoint(newDataPoint.xPos, newDataPoint.yPos, TapFunctionColour)
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

    updateLoopState(newDataPoint);
    drawPlotPoint(newDataPoint.xPos, newDataPoint.yPos, MoveFunctionColour)
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

    updateLoopState(newDataPoint);
    drawPlotPoint(newDataPoint.xPos, newDataPoint.yPos, MoveTapFunctionColour)
  };

  // Drag
  const createDragDataPoint = (offsetX, offsetY, dataGroup) => {
    let newDataPoint = {
      dataGroup: dataGroup,
      dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
      startxPos: offsetX,
      startyPos: offsetY,
      finishxPos: 0,
      finishyPos: 0,
      xySpeed: speedOfArmMoving,
      zSpeed: speedOfFingerMoving,
      numFingers: numberOfFingerTapping,
      timeLength: 0,
    };

    updateLoopState(newDataPoint);
    drawPlotPoint(newDataPoint.startxPos, newDataPoint.startyPos, DragFunctionColour)
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

    updateLoopState(newDataPoint);
    drawPlotPoint(newDataPoint.xPos, newDataPoint.yPos, TimeoutFunctionColour)
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
