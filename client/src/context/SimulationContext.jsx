import React, { useRef } from 'react';
import { useState } from 'react';
// Device data
import { availableDevicesForSimulations } from '../utils/design/AvailableDevices';
import {
  initDragMovementSpeed,
  initxyMovementSpeed,
  initzMovementSpeed,
} from '../utils/design/SpeedUtils';
import { timeoutUnitTypesAvailable } from '../utils/design/DesignUtils';
// Temp data
import {
  blankLoopObject,
  blankSimulationObject,
  tempDesignData,
} from '../utils/design/TempData';
import { availablePointsToDisplayData } from '../utils/design/Constants';

export const SimulationContext = React.createContext();

const SimulationContextProvider = ({ children }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const dataPointMarkerRef = useRef(1);
  const emptyRef = useRef([]);

  const [dataCollection, setDataCollection] = useState([]);
  const [loopDataPoints, setLoopDataPoints] = useState([]);
  const [simulationDataPoints, setSimulationDataPoints] = useState([]);

  // Simulation data and list of loops for simulation
  const [simulationData, setSimulationData] = useState(tempDesignData);

  // Simulation loops data
  const [simulationLoopData, setSimulationLoopData] = useState(blankLoopObject);

  // Design
  const [rulersVisible, setRulersVisible] = useState(true);
  const [isPxOrMmDimensions, setIsPxOrMmDimensions] = useState(false); // False = px
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [isLandscapeMode, setIsLandscapeMode] = useState(true); // Starts landscape mode

  // Loops
  const [isCreatingEditingLoop, setIsCreatingEditingLoop] = useState(false);
  const [loopToDeleteIndex, setLoopToDeleteIndex] = useState(null);
  const [loopDataBeingEdited, setLoopDataBeingEdited] =
    useState(blankLoopObject);

  // Tools
  const [simulationToolSelected, setSimulationToolSelected] = useState('tap');

  // Device
  const [selectedDevice, setSelectedDevice] = useState(
    availableDevicesForSimulations[0]
  );

  // Display
  const [displaySimOrLoop, setDisplaySimOrLoop] = useState('simulation'); // simulation || loop
  const [numberOfDataPointsToDisplay, setNumberOfDataPointsToDisplay] =
    useState(availablePointsToDisplayData[0]);

  // Tap settings
  const [numberOfFingerTapping, setNumberOfFingerTapping] = useState(1);
  const [speedOfFingerMoving, setSpeedOfFingerMoving] =
    useState(initzMovementSpeed);
  const [tapSettingsModalOpen, setTapSettingsModalOpen] = useState(false);

  // Movement settings
  const [movementSettingsModalOpen, setMovementSettingsModalOpen] =
    useState(false);
  const [speedOfArmMoving, setSpeedOfArmMoving] = useState(initxyMovementSpeed);

  // Timeout
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutLength, setTimeoutLength] = useState(5000);
  const [timeoutUnitSelected, setTimeoutUnitSelected] = useState(
    timeoutUnitTypesAvailable[0]
  );

  // Drag settings
  const [dragSettingsModalOpen, setDragSettingsModalOpen] = useState(false);
  const [speedOfDraggingArmMoving, setSpeedOfDraggingArmMoving] = useState(
    initDragMovementSpeed
  );

  // Add/Create loop modal
  const [addCreateLoopModalOpen, setAddCreateLoopModalOpen] = useState(false);

  // Data points for loop
  const [displayLoopDataPoints, setdisplayLoopDataPoints] = useState(false);
  const [displayLoopDataPointsIndex, setdisplayLoopDataPointsIndex] =
    useState(0);
  const [arrayOfLoopData, setArrayOfLoopData] = useState([]);

  // Video files
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Mouse Position
  const [positionOfMouseAndCanvasVisible, setpositionOfMouseAndCanvasVisible] =
    useState(true);

  // Popup modals
  const [consentMessageVisible, setConsentMessageVisible] = useState('');
  const [consentMessage, setConsentMessage] = useState('');
  const [consentFunction, setConsentFunction] = useState('');

  const openAndDisplayLoop = (index) => {
    if (displayLoopDataPoints && index === displayLoopDataPointsIndex) {
      setdisplayLoopDataPoints(false);
      return;
    }

    setdisplayLoopDataPoints(true);
    setdisplayLoopDataPointsIndex(index);
  };

  const handleDataPointChange = () => {};

  const clearAllDataPointsFromSimulation = () => {
    const currentFileName = simulationData.simulationTitle;
    const currentLoopData = simulationData.simulationLoops;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    dataPointMarkerRef.current = 1;

    setSimulationData({
      ...blankSimulationObject,
      simulationTitle: currentFileName,
      simulationLoops: currentLoopData,
    });
  };

  const deleteDataPointFromSimulation = (event, dataIndex) => {
    event.preventDefault();
    console.log('AAAAAAAAAAAAAAAA');
    // Assuming you meant to use mainSimulationDataPoints
    const updatedDataPoints = [
      ...simulationData.mainSimulationDataPoints.slice(0, dataIndex),
      ...simulationData.mainSimulationDataPoints.slice(dataIndex + 1),
    ];

    setSimulationData({
      ...simulationData,
      mainSimulationDataPoints: updatedDataPoints,
    });
  };

  const deleteDataPointFromLoop = (event, dataIndex) => {
    event.preventDefault();

    const updatedDataPoints = [
      ...loopDataBeingEdited.mainSimulationLoopDataPoints.slice(0, dataIndex),
      ...loopDataBeingEdited.mainSimulationLoopDataPoints.slice(dataIndex + 1),
    ];
    setLoopDataBeingEdited({
      ...loopDataBeingEdited,
      mainSimulationLoopDataPoints: updatedDataPoints,
    });
    console.log('LLLL dataIndex', dataIndex);
    console.log('LLLLLLLLL', loopDataBeingEdited);
  };

  const createNewLoop = (event) => {
    event.preventDefault(); // This will prevent the default action

    // Determine the new loop's index based on the current array length
    const newLoopIndex = simulationData.simulationLoops.length;

    // Construct the new loop name by adding 1 to the new loop's index
    const newLoopName = `Loop ${newLoopIndex + 1}`;

    // Assuming simulationLoopData is structured correctly but needs a name update
    let newLoop = {
      ...simulationLoopData,
      loopTitle: newLoopName, // Update the loop title with the new name
    };

    setAddCreateLoopModalOpen(false);
    setIsCreatingEditingLoop(true);

    // Use the spread operator to copy existing loops and add the new loop
    setSimulationData({
      ...simulationData,
      simulationLoops: [...simulationData.simulationLoops, newLoop],
    });
  };

  const setPointsToDisplaySettings = (event) => {
    event.preventDefault();

    // Find the current index of numberOfDataPointsToDisplay
    const currentIndex = availablePointsToDisplayData.indexOf(
      numberOfDataPointsToDisplay
    );
    // Calculate the next index. If we're at the end of the array, loop back to 0
    const nextIndex = (currentIndex + 1) % availablePointsToDisplayData.length;
    // Update the state to the next item
    setNumberOfDataPointsToDisplay(availablePointsToDisplayData[nextIndex]);
  };

  const deleteSavedLoopFromSimulation = (event, index) => {
    event.preventDefault();

    setLoopToDeleteIndex(index)
    setConsentMessageVisible(true);
    setConsentMessage('Are you sure you want to permanently delete this loop?');
    setConsentFunction('deleteSavedLoop');
  };

  const deleteSavedLoop = () => {
    // Create a new array excluding the loop at the specified index
    const updatedLoops = simulationData.simulationLoops.filter(
      (_, loopIndex) => loopIndex !== loopToDeleteIndex
    );

    // Update the state with the new array
    setSimulationData({
      ...simulationData,
      simulationLoops: updatedLoops,
    });
  };

  const runConsentFunction = () => {
    switch (consentFunction) {
      case 'clearAllDataPoints':
        clearAllDataPointsFromSimulation();
        break;
      case 'deleteSavedLoop':
        deleteSavedLoop();
        break;
      default:
        console.log('No matching action found');
    }

    setConsentMessageVisible('');
    setConsentMessage('');
  };
  return (
    <SimulationContext.Provider
      value={{
        // Ref
        canvasRef,
        contextRef,
        dataPointMarkerRef,
        emptyRef,
        // Main simulation
        simulationData,
        setSimulationData,
        simulationLoopData,
        setSimulationLoopData,
        // Settings
        rulersVisible,
        setRulersVisible,
        simulationIsRunning,
        setSimulationIsRunning,
        isLandscapeMode,
        setIsLandscapeMode,
        selectedDevice,
        setSelectedDevice,
        displaySimOrLoop,
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
        displayLoopDataPoints,
        setdisplayLoopDataPoints,
        displayLoopDataPointsIndex,
        setdisplayLoopDataPointsIndex,
        arrayOfLoopData,
        setArrayOfLoopData,
        openAndDisplayLoop,
        selectedVideo,
        setSelectedVideo,
        isCreatingEditingLoop,
        setIsCreatingEditingLoop,
        loopDataBeingEdited,
        setLoopDataBeingEdited,
        handleDataPointChange,
        clearAllDataPointsFromSimulation,
        dataCollection,
        setDataCollection,
        loopDataPoints,
        setLoopDataPoints,
        simulationDataPoints,
        setSimulationDataPoints,
        isPxOrMmDimensions,
        setIsPxOrMmDimensions,
        positionOfMouseAndCanvasVisible,
        setpositionOfMouseAndCanvasVisible,
        createNewLoop,
        numberOfDataPointsToDisplay,
        setNumberOfDataPointsToDisplay,
        setPointsToDisplaySettings,
        deleteDataPointFromSimulation,
        deleteDataPointFromLoop,
        deleteSavedLoopFromSimulation,
        consentMessageVisible,
        setConsentMessageVisible,
        consentMessage,
        setConsentMessage,
        consentFunction,
        setConsentFunction,
        runConsentFunction,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationContextProvider;
