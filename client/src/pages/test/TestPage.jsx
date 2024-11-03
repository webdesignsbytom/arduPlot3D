import React, { useEffect, useRef } from 'react';

function TestPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridSize = 8; // 8x8 grid
    const cellWidth = canvas.width / gridSize;
    const cellHeight = canvas.height / gridSize;

    // Function to draw the diagonal grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;

      // Draw diagonal lines from top-left to bottom-right
      for (let i = 0; i <= gridSize; i++) {
        // Top-left to bottom-right diagonal lines
        ctx.beginPath();
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(0, i * cellHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i * cellWidth, canvas.height);
        ctx.lineTo(canvas.width, canvas.height - i * cellHeight);
        ctx.stroke();
      }
    };

    // Clear canvas and draw the grid once
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

  }, []);

  return (
    <div className='grid bg-white'>
      <div className='flex justify-center items-center h-screen'>
        <div className='border border-black border-solid p-5 special_1 w-[400px] h-[400px]'>
          <canvas ref={canvasRef} width={400} height={400} />
        </div>
      </div>
    </div>
  );
}

export default TestPage;
