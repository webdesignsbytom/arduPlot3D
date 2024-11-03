import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Icons
import { FaMousePointer } from 'react-icons/fa';
import { blankSimulationAnimationObject } from '../../utils/design/TempData';
import { MdTimer } from 'react-icons/md';

function CanvasSimulationTool({ isResettingAnimation }) {
  const { selectedDevice, simulationData } = useContext(SimulationContext);
  const deviceCanvasRef = useRef(null);
  const armCanvasRef = useRef(null);
  const deviceContextRef = useRef(null);
  const armContextRef = useRef(null);
  const currentPositionRef = useRef({ xPos: 0, yPos: 0 });
  const startTimeRef = useRef(null);

  const [canvasDimensionIncrease, setCanvasDimensionIncrease] = useState(50);

  useEffect(() => {
    // Device canvas setup
    const deviceCanvas = deviceCanvasRef.current;
    deviceCanvas.width = selectedDevice.yPixels; // For landscape
    deviceCanvas.height = selectedDevice.xPixels;
    deviceCanvas.style.backgroundColor = '#bee0ec';
    deviceContextRef.current = deviceCanvas.getContext('2d');

    // Arm canvas setup
    const armCanvas = armCanvasRef.current;
    armCanvas.width = selectedDevice.yPixels + canvasDimensionIncrease;
    armCanvas.height = selectedDevice.xPixels + canvasDimensionIncrease;
    armContextRef.current = armCanvas.getContext('2d');

    let startingXpos = canvasDimensionIncrease / 2;
    let startingYpos = canvasDimensionIncrease / 2;

    currentPositionRef.current = { xPos: startingXpos, yPos: startingYpos };
  }, [selectedDevice]);

  useEffect(() => {
    const context = armContextRef.current;
    if (!context) return;

    let initialPositions =
      blankSimulationAnimationObject.mainSimulationDataPoints;

    let flattenedData = [];

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

    initialPositions.unshift({
      dataType: 'starting_pos',
      xPos: currentPositionRef.current.xPos,
      yPos: currentPositionRef.current.yPos,
    });

    let currentIndex = 0; // Start at the initial position
    let travelTime = 1000; // milliseconds for each segment

    const animate = (timestamp) => {
      // Get time
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsedTime = timestamp - startTimeRef.current;

      // Stop if we've reached the last point
      if (currentIndex >= initialPositions.length - 1) return;

      // Ensure progress doesn't exceed 1
      const progress = Math.min(1, elapsedTime / travelTime);

      const currentDataPoint = initialPositions[currentIndex];
      let circleSize = 20; // Default circle size
      console.log('CURRENT: ', currentDataPoint);

      let startX, startY, endX, endY;

      if (initialPositions[currentIndex].dataType === 'starting_pos') {
        startX = initialPositions[currentIndex].xPos;
        startY = initialPositions[currentIndex].yPos;
        endX = initialPositions[currentIndex].xPos;
        endY = initialPositions[currentIndex].yPos;
      }

      if (initialPositions[currentIndex].dataType === 'move_tap') {
        startX =
          initialPositions[currentIndex - 1].xPos + canvasDimensionIncrease / 2;
        startY =
          initialPositions[currentIndex - 1].yPos + canvasDimensionIncrease / 2;
        endX =
          initialPositions[currentIndex].xPos + canvasDimensionIncrease / 2;
        endY =
          initialPositions[currentIndex].yPos + canvasDimensionIncrease / 2;
      }

      if (initialPositions[currentIndex].dataType === 'tap') {
        // Move to postion
        startX =
          initialPositions[currentIndex - 1].xPos + canvasDimensionIncrease / 2;
        startY =
          initialPositions[currentIndex - 1].yPos + canvasDimensionIncrease / 2;
        endX =
          initialPositions[currentIndex].xPos + canvasDimensionIncrease / 2;
        endY =
          initialPositions[currentIndex].yPos + canvasDimensionIncrease / 2;
        // Tap down animtion
        // ???
      }

      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;

      drawMovingFinger(currentX, currentY, circleSize);

      if (elapsedTime >= travelTime) {
        // Move to the next segment
        startTimeRef.current = null; // Reset start time for the next segment
        currentIndex++; // Increment to the next point
        if (currentIndex < initialPositions.length - 1) {
          requestAnimationFrame(animate);
        }
      } else {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Modify drawMovingFinger to accept circleSize
    const drawMovingFinger = (x, y, circleSize) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
      context.beginPath();
      context.arc(x, y, circleSize, 0, 2 * Math.PI); // Draw circle with variable size
      context.fillStyle = 'black';
      context.fill();
    };

    // Cleanup
    return () => {
      startTimeRef.current = null; // Reset startTimeRef on component unmount
    };
  }, [simulationData, isResettingAnimation]); // Re-run the animation if simulationData changes

  const commonStyles =
    'bg-colour1 text-lg px-1 py-1 border-2 border-solid border-gray-300 shadow-cardShadow';

  return (
    <section className='relative grid grid-rows-reg bg-colour1'>
      {/* Databar */}
      <section className='grid grid-cols-2 gap-2 w-full px-2 pt-2 pb-2'>
        {/* Dimensions */}
        <section className='grid w-full'>
          <div
            className={`grid grid-flow-col gap-4 justify-center ${commonStyles}`}
          >
            <div className='grid items-center justify-center pr-1'>
              <FaMousePointer />
            </div>
            <div>   
              {`X: ${
                currentPositionRef.current.xPos - canvasDimensionIncrease / 2
              }, Y: ${
                currentPositionRef.current.yPos - canvasDimensionIncrease / 2
              }`}
            </div>
          </div>
        </section>

        {/* Time */}
        <section className='grid w-full'>
          <div
            className={`grid grid-flow-col gap-4 justify-center items-center ${commonStyles}`}
          >
            <MdTimer />
            <span>{simulationData.simulationTimeToComplete} seconds</span>
          </div>
        </section>
      </section>

      <div className='grid relative items-center justify-center'>
        <canvas
          ref={deviceCanvasRef}
          className={`border-solid absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-colour2 border-4 rounded-xl`}
        />
        <canvas
          ref={armCanvasRef}
          className={`border-solid absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-colour2 border-4 rounded-xl`}
        />
      </div>
    </section>
  );
}

export default CanvasSimulationTool;
