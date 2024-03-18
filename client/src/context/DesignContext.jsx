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
import { tempDesignData } from '../utils/design/TempData';

export const DesignContext = React.createContext();

const DesignContextProvider = ({ children }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const marketNumRef = useRef(1);
  const lineRef = useRef([]);
  const emptyRef = useRef([]);

  const [dataCollection, setDataCollection] = useState([]);
  const [loopDataPoints, setLoopDataPoints] = useState([]);
  const [simulationDataPoints, setSimulationDataPoints] = useState([]);

  // Simulation data and list of loops for simulation
  const [simulationData, setSimulationData] = useState(tempDesignData);

  // Simulation loops data
  const [simulationLoopData, setSimulationLoopData] = useState({
    loopTitle: '',
    mainSimulationLoopDataPoints: [],
    loopTimeToComplete: 0,
  });
  console.log('simulationData', simulationData);

  // Design
  const [isCreatingNewLoop, setIsCreatingNewLoop] = useState(false);
  const [rulersVisible, setRulersVisible] = useState(false);
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [isLandscapeMode, setIsLandscapeMode] = useState(true); // Starts landscape mode

  // Loops
  const [isCreatingEditingLoop, setIsCreatingEditingLoop] = useState(false);
  const [loopDataBeingEdited, setLoopDataBeingEdited] = useState({
    loopTitle: '',
    mainSimulationLoopDataPoints: [],
    loopTimeToComplete: 0,
  });

  // Tools
  const [simulationToolSelected, setSimulationToolSelected] = useState('tap');

  // Device
  const [selectedDevice, setSelectedDevice] = useState(
    availableDevicesForSimulations[0]
  );

  // Display
  const [displaySimOrLoop, setDisplaySimOrLoop] = useState('simulation'); // simulation || loop

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
  const [displayDataPoints, setDisplayDataPoints] = useState(false);
  const [displayDataPointsIndex, setDisplayDataPointsIndex] = useState(0);
  const [arrayOfLoopData, setArrayOfLoopData] = useState([]);

  // Video files
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [tapDataPoint, setTapDataPoint] = useState({
    dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
    xPos: 0,
    yPos: 0,
    zSpeed: speedOfFingerMoving,
    numFingers: 1,
    timeLength: 0,
  });

  const [movementDataPoint, setMovementDataPoint] = useState({
    dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
    xPos: 0,
    yPos: 0,
    xySpeed: speedOfArmMoving,
    timeLength: 0,
  });

  const [moveAndTapDataPoint, setMoveAndTapDataPoint] = useState({
    dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
    xPos: 0,
    yPos: 0,
    xySpeed: speedOfArmMoving,
    zSpeed: speedOfFingerMoving,
    numFingers: 1,
    timeLength: 0,
  });

  const [dragDataPoint, setDragDataPoint] = useState({
    dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
    startxPos: 0,
    startyPos: 0,
    finishxPos: 0,
    finishyPos: 0,
    xySpeed: speedOfArmMoving,
    zSpeed: speedOfFingerMoving,
    numFingers: 1,
    timeLength: 0,
  });

  const [timeoutDataPoint, setTimeoutDataPoint] = useState({
    dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
    timeoutLength: 0, // milliseconds only
  });

  const openAndEditLoop = (loop, index) => {
    if (displayDataPoints && index === displayDataPointsIndex) {
      setDisplayDataPoints(false);
      return;
    }

    console.log('LOOOP', loop);
    setDisplayDataPoints(true);
    setDisplayDataPointsIndex(index);

    setArrayOfLoopData(simulationData.simulationLoops[index]);
  };

  const handleDataPointChange = () => {};

  console.log('simulationData.simulationLoops', simulationData.simulationLoops);

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

  return (
    <DesignContext.Provider
      value={{
        // Ref
        canvasRef,
        contextRef,
        marketNumRef,
        lineRef,
        emptyRef,
        // Main simulation
        simulationData,
        setSimulationData,
        simulationLoopData,
        setSimulationLoopData,
        // Settings
        isCreatingNewLoop,
        setIsCreatingNewLoop,
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
        tapDataPoint,
        setTapDataPoint,
        movementDataPoint,
        setMovementDataPoint,
        moveAndTapDataPoint,
        setMoveAndTapDataPoint,
        dragDataPoint,
        setDragDataPoint,
        timeoutDataPoint,
        setTimeoutDataPoint,
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
        displayDataPoints,
        setDisplayDataPoints,
        displayDataPointsIndex,
        setDisplayDataPointsIndex,
        arrayOfLoopData,
        setArrayOfLoopData,
        openAndEditLoop,
        selectedVideo,
        setSelectedVideo,
        isCreatingEditingLoop,
        setIsCreatingEditingLoop,
        loopDataBeingEdited,
        setLoopDataBeingEdited,
        handleDataPointChange,
        clearDataPoints,
        dataCollection,
        setDataCollection,
        loopDataPoints,
        setLoopDataPoints,
        simulationDataPoints,
        setSimulationDataPoints,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignContextProvider;
