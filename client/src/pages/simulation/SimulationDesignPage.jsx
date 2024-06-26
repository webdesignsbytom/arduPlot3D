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
import CanvasSimulationTool from '../../components/canvas/CanvasSimulationTool';
// Context
import { ToggleContext } from '../../context/ToggleContext';
import { SimulationContext } from '../../context/SimulationContext';
import { UserContext } from '../../context/UserContext';
// Configuration modal
import { confirmationModalMessages } from '../../utils/design/ConfrimMessage';
import LoadSimulationModal from '../../components/modals/LoadSimulationModal';
import PublishSimulationModal from '../../components/modals/PublishSimulationModal';

function SimulationDesignPage() {
  const { setActiveNav } = useContext(ToggleContext);
  const { user } = useContext(UserContext);
  const {
    setIsCreatingNewLoop,
    setRulersVisible,
    simulationIsRunning,
    setSimulationIsRunning,
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
    positionOfMouseAndCanvasVisible,
    setpositionOfMouseAndCanvasVisible,
    consentMessageVisible,
    setConsentMessageVisible,
    consentMessage,
    setConsentMessage,
    setConsentFunction,
    simulationData,
  } = useContext(SimulationContext);

  // Video modal
  const [uploadVideoModalOpen, setuploadVideoModalOpen] = useState(false);

  // Device selection
  const [deviceSelectionModalOpen, setDeviceSelectionModalOpen] =
    useState(false);

  // Save
  const [saveAsModalOpen, setSaveAsModalOpen] = useState(false);

  // Load
  const [loadModalOpen, setLoadModalOpen] = useState(false);

  // Reset
  const [isResettingAnimation, setIsResettingAnimation] = useState(false);

  useEffect(() => {
    setActiveNav('/simulation');
  }, []);

  const clearAllDataPoints = () => {
    setConsentMessage(confirmationModalMessages[0]);
    setConsentMessageVisible(true);
    setConsentFunction('clearAllDataPoints');
  };

  const resetSimulationToStartingPoint = () => {
    setIsResettingAnimation(!isResettingAnimation);
  };

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

  // Run simulation
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
    console.log('USER', user.id);
    client
      .post(
        `/simulations/user/save-simulation/${user.id}`,
        simulationData,
        false
      )
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

  // Open load 
  const openLoadModal = () => {
    setLoadModalOpen(true); //
  };
  // Close load
  const closeLoadSimulationModal = () => {
    setLoadModalOpen(false); //
  };

  const [isSavingFile, setIsSavingFile] = useState(false);

  // Save as
  const saveAsNewFile = () => {
    setIsSavingFile(true);
    client
      .post(
        `/simulations/user/create-new-simulation/${user.id}`,
        simulationData,
        false
      )
      .then((res) => {
        console.log('res', res);
        setIsSavingFile(false);
      })

      .catch((err) => {
        console.error('Unable to save data', err);
        setIsSavingFile(false);
      });
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
    setIsPublishModalOpen(false);
    setSaveAsModalOpen(false); //
  };

  const openUploadVideoModal = () => {
    closeAllModalsMaster();
    setuploadVideoModalOpen(true);
  };
  const closeUploadVideoModal = () => {
    setuploadVideoModalOpen(false);
  };

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  const openPublishModal = () => {
    closeAllModalsMaster();
    setIsPublishModalOpen(true);
  };
  const closePublishModal = () => {
    setIsPublishModalOpen(false);
  };


  // Download simulation for sd card
  const downloadFileToMachine = () => {
    console.log('111111111111');
    const plotterCommands = translateToPlotterLanguage();
    const blob = new Blob([plotterCommands], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${simulationData.simulationTitle}.txt`; // Name of the file to download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  // Example: [{xPos: 10, yPos: 20}, {xPos: 30, yPos: 40}]
  // Function to translate drawing commands to ASCII/Plotter language

  function translateToPlotterLanguage() {
    console.log('222222222222');

    let commands = '';

    const formatPoint = (point) => {
      switch (point.dataType) {
        case 'tap':
        case 'move':
        case 'move_tap':
          return `${point.dataType.toUpperCase()} xPos: ${point.xPos}, yPos: ${
            point.yPos
          }, xySpeed: ${point.xySpeed}, zSpeed: ${point.zSpeed}, numFingers: ${
            point.numFingers
          }, timeLength: ${point.timeLength}\n`;
        case 'drag':
          return `${point.dataType.toUpperCase()} startxPos: ${
            point.startxPos
          }, startyPos: ${point.startyPos}, finishxPos: ${
            point.finishxPos
          }, finishyPos: ${point.finishyPos}, xySpeed: ${
            point.xySpeed
          }, zSpeed: ${point.zSpeed}, numFingers: ${
            point.numFingers
          }, timeLength: ${point.timeLength}\n`;
        case 'timeout':
          return `${point.dataType.toUpperCase()} timeoutLength: ${
            point.timeoutLength
          }\n`;
        default:
          return `Unknown DataType: ${point.dataType}\n`;
      }
    };

    // Translate main simulation data points
    simulationData.mainSimulationDataPoints.forEach((point) => {
      commands += formatPoint(point);
    });

    // Translate simulation loops
    // simulationData.simulationLoops.forEach(loop => {
    //   commands += `LOOP: ${loop.loopTitle}\n`;
    //   loop.mainSimulationLoopDataPoints.forEach(point => {
    //     commands += `  ${formatPoint(point)}`;
    //   });
    //   commands += `LOOP END: ${loop.loopTitle}, Time to Complete: ${loop.loopTimeToComplete}ms\n`;
    // });

    return commands;
  }

  const loadSimulationFile = () => {
    console.log('AAA');
  };

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
            downloadFileToMachine={downloadFileToMachine}
            saveAsNewFile={saveAsNewFile}
            openLoadModal={openLoadModal}
            openPublishModal={openPublishModal}
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
            {simulationIsRunning ? (
              <CanvasSimulationTool
                isResettingAnimation={isResettingAnimation}
              />
            ) : (
              <CanvasDesignTool
                positionOfMouseAndCanvasVisible={
                  positionOfMouseAndCanvasVisible
                }
              />
            )}
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
        <DeviceSelectModal closeDeviceSelectModal={closeDeviceSelectModal} />
      )}

      {/* Save  */}
      {saveAsModalOpen && (
        <SaveAsModal
          saveAsNewFile={saveAsNewFile}
          closeSaveAsModal={closeSaveAsModal}
        />
      )}

      {/* Load */}
      {loadModalOpen && (
        <LoadSimulationModal
          loadSimulationFile={loadSimulationFile}
          closeLoadSimulationModal={closeLoadSimulationModal}
        />
      )}

      {/* Upload video */}
      {uploadVideoModalOpen && (
        <UploadVideoModal closeUploadVideoModal={closeUploadVideoModal} />
      )}

      {/* Publish siulation */}
      {isPublishModalOpen && (
        <PublishSimulationModal closePublishModal={closePublishModal} />
      )}

      {/* Loop selection */}
      {addCreateLoopModalOpen && <AddLoopToSimulationModal />}
    </div>
  );
}

export default SimulationDesignPage;
