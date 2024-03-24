import React, { useContext, useEffect, useRef, useState } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Icons
import { FaMousePointer } from 'react-icons/fa';

function CanvasSimulationTool() {
  const { selectedDevice, simulationData } = useContext(SimulationContext);
  const deviceCanvasRef = useRef(null);
  const armCanvasRef = useRef(null);
  const deviceContextRef = useRef(null);
  const armContextRef = useRef(null);
  const currentPositionRef = useRef({ x: 0, y: 0 });
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

    let armRef = armContextRef.current;

    let startingXpos = canvasDimensionIncrease / 2;
    let startingYpos = canvasDimensionIncrease / 2;

    currentPositionRef.current = { x: startingXpos, y: startingYpos };

    armRef.clearRect(0, 0, armRef.canvas.width, armRef.canvas.height); // Clear the canvas
    armRef.beginPath();
    armRef.arc(startingXpos, startingYpos, 20, 0, 2 * Math.PI); // Draw circle
    armRef.fillStyle = 'black';
    armRef.fill();
  }, [selectedDevice]);

  useEffect(() => {
    const context = armContextRef.current;
    if (!context) return;

    let initialPositions = [
      { x: 100, y: 222 },
      { x: 200, y: 300 },
      { x: 100, y: 66 },
      { x: 12, y: 300 },
    ];

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

    console.log('FLATTTTTTTT', flattenedData);

    initialPositions.unshift({
      x: currentPositionRef.current.x,
      y: currentPositionRef.current.y,
    });

    let currentIndex = 0; // Start at the initial position
    let travelTime = 1000; // milliseconds for each segment

    const drawMovingFinger = (x, y) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI); // Draw circle
      context.fillStyle = 'black';
      context.fill();
    };

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsedTime = timestamp - startTimeRef.current;

      if (currentIndex >= initialPositions.length - 1) return; // Stop if we've reached the last point

      const progress = Math.min(1, elapsedTime / travelTime); // Ensure progress doesn't exceed 1

      const startX = initialPositions[currentIndex].x;
      const startY = initialPositions[currentIndex].y;
      const endX = initialPositions[currentIndex + 1].x;
      const endY = initialPositions[currentIndex + 1].y;

      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;

      currentPositionRef.current = { x: currentX, y:  currentY };

      drawMovingFinger(currentX, currentY);

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

    // Cleanup
    return () => {
      startTimeRef.current = null; // Reset startTimeRef on component unmount
    };
  }, [simulationData]); // Re-run the animation if simulationData changes

  return (
    <div className='relative grid justify-center items-center'>
      <canvas
        ref={deviceCanvasRef}
        className={`border-solid border-black border-2 rounded-xl`}
      />
      <canvas
        ref={armCanvasRef}
        className={`border-solid absolute z-30 border-black border-2 rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      />
      <div
        className={`grid grid-cols-reg gap-2 absolute left-1 top-1 bg-white z-50 outline outline-yellow-400 outline-1 rounded-xl px-4 py-1`}
      >
        <div className='grid items-center justify-center pr-1'>
          <FaMousePointer />
        </div>
        <div>{`X: ${
          currentPositionRef.current.x - canvasDimensionIncrease / 2
        }, Y: ${
          currentPositionRef.current.y - canvasDimensionIncrease / 2
        }`}</div>
      </div>
      <div className='grid absolute top-1 left-1/2 transform -translate-x-1/2'>
        <div className='outline outline-yellow-400 outline-1 rounded-xl px-4 py-1 grid justify-center items-center'>
          {simulationData.simulationTimeToComplete} seconds
        </div>
      </div>
    </div>
  );
}

export default CanvasSimulationTool;
