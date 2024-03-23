import React, { useContext, useEffect, useRef } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function CanvasSimulationTool() {
  const { selectedDevice, simulationData } = useContext(SimulationContext);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = selectedDevice.yPixels; // For landscape
    canvas.height = selectedDevice.xPixels;
    canvas.style.backgroundColor = '#bee0ec';
    contextRef.current = canvas.getContext('2d');
  }, [selectedDevice]);

  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;

    let startingXpos = 100;
    let startingYpos = 100;
    let finishingXpos = 300;
    let finishingYpos = 300;

    let travelTime = 5000; // milliseconds
    let startTime = null;

    const drawCircle = (x, y) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI); // Draw circle
      context.fillStyle = 'black';
      context.fill();
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      const progress = elapsedTime / travelTime; // Progress ratio
      const currentX = startingXpos + (finishingXpos - startingXpos) * progress;
      const currentY = startingYpos + (finishingYpos - startingYpos) * progress;

      drawCircle(currentX, currentY);

      if (elapsedTime < travelTime) { // Continue the animation
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
    <div className='relative mx-auto my-auto'>
      <canvas
        ref={canvasRef}
        className={`border-solid border-black border-2 rounded-xl`}
      />
    </div>
  );
}

export default CanvasSimulationTool;
