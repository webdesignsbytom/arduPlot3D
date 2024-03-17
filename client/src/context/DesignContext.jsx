import React from 'react';
import { useState } from 'react';
// Device data
import { availableDevicesForSimulations } from '../utils/design/AvailableDevices';

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
    ],
    simulationTimeToComplete: 0,
  });
  // Simulation loops data
  const [simulationLoopData, setSimulationLoopData] = useState({
    loopTitle: '',
    mainSimulationLoopDataPoints: [],
    loopTimeToComplete: 0,
  });

  // Design
  const [isCreatingNewLoop, setIsCreatingNewLoop] = useState(false);
  const [rulersVisible, setRulersVisible] = useState(false);
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [isLandscapeMode, setIsLandscapeMode] = useState(false);

  // Device
  const [selectedDevice, setSelectedDevice] = useState(
    availableDevicesForSimulations[0]
  );

  // Display
  const [displaySimOrLoop, setDisplaySimOrLoop] = useState(false);

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
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignContextProvider;
