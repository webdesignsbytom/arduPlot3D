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
import ConsentAlert from '../../components/utils/ConsentAlert';
import { timeoutUnitTypesAvailable } from '../../utils/design/DesignUtils';
import TimeoutSettingsContainer from '../../components/design/TimeoutSettingsContainer';

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
  const [loopDataPoints, setLoopDataPoints] = useState([]);
  const [simulationDataPoints, setSimulationDataPoints] = useState([]);

  // Timeout
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutLength, setTimeoutLength] = useState(5000);
  const [timeoutUnitSelected, setTimeoutUnitSelected] = useState(
    timeoutUnitTypesAvailable[0]
  );

  // Popup modals
  const [consentMessageVisible, setConsentMessageVisible] = useState('');
  const [consentMessage, setConsentMessage] = useState('');

  useEffect(() => {
    setActiveNav('/design');
  }, []);

  const clearDataPoints = () => {
    lineRef.current = emptyRef.current;
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    marketNumRef.current = 1;
    setDataCollection([]);
    setSimulationDataPoints([]);
    setLoopDataPoints([]);
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

  // Create new simulation
  const createNewSimulationFile = () => {
    console.log('NEW SIMULATION FILE');
    setConsentMessage('Any old data will be lost.');
    setConsentMessageVisible(true);
  };
  const confirmNewSimulation = () => {
    setConsentMessage('');
    setConsentMessageVisible(false);
    clearDataPoints();
  };
  const cancelNewSimulation = () => {
    setConsentMessage('');
    setConsentMessageVisible(false);
  };

  // Save simulation
  const saveCurrentSimulationFile = () => {
    console.log('SAVE SIMULATION FILE');
  };
  // Create new simulation
  const saveAsCurrentSimulationFile = () => {
    console.log('SAVE AS SIMULATION FILE');
  };

  // Open timeout settings modal
  const openTimeoutSettingsModal = () => {
    console.log('SAVE AS SIMULATION FILE');
    setTimeoutModalOpen(true);
  };

  // Download simulation for sd card
  const downloadAsTextFile = () => {
    const plotterCommands = translateToPlotterLanguage();
    const blob = new Blob([plotterCommands], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'drawingCommands.txt'; // Name of the file to download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  // Assuming lineRef.current contains an array of objects with x and y coordinates
  // Example: [{xpos: 10, ypos: 20}, {xpos: 30, ypos: 40}]
  // Function to translate drawing commands to ASCII/Plotter language
  const translateToPlotterLanguage = () => {
    let commands = '';
    lineRef.current.forEach((point, index) => {
      if (index === 0) {
        commands += `MOVE ${point.xpos} ${point.ypos};\n`; // Move to start without drawing
      } else {
        commands += `DRAW ${point.xpos} ${point.ypos};\n`; // Draw line to next point
      }
    });
    return commands;
  };

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

      {/* Main */}
      <main className='grid h-full grid-cols-a1a overflow-hidden'>
        {/* Functions bar */}
        <section className='grid max-w-[200px]'>
          <DesignFunctionsBar
            createNewSimulationFile={createNewSimulationFile}
            saveCurrentSimulationFile={saveCurrentSimulationFile}
            saveAsCurrentSimulationFile={saveAsCurrentSimulationFile}
            openTimeoutSettingsModal={openTimeoutSettingsModal}
          />
        </section>

        {/* canvas */}
        <section className='grid grid-rows-reg gap-2 p-2 overflow-hidden'>
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
            timeoutLength={timeoutLength}
            timeoutUnitSelected={timeoutUnitSelected}
          />

          {/* CANVAS */}
          <div className='bg-white h-full grid outline-black outline outline-2 overflow-hidden'>
            <CanvasDesignTool
              canvasRef={canvasRef}
              contextRef={contextRef}
              marketNumRef={marketNumRef}
              lineRef={lineRef}
              setDataCollection={setDataCollection}
              setSimulationDataPoints={setSimulationDataPoints}
              dataCollection={dataCollection}
              drawConnectingLines={drawConnectingLines}
            />
          </div>
        </section>

        {/* data bar */}
        <section className='grid overflow-hidden h-full max-w-[300px]'>
          <DesignDataBar
            loopDataPoints={loopDataPoints}
            simulationDataPoints={simulationDataPoints}
            setDataCollection={setDataCollection}
            lineRef={lineRef}
            clearDataPoints={clearDataPoints}
          />
        </section>
      </main>

      {/* Popup modals */}
      {consentMessageVisible && (
        <ConsentAlert
          consentMessage={consentMessage}
          cancalFunction={cancelNewSimulation}
          confirmFunction={confirmNewSimulation}
        />
      )}

      {/* Timeout */}
      {timeoutModalOpen && <TimeoutSettingsContainer />}
    </div>
  );
}

export default DesignPage;
