import React from 'react';
import { useState } from 'react';
// Device data
import { availableDevicesForSimulations } from '../utils/design/AvailableDevices';

export const DesignContext = React.createContext();

const DesignContextProvider = ({ children }) => {
  // Design
  const [isCreatingNewLoop, setIsCreatingNewLoop] = useState(false);
  const [rulersVisible, setRulersVisible] = useState(false);
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [isLandscapeMode, setIsLandscapeMode] = useState(false);

  // Device
  const [selectedDevice, setSelectedDevice] = useState(
    availableDevicesForSimulations[0]
  );

  return (
    <DesignContext.Provider
      value={{
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
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignContextProvider;
