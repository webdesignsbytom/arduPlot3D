import React, { useContext, useEffect, useRef, useState } from 'react';
// Api
import client from '../../api/client';
// Components
import Navbar from '../../components/nav/Navbar';
import CanvasDesignTool from '../../components/canvas/CanvasDesignTool';
import ConsentAlert from '../../components/utils/ConsentAlert';
import TapSettingsModal from '../../components/modals/TapSettingsModal';
import MovementSettingsModal from '../../components/modals/MovementSettingsModal';
import DragSettingsModal from '../../components/modals/DragSettingsModal';
import UploadVideoModal from '../../components/modals/UploadVideoModal';
import AddLoopToSimulationModal from '../../components/modals/AddLoopToSimulationModal';
import DeviceSelectModal from '../../components/modals/DeviceSelectModal';
import TimeoutSettingsModal from '../../components/modals/TimeoutSettingsModal';
import SimulationDataToobar from '../../components/toolbars/SimulationDataToobar';
import SimulationFunctionsToolbar from '../../components/toolbars/SimulationFunctionsToolbar';
import SimulationPageTopToolBar from '../../components/toolbars/SimulationPageTopToolBar';
import SaveAsModal from '../../components/modals/SaveAsModal';
// Context
import { ToggleContext } from '../../context/ToggleContext';
import { SimulationContext } from '../../context/SimulationContext';
// Configuration modal
import { confirmationModalMessages } from '../../utils/design/ConfrimMessage';

