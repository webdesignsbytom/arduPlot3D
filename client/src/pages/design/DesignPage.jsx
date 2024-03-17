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
import TapSettingsModal from '../../components/design/TapSettingsModal';
import MovementSettingsModal from '../../components/design/MovementSettingsModal';
import DragSettingsModal from '../../components/design/DragSettingsModal';
import DeviceSelectContainer from '../../components/design/DeviceSelectContainer';

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

  // Tools
  const [simulationToolSelected, setSimulationToolSelected] = useState('tap');

  // Timeout
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutLength, setTimeoutLength] = useState(5000);
  const [timeoutUnitSelected, setTimeoutUnitSelected] = useState(
    timeoutUnitTypesAvailable[0]
  );

  // Tap settings
  const [numberOfFingerTapping, setNumberOfFingerTapping] = useState(1);
  const [speedOfFingerMoving, setSpeedOfFingerMoving] = useState(10);
  const [tapSettingsModalOpen, setTapSettingsModalOpen] = useState(false);

  // Drag settings
  const [dragSettingsModalOpen, setDragSettingsModalOpen] = useState(false);
  const [speedOfDraggingArmMoving, setSpeedOfDraggingArmMoving] = useState(10);

  // Movement settings
  const [movementSettingsModalOpen, setMovementSettingsModalOpen] =
    useState(false);
  const [speedOfArmMoving, setSpeedOfArmMoving] = useState(10);

  // Popup modals
  const [consentMessageVisible, setConsentMessageVisible] = useState('');
  const [consentMessage, setConsentMessage] = useState('');
  const [consentFunction, setConsentFunction] = useState('');

  // Device selection
  const [deviceSelectionModalOpen, setDeviceSelectionModalOpen] =
    useState(false);

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

  const clearAllDataPoints = () => {
    setConsentMessage(
      'Are you sure you want to clear ALL data points from memory?'
    );
    setConsentMessageVisible(true);
    setConsentFunction('clearAllDataPoints');
  };

  const runConsentFunction = () => {
    console.log('AAAA');
    switch (consentFunction) {
      case 'clearAllDataPoints':
        // Add your code here that should run when consentFunction is 'clearAllDataPoints'
        clearDataPoints();
        console.log('Clearing all data points');
        break;
      // You can add more cases here for different values of consentFunction
      default:
        // This code runs if none of the cases match the consentFunction value
        console.log('No matching action found');
    }

    setConsentMessageVisible('');
    setConsentMessage('');
  };

  const resetSimulationToStartingPoint = () => {
    console.log('RESET SIM TO STARTING');
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

  //
  const runSimulation = () => {
    setSimulationIsRunning(true);
  };
  //
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

  // Select tap tool
  const selectTapTool = () => {
    setSimulationToolSelected('tap');
  };

  // Select tap and move tool
  const selectTapAndMoveTool = () => {
    setSimulationToolSelected('tap_move');
  };

  // Select drag tool
  const selectDragTool = () => {
    setSimulationToolSelected('drag');
  };

  // Select timeout tool
  const selectTimeoutTool = () => {
    setSimulationToolSelected('timeout');
  };

  // Select timeout tool
  const selectMoveTool = () => {
    setSimulationToolSelected('move');
  };

  // Create new simulation
  const createNewSimulationFile = () => {
    console.log('NEW SIMULATION FILE');
    closeAllModalsMaster();
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
    closeAllModalsMaster();
    console.log('SAVE AS SIMULATION FILE');
    setTimeoutModalOpen(true);
  };
  const closeTimeoutSettingsModal = () => {
    console.log('SAVE AS SIMULATION FILE');
    setTimeoutModalOpen(false);
  };

  // Open drag settings modal
  const openDragSettingsModal = () => {
    closeAllModalsMaster();
    console.log('OPEN TAP SETTINGS MODAL');
    setDragSettingsModalOpen(true);
  };
  const closeDragSettingsModal = () => {
    console.log('CLOSE TAP SETTINGS MODAL');
    setDragSettingsModalOpen(false);
  };

  // Open movement settings modal
  const openMovementSettingsModal = () => {
    closeAllModalsMaster();
    console.log('OPEN TAP SETTINGS MODAL');
    setMovementSettingsModalOpen(true);
  };
  const closeMovementSettingsModal = () => {
    console.log('CLOSE TAP SETTINGS MODAL');
    setMovementSettingsModalOpen(false);
  };

  // Open tap settings modal
  const openTapSettingsModal = () => {
    closeAllModalsMaster();
    console.log('OPEN TAP SETTINGS MODAL');
    setTapSettingsModalOpen(true);
  };
  const closeTapSettingsModal = () => {
    console.log('CLOSE TAP SETTINGS MODAL');
    setTapSettingsModalOpen(false);
  };

  // Open tap settings modal
  const openDeviceSelectModal = () => {
    console.log('OPEN DEVICESELECTS MODAL');
    closeAllModalsMaster();
    setDeviceSelectionModalOpen(true);
  };
  const closeDeviceSelectModal = () => {
    console.log('CLOSE TAP SETTINGS MODAL');
    setDeviceSelectionModalOpen(false);
  };

  // Close all modals master
  const closeAllModalsMaster = () => {
    setDeviceSelectionModalOpen(false);
    setTapSettingsModalOpen(false);
    setMovementSettingsModalOpen(false);
    setDragSettingsModalOpen(false);
    setTimeoutModalOpen(false);
  }

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
            runSimulation={runSimulation}
            stopSimulation={stopSimulation}
            resetSimulationToStartingPoint={resetSimulationToStartingPoint}
            createNewSimulationFile={createNewSimulationFile}
            saveCurrentSimulationFile={saveCurrentSimulationFile}
            saveAsCurrentSimulationFile={saveAsCurrentSimulationFile}
            openTimeoutSettingsModal={openTimeoutSettingsModal}
            openTapSettingsModal={openTapSettingsModal}
            openMovementSettingsModal={openMovementSettingsModal}
            openDragSettingsModal={openDragSettingsModal}
            openDeviceSelectModal={openDeviceSelectModal}
          />
        </section>

        {/* canvas */}
        <section className='grid grid-rows-reg gap-2 p-2 overflow-hidden'>
          {/* Top tool bar menu */}
          <DesignTopToolBar
            drawConnectingLines={drawConnectingLines}
            clearAllDataPoints={clearAllDataPoints}
            createNewSimulationLoop={createNewSimulationLoop}
            saveNewSimulationLoop={saveNewSimulationLoop}
            hideCanvasRulers={hideCanvasRulers}
            displayCanvasRulers={displayCanvasRulers}
            setSimulationLandScape={setSimulationLandScape}
            setSimulationPortrait={setSimulationPortrait}
            timeoutLength={timeoutLength}
            timeoutUnitSelected={timeoutUnitSelected}
            numberOfFingerTapping={numberOfFingerTapping}
            selectTapTool={selectTapTool}
            selectTapAndMoveTool={selectTapAndMoveTool}
            selectDragTool={selectDragTool}
            selectTimeoutTool={selectTimeoutTool}
            selectMoveTool={selectMoveTool}
            simulationToolSelected={simulationToolSelected}
            speedOfArmMoving={speedOfArmMoving}
            speedOfDraggingArmMoving={speedOfDraggingArmMoving}
            speedOfFingerMoving={speedOfFingerMoving}
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
          confirmFunction={runConsentFunction}
        />
      )}

      {/* Timeout */}
      {timeoutModalOpen && (
        <TimeoutSettingsContainer
          timeoutLength={timeoutLength}
          setTimeoutLength={setTimeoutLength}
          timeoutUnitSelected={timeoutUnitSelected}
          setTimeoutUnitSelected={setTimeoutUnitSelected}
          closeTimeoutSettingsModal={closeTimeoutSettingsModal}
        />
      )}

      {/* Drag */}
      {dragSettingsModalOpen && (
        <DragSettingsModal
          speedOfDraggingArmMoving={speedOfDraggingArmMoving}
          setSpeedOfDraggingArmMoving={setSpeedOfDraggingArmMoving}
          closeDragSettingsModal={closeDragSettingsModal}
        />
      )}

      {/* Movement */}
      {movementSettingsModalOpen && (
        <MovementSettingsModal
          speedOfArmMoving={speedOfArmMoving}
          setSpeedOfArmMoving={setSpeedOfArmMoving}
          closeMovementSettingsModal={closeMovementSettingsModal}
        />
      )}

      {/* Tap settings */}
      {tapSettingsModalOpen && (
        <TapSettingsModal
          numberOfFingerTapping={numberOfFingerTapping}
          setNumberOfFingerTapping={setNumberOfFingerTapping}
          speedOfFingerMoving={speedOfFingerMoving}
          setSpeedOfFingerMoving={setSpeedOfFingerMoving}
          closeTapSettingsModal={closeTapSettingsModal}
        />
      )}

      {/* Device selection */}
      {deviceSelectionModalOpen && (
        <DeviceSelectContainer
          closeDeviceSelectModal={closeDeviceSelectModal}
        />
      )}
    </div>
  );
}

export default DesignPage;
