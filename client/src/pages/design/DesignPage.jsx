import React, { useContext, useEffect, useRef, useState } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import DesignDataBar from '../../components/design/DesignDataBar';
import CanvasDesignTool from '../../components/canvas/CanvasDesignTool';
import DesignFunctionsBar from '../../components/design/DesignFunctionsBar';
import DesignTopToolBar from '../../components/design/DesignTopToolBar';
// Context
import { ToggleContext } from '../../context/ToggleContext';
import { DesignContext } from '../../context/DesignContext';

function DesignPage() {
  const { setActiveNav } = useContext(ToggleContext);
  const {
    isCreatingNewLoop,
    setIsCreatingNewLoop,
    rulersVisible,
    setRulersVisible,
    simulationIsRunning,
    setSimulationIsRunning,
    isLandscapeMode,
    setIsLandscapeMode,
  } = useContext(DesignContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const marketNumRef = useRef(1);
  const lineRef = useRef([]);
  const emptyRef = useRef([]);

  const [dataCollection, setDataCollection] = useState([]);

  useEffect(() => {
    setActiveNav('/design');
  }, []);

  const clearDataPoints = (event) => {
    event.preventDefault();
    console.log('CLEAR', event.target.id);
    lineRef.current = emptyRef.current;
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    marketNumRef.current = 1;
    setDataCollection([]);
  };

  const drawConnectingLines = () => {
    console.log('draw');

    // add to array of points
    const tempStore = lineRef.current;
    lineRef.current = tempStore;

    if (tempStore.length > 2) {
      // Draw line from start to finish
      let start = tempStore[0];
      let finish = tempStore[tempStore.length - 1];
      console.log('start.', start);
      console.log('finsi', finish);

      contextRef.current.beginPath();
      contextRef.current.moveTo(start.xpos, start.ypos);
      contextRef.current.lineTo(finish.xpos, finish.ypos);
      contextRef.current.stroke();

      let previousRef = start;

      for (let index = 1; index < tempStore.length; index++) {
        const element = tempStore[index];
        console.log('element', element);

        contextRef.current.beginPath();
        contextRef.current.moveTo(previousRef.xpos, previousRef.ypos);
        contextRef.current.lineTo(element.xpos, element.ypos);
        contextRef.current.stroke();
        previousRef = element;
      }
    }
  };

  // Create new simulation loop of commands
  const createNewSimulationLoop = () => {
    setIsCreatingNewLoop(true);
  };
  // Save new simulation loop of commands
  const saveNewSimulationLoop = () => {
    setIsCreatingNewLoop(false);
  };

  // Display rulers on canvas
  const displayCanvasRulers = () => {
    setRulersVisible(true);
  };
  // Hide rulers on canvas
  const hideCanvasRulers = () => {
    setRulersVisible(false);
  };

  // Display rulers on canvas
  const runSimulation = () => {
    setSimulationIsRunning(true);
  };
  // Hide rulers on canvas
  const stopSimulation = () => {
    setSimulationIsRunning(false);
  };

  // Display rulers on canvas
  const setSimulationLandScape = () => {
    setIsLandscapeMode(true);
  };
  // Hide rulers on canvas
  const setSimulationPortrait = () => {
    setIsLandscapeMode(false);
  };

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

      {/* Main */}
      <main className='grid h-full grid-cols-a1a overflow-hidden'>
        {/* Functions bar */}
        <section className='grid max-w-[200px]'>
          <DesignFunctionsBar />
        </section>

        {/* canvas */}
        <section className='grid grid-rows-reg gap-4 p-4 overflow-hidden'>
          {/* Top tool bar menu */}
          <DesignTopToolBar
            drawConnectingLines={drawConnectingLines}
            clearDataPoints={clearDataPoints}
            createNewSimulationLoop={createNewSimulationLoop}
            saveNewSimulationLoop={saveNewSimulationLoop}
            hideCanvasRulers={hideCanvasRulers}
            displayCanvasRulers={displayCanvasRulers}
            runSimulation={runSimulation}
            stopSimulation={stopSimulation}
            setSimulationLandScape={setSimulationLandScape}
            setSimulationPortrait={setSimulationLandScape}
          />

          {/* CANVAS */}
          <div className='bg-white h-full grid outline-black outline outline-2 overflow-hidden'>
            <CanvasDesignTool
              canvasRef={canvasRef}
              contextRef={contextRef}
              marketNumRef={marketNumRef}
              lineRef={lineRef}
              setDataCollection={setDataCollection}
              dataCollection={dataCollection}
              drawConnectingLines={drawConnectingLines}
            />
          </div>
        </section>

        {/* data bar */}
        <section className='grid overflow-y-scroll max-w-[300px]'>
          <DesignDataBar
            dataCollection={dataCollection}
            setDataCollection={setDataCollection}
            lineRef={lineRef}
            clearDataPoints={clearDataPoints}
          />
        </section>
      </main>
    </div>
  );
}

export default DesignPage;
