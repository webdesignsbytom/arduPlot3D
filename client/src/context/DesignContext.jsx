import React from 'react';
import { useState } from 'react';
// Device data
import { availableDevicesForSimulations } from '../utils/design/AvailableDevices';
import {
  initDragMovementSpeed,
  initxyMovementSpeed,
  initzMovementSpeed,
} from '../utils/design/SpeedUtils';
import { timeoutUnitTypesAvailable } from '../utils/design/DesignUtils';

export const DesignContext = React.createContext();

const DesignContextProvider = ({ children }) => {
  // Simulation data and list of loops for simulation
  const [simulationData, setSimulationData] = useState({
    simulationTitle: '',
    mainSimulationDataPoints: [],
    simulationLoops: [
      {
        loopTitle: 'Loop 1',
        mainSimulationLoopDataPoints: [23, 44, 76],
        loopTimeToComplete: 1230,
      },
      {
        loopTitle: 'Loop 2',
        mainSimulationLoopDataPoints: [23, 44, 76],
        loopTimeToComplete: 1230,
      },
    ],
    simulationTimeToComplete: 0,
  });

  console.log('simulationData', simulationData);
  
  // Simulation loops data
  const [simulationLoopData, setSimulationLoopData] = useState({
    loopTitle: '',
    mainSimulationLoopDataPoints: [],
    loopTimeToComplete: 0,
  });

  const [tapDataPoint, setTapDataPoint] = useState({
    dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
    xPos: 0,
    yPos: 0,
    zSpeed: initzMovementSpeed,
    numFingers: 1,
  });

  const [movementDataPoint, setMovementDataPoint] = useState({
    dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
    xPos: 0,
    yPos: 0,
    xySpeed: initxyMovementSpeed,
  });

  const [moveAndTapDataPoint, setMoveAndTapDataPoint] = useState({
    dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
    xPos: 0,
    yPos: 0,
    xySpeed: initxyMovementSpeed,
    zSpeed: initzMovementSpeed,
    numFingers: 1,
  });

  const [dragDataPoint, setDragDataPoint] = useState({
    dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
    startxPos: 0,
    startyPos: 0,
    finishxPos: 0,
    finishyPos: 0,
    xySpeed: initxyMovementSpeed,
    zSpeed: initzMovementSpeed,
    numFingers: 1,
  });

  const [timeoutDataPoint, setTimeoutDataPoint] = useState({
    dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
    timeoutLength: 0, // milliseconds only
  });

  // Design
  const [isCreatingNewLoop, setIsCreatingNewLoop] = useState(false);
  const [rulersVisible, setRulersVisible] = useState(false);
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [isLandscapeMode, setIsLandscapeMode] = useState(false);

  // Tools
  const [simulationToolSelected, setSimulationToolSelected] = useState('tap');

  // Device
  const [selectedDevice, setSelectedDevice] = useState(
    availableDevicesForSimulations[0]
  );

  // Display
  const [displaySimOrLoop, setDisplaySimOrLoop] = useState(false);

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

  return (
    <DesignContext.Provider
      value={{
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
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignContextProvider;