function SimulationDesignPage() {
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
    setDisplaySimOrLoop,
    simulationToolSelected,
    setSimulationToolSelected,
    numberOfFingerTapping,
    setNumberOfFingerTapping,
    speedOfFingerMoving,
    setSpeedOfFingerMoving,
    tapSettingsModalOpen,
    setTapSettingsModalOpen,
    movementSettingsModalOpen,
    setMovementSettingsModalOpen,
    speedOfArmMoving,
    setSpeedOfArmMoving,
    addCreateLoopModalOpen,
    setAddCreateLoopModalOpen,
    timeoutModalOpen,
    setTimeoutModalOpen,
    timeoutLength,
    setTimeoutLength,
    timeoutUnitSelected,
    setTimeoutUnitSelected,
    dragSettingsModalOpen,
    setDragSettingsModalOpen,
    speedOfDraggingArmMoving,
    setSpeedOfDraggingArmMoving,
    clearAllDataPointsFromSimulation,
    contextRef,
    positionOfMouseAndCanvasVisible,
    setpositionOfMouseAndCanvasVisible,
  } = useContext(SimulationContext);

  // Video modal
  const [uploadVideoModalOpen, setuploadVideoModalOpen] = useState(false);

  // Popup modals
  const [consentMessageVisible, setConsentMessageVisible] = useState('');
  const [consentMessage, setConsentMessage] = useState('');
  const [consentFunction, setConsentFunction] = useState('');

  // Device selection
  const [deviceSelectionModalOpen, setDeviceSelectionModalOpen] =
    useState(false);

  // Save
  const [saveAsModalOpen, setSaveAsModalOpen] = useState(false);

  useEffect(() => {
    setActiveNav('/design');
  }, []);

  const clearAllDataPoints = () => {
    setConsentMessage(confirmationModalMessages[0]);
    setConsentMessageVisible(true);
    setConsentFunction('clearAllDataPoints');
  };

  const runConsentFunction = () => {
    switch (consentFunction) {
      case 'clearAllDataPoints':
        clearAllDataPointsFromSimulation();
        break;
      default:
        console.log('No matching action found');
    }

    setConsentMessageVisible('');
    setConsentMessage('');
  };

  const resetSimulationToStartingPoint = () => {};

  // const drawConnectingLines = () => {
  //   // add to array of points
  //   const tempStore = lineRef.current;
  //   lineRef.current = tempStore;

  //   if (tempStore.length > 2) {
  //     // Draw line from start to finish
  //     let start = tempStore[0];
  //     let finish = tempStore[tempStore.length - 1];
  //     console.log('start.', start);
  //     console.log('finsi', finish);

  //     contextRef.current.beginPath();
  //     contextRef.current.moveTo(start.xPos, start.yPos);
  //     contextRef.current.lineTo(finish.xPos, finish.yPos);
  //     contextRef.current.stroke();

  //     let previousRef = start;

  //     for (let index = 1; index < tempStore.length; index++) {
  //       const element = tempStore[index];
  //       console.log('element', element);

  //       contextRef.current.beginPath();
  //       contextRef.current.moveTo(previousRef.xPos, previousRef.yPos);
  //       contextRef.current.lineTo(element.xPos, element.yPos);
  //       contextRef.current.stroke();
  //       previousRef = element;
  //     }
  //   }
  // };

  // Create new simulation loop of commands
  const createNewSimulationLoop = () => {
    setIsCreatingNewLoop(true);
    setDisplaySimOrLoop('loop');
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

  // Display Landscape
  const setSimulationLandScape = () => {
    setIsLandscapeMode(true);
  };
  // Display portrait
  const setSimulationPortrait = () => {
    setIsLandscapeMode(false);
  };

  // Display position on canvas
  const toggleMousePositionDisplay = () => {
    setpositionOfMouseAndCanvasVisible(!positionOfMouseAndCanvasVisible);
  };

  // Select tap tool
  const selectTapTool = () => {
    setSimulationToolSelected('tap');
  };

  // Select tap and move tool
  const selectTapAndMoveTool = () => {
    setSimulationToolSelected('move_tap');
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
    closeAllModalsMaster();
    setConsentMessage(confirmationModalMessages[1]);
    setConsentMessageVisible(true);
  };
  const confirmNewSimulation = () => {
    setConsentMessage('');
    setConsentMessageVisible(false);
    //clearAllDataPointsFromSimulation();
  };
  const cancelNewSimulation = () => {
    setConsentMessage('');
    setConsentMessageVisible(false);
  };

  // Save simulation
  const saveCurrentSimulationFile = () => {
    client
      .post('/simulations/save-simulation')
      .then((res) => {
        console.log('RES', res.data.data.newSimulation);
      })

      .catch((err) => {
        console.error('Unable to create simulation', err);
      });
  };
  // Open save as
  const openSaveAsModal = () => {
    closeAllModalsMaster();
    setSaveAsModalOpen(true); //
  };
  // Close save as
  const closeSaveAsModal = () => {
    setSaveAsModalOpen(false); //
  };
  // Save as
  const saveAsNewFile = () => {
    setSaveAsModalOpen(false); //
  };

  // Open timeout settings modal
  const openTimeoutSettingsModal = () => {
    closeAllModalsMaster();
    setTimeoutModalOpen(true);
  };
  const closeTimeoutSettingsModal = () => {
    setTimeoutModalOpen(false);
  };

  // Open drag settings modal
  const openDragSettingsModal = () => {
    closeAllModalsMaster();
    setDragSettingsModalOpen(true);
  };
  const closeDragSettingsModal = () => {
    setDragSettingsModalOpen(false);
  };

  // Open movement settings modal
  const openMovementSettingsModal = () => {
    closeAllModalsMaster();
    setMovementSettingsModalOpen(true);
  };
  const closeMovementSettingsModal = () => {
    setMovementSettingsModalOpen(false);
  };

  // Open tap settings modal
  const openTapSettingsModal = () => {
    closeAllModalsMaster();
    setTapSettingsModalOpen(true);
  };
  const closeTapSettingsModal = () => {
    setTapSettingsModalOpen(false);
  };

  // Open tap settings modal
  const openDeviceSelectModal = () => {
    closeAllModalsMaster();
    setDeviceSelectionModalOpen(true);
  };
  const closeDeviceSelectModal = () => {
    setDeviceSelectionModalOpen(false);
  };

  // Close all modals master
  const closeAllModalsMaster = () => {
    setDeviceSelectionModalOpen(false);
    setTapSettingsModalOpen(false);
    setMovementSettingsModalOpen(false);
    setDragSettingsModalOpen(false);
    setTimeoutModalOpen(false);
    closeUploadVideoModal(false);
    setSaveAsModalOpen(false); //
  };

  const openUploadVideoModal = () => {
    closeAllModalsMaster();
    setuploadVideoModalOpen(true);
  };
  const closeUploadVideoModal = () => {
    setuploadVideoModalOpen(false);
  };

  // Download simulation for sd card
  const downloadAsTextFile = () => {
    // const plotterCommands = translateToPlotterLanguage();
    // const blob = new Blob([plotterCommands], { type: 'text/plain' });
    // const href = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = href;
    // link.download = 'drawingCommands.txt'; // Name of the file to download
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(href);
  };

  // Assuming lineRef.current contains an array of objects with x and y coordinates
  // Example: [{xPos: 10, yPos: 20}, {xPos: 30, yPos: 40}]
  // Function to translate drawing commands to ASCII/Plotter language

  // const translateToPlotterLanguage = () => {
  //   let commands = '';
  //   lineRef.current.forEach((point, index) => {
  //     if (index === 0) {
  //       commands += `MOVE ${point.xPos} ${point.yPos};\n`; // Move to start without drawing
  //     } else {
  //       commands += `DRAW ${point.xPos} ${point.yPos};\n`; // Draw line to next point
  //     }
  //   });
  //   return commands;
  // };

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

      {/* Main */}
      <main className='grid h-full grid-cols-a1a overflow-hidden'>
        {/* Functions bar */}
        <section className='grid max-w-[200px]'>
          <SimulationFunctionsToolbar
            runSimulation={runSimulation}
            stopSimulation={stopSimulation}
            resetSimulationToStartingPoint={resetSimulationToStartingPoint}
            createNewSimulationFile={createNewSimulationFile}
            saveCurrentSimulationFile={saveCurrentSimulationFile}
            openSaveAsModal={openSaveAsModal}
            openTimeoutSettingsModal={openTimeoutSettingsModal}
            openTapSettingsModal={openTapSettingsModal}
            openMovementSettingsModal={openMovementSettingsModal}
            openDragSettingsModal={openDragSettingsModal}
            openDeviceSelectModal={openDeviceSelectModal}
            openUploadVideoModal={openUploadVideoModal}
          />
        </section>

        {/* canvas */}
        <section className='grid grid-rows-reg gap-2 p-2 overflow-hidden'>
          {/* Top tool bar menu */}
          <SimulationPageTopToolBar
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
            toggleMousePositionDisplay={toggleMousePositionDisplay}
            positionOfMouseAndCanvasVisible={positionOfMouseAndCanvasVisible}
          />

          {/* CANVAS */}
          <div className='bg-white h-full grid outline-black outline outline-2 overflow-hidden'>
            <CanvasDesignTool
              positionOfMouseAndCanvasVisible={positionOfMouseAndCanvasVisible}
            />
          </div>
        </section>

        {/* data bar */}
        <section className='grid overflow-hidden h-full max-w-[300px]'>
          <SimulationDataToobar />
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
        <TimeoutSettingsModal
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
        <DeviceSelectModal
          closeDeviceSelectModal={closeDeviceSelectModal}
        />
      )}

      {/* Device selection */}
      {saveAsModalOpen && (
        <SaveAsModal
          saveAsNewFile={saveAsNewFile}
          closeSaveAsModal={closeSaveAsModal}
        />
      )}

      {/* Upload video */}
      {uploadVideoModalOpen && (
        <UploadVideoModal closeUploadVideoModal={closeUploadVideoModal} />
      )}

      {/* Loop selection */}
      {addCreateLoopModalOpen && <AddLoopToSimulationModal />}
    </div>
  );
}

export default SimulationDesignPage;
