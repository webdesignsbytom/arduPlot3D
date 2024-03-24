import React, { useContext, useEffect, useRef } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function CanvasSimulationTool() {
  const { selectedDevice, simulationData } = useContext(SimulationContext);
  const deviceCanvasRef = useRef(null);
  const armCanvasRef = useRef(null);
  const deviceContextRef = useRef(null);
  const armContextRef = useRef(null);

  useEffect(() => {
    // Device canvas setup
    const deviceCanvas = deviceCanvasRef.current;
    deviceCanvas.width = selectedDevice.yPixels; // For landscape
    deviceCanvas.height = selectedDevice.xPixels;
    deviceCanvas.style.backgroundColor = '#bee0ec';
    deviceContextRef.current = deviceCanvas.getContext('2d');

    // Arm canvas setup
    const armCanvas = armCanvasRef.current;
    //armCanvas.style.backgroundColor = 'red';
    armCanvas.width = selectedDevice.yPixels + 50; 
    armCanvas.height = selectedDevice.xPixels + 50;

    armContextRef.current = armCanvas.getContext('2d');
  }, [selectedDevice]);

  useEffect(() => {
    const context = deviceContextRef.current;
    if (!context) return;

    let startingXpos = 100;
    let startingYpos = 100;
    let finishingXpos = 300;
    let finishingYpos = 300;

    let travelTime = 5000; // milliseconds
    let startTime = null;

    const drawMovingFinger = (x, y) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI); // Draw circle
      context.fillStyle = 'black';
      context.fill();
    };

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

    // flattenedData.forEach(dataPoint => {
    //     if (dataPoint.dataType === 'move_tap')
    // });

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      const progress = elapsedTime / travelTime; // Progress ratio
      const currentX = startingXpos + (finishingXpos - startingXpos) * progress;
      const currentY = startingYpos + (finishingYpos - startingYpos) * progress;

      drawMovingFinger(currentX, currentY);

      if (elapsedTime < travelTime) {
        // Continue the animation
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      // Cancel the animation frame request if needed
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
    </div>
  );
}

export default CanvasSimulationTool;
