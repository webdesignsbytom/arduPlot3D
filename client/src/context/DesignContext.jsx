import React from 'react';
import { useState } from 'react';

export const DesignContext = React.createContext();

const DesignContextProvider = ({ children }) => {
  const [isCreatingNewLoop, setIsCreatingNewLoop] = useState(false);
  const [rulersVisible, setRulersVisible] = useState(false);
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [isLandscapeMode, setIsLandscapeMode] = useState(false);

  return (
    <DesignContext.Provider
      value={{
        isCreatingNewLoop,
        setIsCreatingNewLoop,
        rulersVisible,
        setRulersVisible,
        simulationIsRunning,
        setSimulationIsRunning,isLandscapeMode, setIsLandscapeMode
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignContextProvider;
