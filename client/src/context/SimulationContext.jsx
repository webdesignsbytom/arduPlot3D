import React, { useRef, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import {
  CREATE_NEW_SIMULATION_API,
  LOAD_SIMULATION_API,
  SAVE_SIMULATION_API,
} from '../utils/Constants';
// Context
import { useModalContext } from './ModalContext';
import { useUser } from '../context/UserContext';
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
// Simulation constants
import {
  availablePointsToDisplayData,
  CLEAR_ALL_DATAPOINT_FUNC,
  CREATE_NEW_SIM_FUNC,
  DELETE_LOOP_FUNC,
  DRAG_FUNCTION,
  MOVE_FUNCTION,
  MOVE_TAP_FUNCTION,
  TAP_FUNCTION,
  TIMEOUT_FUNCTION,
} from '../utils/design/Constants';
// Utils
import { downloadFileToMachine } from '../utils/simulation/SimulationUtils';
// Consent messages
import {
  ConfirmClearAllDataPoints,
  ConfirmDeleteLoop,
} from '../utils/design/ConfrimMessages';

export const SimulationContext = React.createContext();

const SimulationContextProvider = ({ children }) => {
  const {
    handleCloseLoopModal,
    handleCreateConsentModal,
    handleSetBlankConsentMessage,
    handleCloseAllModalsMaster,
  } = useModalContext();

  const { user } = useUser();

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const dataPointMarkerRef = useRef(1);
  const emptyRef = useRef([]);

  // Page Menus
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(true);
  const [simulationDataIsOpen, setSimulationDataIsOpen] = useState(true);

  const [isSavingFile, setIsSavingFile] = useState(false);

  const [dataCollection, setDataCollection] = useState([]);
  const [loopDataPoints, setLoopDataPoints] = useState([]);
  const [simulationDataPoints, setSimulationDataPoints] = useState([]);
  // Simulation data and list of loops for simulation
  const [simulationData, setSimulationData] = useState(tempDesignData);
  const [simulationDataId, setSimulationDataId] = useState(1);

  console.log('>> SimulationData', simulationData);

  // Simulation loops data
  const [simulationLoopData, setSimulationLoopData] = useState(blankLoopObject);

  // Design
  const [rulesAndDataVisible, setRulesAndDataVisible] = useState(true);
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
  // Reset
  const [isResettingAnimation, setIsResettingAnimation] = useState(false);
  // Display
  const [displaySimOrLoop, setDisplaySimOrLoop] = useState('simulation'); // simulation || loop
  const [numberOfDataPointsToDisplay, setNumberOfDataPointsToDisplay] =
    useState(availablePointsToDisplayData[0]);

  // Tap settings
  const [numberOfFingerTapping, setNumberOfFingerTapping] = useState(1);
  const [speedOfFingerMoving, setSpeedOfFingerMoving] =
    useState(initzMovementSpeed);

  // Movement settings

  const [speedOfArmMoving, setSpeedOfArmMoving] = useState(initxyMovementSpeed);

  // Timeout

  const [timeoutLength, setTimeoutLength] = useState(5000);
  const [timeoutUnitSelected, setTimeoutUnitSelected] = useState(
    timeoutUnitTypesAvailable[0]
  );

  // Drag settings
  const [speedOfDraggingArmMoving, setSpeedOfDraggingArmMoving] = useState(
    initDragMovementSpeed
  );

  // Add/Create loop modal

  // Data points for loop
  const [displayLoopDataPoints, setDisplayLoopDataPoints] = useState(false);
  const [displayLoopDataPointsIndex, setDisplayLoopDataPointsIndex] =
    useState(0);
  const [arrayOfLoopData, setArrayOfLoopData] = useState([]);

  // Video files
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Mouse Position
  const [positionOfMouseAndCanvasVisible, setpositionOfMouseAndCanvasVisible] =
    useState(true);

  const changeNumberOfTappingFinger = (numFingers) => {
    setNumberOfFingerTapping(numFingers);
  };

  // Run simulation
  const runSimulation = () => {
    handleCloseAllModalsMaster();
    setSimulationIsRunning(true);
  };
  //
  const stopSimulation = () => {
    setSimulationIsRunning(false);
  };

  // Save new or edited loop
  const saveLoopPerminently = () => {
    const updatedLoop = loopDataBeingEdited;
    const indexToReplace = displayLoopDataPointsIndex;

    const newSimulationLoops = simulationData.simulationLoops.map(
      (loop, index) => {
        if (index === indexToReplace) {
          return updatedLoop; // Replace the loop at this index with the updated loop
        } else {
          return loop; // Otherwise, keep the loop as is
        }
      }
    );

    // Then, we set the updated simulation data with the new array of simulation loops
    setSimulationData({
      ...simulationData, // Spread the existing properties of simulationData
      simulationLoops: newSimulationLoops, // Replace simulationLoops with the new array
    });

    setIsCreatingEditingLoop(false);
    setLoopDataBeingEdited(blankLoopObject);
  };

  // Show loop items in list as dropdown
  const openAndDisplayLoop = (index) => {
    if (displayLoopDataPoints && index === displayLoopDataPointsIndex) {
      setDisplayLoopDataPoints(false);
      return;
    }

    setDisplayLoopDataPoints(true);
    setDisplayLoopDataPointsIndex(index);
  };

  const handleDataPointChange = (event, dataPoint) => {
    // Assuming the input format is something like "x: 300, y: 400"
    const { value } = event.target;

    // Parse the input to extract xPos and yPos values
    const [xPosString, yPosString] = value.split(',').map((str) => str.trim());
    const xPos = parseInt(xPosString.split(':')[1]);
    const yPos = parseInt(yPosString.split(':')[1]);

    if (!isNaN(xPos) && !isNaN(yPos)) {
      // Find the index of the data point we want to update
      const index = simulationData.mainSimulationDataPoints.findIndex(
        (point) => point.id === dataPoint.id
      );

      if (index !== -1) {
        // Create a new array with the updated data point
        const updatedDataPoints = [...simulationData.mainSimulationDataPoints];
        updatedDataPoints[index] = {
          ...updatedDataPoints[index],
          xPos,
          yPos,
        };

        // Update the state with the new array
        setSimulationData((prevSimulationData) => ({
          ...prevSimulationData,
          mainSimulationDataPoints: updatedDataPoints,
        }));
      }
    } else {
      console.log('Invalid input for xPos and yPos:', value);
    }
  };

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

    setSimulationDataId(1);
  };

  const deleteDataPointFromSimulation = (event, dataIndex) => {
    event.preventDefault();
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
  };

  // Create new loop
  const createNewLoop = () => {
    // Determine the new loop's index based on the current array length
    const newLoopIndex = simulationData.simulationLoops.length;

    // Construct the new loop name by adding 1 to the new loop's index
    const newLoopName = `Loop ${newLoopIndex + 1}`;

    // Assuming simulationLoopData is structured correctly but needs a name update
    let newLoop = {
      ...simulationLoopData,
      loopTitle: newLoopName, // Update the loop title with the new name
    };

    setLoopDataBeingEdited(newLoop);
    setDisplayLoopDataPointsIndex(newLoopIndex);
    handleCloseLoopModal();
    setIsCreatingEditingLoop(true);
    setDisplaySimOrLoop('simulation');

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

    setLoopToDeleteIndex(index);

    handleCreateConsentModal(ConfirmDeleteLoop);
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

    setIsCreatingEditingLoop(false);
  };

  const addLoopToSimulation = (loopToAdd) => {
    setSimulationData({
      ...simulationData,
      mainSimulationDataPoints: [
        ...simulationData.mainSimulationDataPoints,
        loopToAdd,
      ],
    });
  };

  // Click agree in concent modal
  const runConsentFunction = (consentFunction) => {
    switch (consentFunction) {
      case CLEAR_ALL_DATAPOINT_FUNC:
        clearAllDataPointsFromSimulation();
        break;
      case DELETE_LOOP_FUNC:
        deleteSavedLoop();
        break;
      case CREATE_NEW_SIM_FUNC:
        createNewFile();
        break;
      default:
        console.log('No matching action found');
    }

    handleSetBlankConsentMessage();
  };

  const handleResetSimulationToStartingPoint = () => {
    setIsResettingAnimation(!isResettingAnimation);
  };

  const createNewFile = () => {
    setSimulationData(blankSimulationObject);
    setSimulationLoopData(blankLoopObject);
    localStorage.setItem(
      'simulationData',
      JSON.stringify(blankSimulationObject)
    );
  };

  const handleTapSpeedChange = (event) => {
    const newSpeed = event.target.value; // Get the new speed value from the input
    setSpeedOfFingerMoving(newSpeed); // Update the state with the new speed
  };

  const changeDraggingSpeed = (newSpeed) => {
    setSpeedOfDraggingArmMoving(newSpeed);
  };

  const changeMovementSpeed = (newSpeed) => {
    setSpeedOfArmMoving(newSpeed);
  };

  const clearAllDataPoints = () => {
    handleCreateConsentModal(ConfirmClearAllDataPoints);
  };

  // Display rulers on canvas
  const displayCanvasRulers = () => {
    setRulesAndDataVisible(true);
  };
  // Hide rulers on canvas
  const hideCanvasRulers = () => {
    setRulesAndDataVisible(false);
  };

  // Select tap tool
  const handleSelectTapTool = () => {
    setSimulationToolSelected(TAP_FUNCTION);
  };

  // Select tap and move tool
  const handleSelectTapAndMoveTool = () => {
    setSimulationToolSelected(MOVE_TAP_FUNCTION);
  };

  // Select drag tool
  const handleSelectDragTool = () => {
    setSimulationToolSelected(DRAG_FUNCTION);
  };

  // Select timeout tool
  const handleSelectTimeoutTool = () => {
    setSimulationToolSelected(TIMEOUT_FUNCTION);
  };

  // Select timeout tool
  const handleSelectMoveTool = () => {
    setSimulationToolSelected(MOVE_FUNCTION);
  };

  // Handle download
  const handleDownload = () => {
    downloadFileToMachine(simulationData);
  };

  // Save simulation
  const handleSaveSimulation = (user) => {
    client
      .post(`${SAVE_SIMULATION_API}/${user.id}`, simulationData)
      .then((res) => {
        console.log('RES', res.data.newSimulation);
      })

      .catch((err) => {
        console.error('Unable to create simulation', err);
      });
  };

  const parseSaveData = (dataToParse) => {
    return JSON.stringify(dataToParse);
  };

  const handleSaveNewSimulation = (fileName) => {
    console.log('fileName', fileName);

    // Create a new object with the parsed data for sending
    const packagedData = {
      simulationTitle: fileName,
      mainSimulationDataPoints: parseSaveData(
        simulationData.mainSimulationDataPoints
      ),
      simulationLoops: parseSaveData(simulationData.simulationLoops),
      simulationTimeToComplete: simulationData.simulationTimeToComplete,
    };

    console.log('packagedData', packagedData);

    client
      .post(`${CREATE_NEW_SIMULATION_API}`, packagedData, true)
      .then((res) => {
        console.log('RES', res.data.createdSimulation);
      })

      .catch((err) => {
        console.error('Unable to create simulation', err);
      });
  };

  const loadSelectedSimulation = (file) => {
    console.log('file', file);
    const loader = { title: file }

    client
      .get(`${LOAD_SIMULATION_API}/${loader.title}`, true)
      .then((res) => {
        console.log('RES', res.data.simulation);
      })

      .catch((err) => {
        console.error('Unable to create simulation', err);
      });
  };

  // Display Landscape
  const setSimulationLandScape = () => {
    setIsLandscapeMode(true);
  };
  // Display portrait
  const setSimulationPortrait = () => {
    setIsLandscapeMode(false);
  };

  // Close menu toolbar
  const hideUserMenuContainer = () => {
    setUserMenuIsOpen(false);
  };

  // Close data toolbar
  const hideDatapointContainer = () => {
    setSimulationDataIsOpen(false);
  };

  // Display position on canvas
  const toggleMousePositionDisplay = () => {
    setpositionOfMouseAndCanvasVisible(!positionOfMouseAndCanvasVisible);
  };

  return (
    <SimulationContext.Provider
      value={{
        // Menus
        userMenuIsOpen,
        simulationDataIsOpen,
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
        rulesAndDataVisible,
        setRulesAndDataVisible,
        simulationIsRunning,
        setSimulationIsRunning,
        selectedDevice,
        setSelectedDevice,
        displaySimOrLoop,
        setDisplaySimOrLoop,
        // Speeds
        speedOfArmMoving,
        setSpeedOfArmMoving,
        displayLoopDataPoints,
        setDisplayLoopDataPoints,
        displayLoopDataPointsIndex,
        setDisplayLoopDataPointsIndex,
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
        createNewLoop,
        numberOfDataPointsToDisplay,
        setNumberOfDataPointsToDisplay,
        setPointsToDisplaySettings,
        deleteDataPointFromSimulation,
        deleteDataPointFromLoop,
        deleteSavedLoopFromSimulation,
        runConsentFunction,
        saveLoopPerminently,
        simulationDataId,
        setSimulationDataId,
        clearAllDataPoints,
        displayCanvasRulers,
        hideCanvasRulers,
        // Select tool
        handleSelectTapTool,
        handleSelectTapAndMoveTool,
        handleSelectDragTool,
        handleSelectTimeoutTool,
        handleSelectMoveTool,
        // Run sim
        runSimulation,
        stopSimulation,
        handleResetSimulationToStartingPoint,
        // Save
        handleSaveSimulation,
        isSavingFile,
        setIsSavingFile,
        // Tools
        // Selected
        simulationToolSelected,
        setSimulationToolSelected,
        // Timeout
        timeoutLength,
        setTimeoutLength,
        timeoutUnitSelected,
        setTimeoutUnitSelected,
        // Drag
        setSpeedOfDraggingArmMoving,
        changeDraggingSpeed,
        speedOfDraggingArmMoving,
        // Download
        handleDownload,
        // User menu
        hideUserMenuContainer,
        setUserMenuIsOpen,
        // Sim data menu
        hideDatapointContainer,
        setSimulationDataIsOpen,
        // Tap
        numberOfFingerTapping,
        setNumberOfFingerTapping,
        handleTapSpeedChange,
        changeNumberOfTappingFinger,
        speedOfFingerMoving,
        setSpeedOfFingerMoving,
        // Movement
        changeMovementSpeed,
        // Orientation
        setSimulationLandScape,
        setSimulationPortrait,
        isLandscapeMode,
        setIsLandscapeMode,
        // Mouse position
        toggleMousePositionDisplay,
        positionOfMouseAndCanvasVisible,
        setpositionOfMouseAndCanvasVisible,
        // Loops
        addLoopToSimulation,
        // Create api
        handleSaveNewSimulation,
        // Load
        loadSelectedSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationContextProvider;
