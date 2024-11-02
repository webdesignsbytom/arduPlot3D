import React, { createContext, useContext, useState } from 'react';

// Create the context
const ModalContext = createContext();

// Create the provider component
const ModalContextProvider = ({ children }) => {
  const [toggleNavigation, setToggleNavigation] = useState(false);
  const [connectToDeviceModalOpen, setConnectToDeviceModalOpen] =
    useState(false);

  const toggleNavbarOpenClosed = () => {
    setToggleNavigation(!toggleNavigation);
  };

  const toggleConnectToDeviceModal = () => {
    setConnectToDeviceModalOpen(!connectToDeviceModalOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        // Navbar
        toggleNavigation,
        toggleNavbarOpenClosed,
        // Connect to device
        toggleConnectToDeviceModal,
        connectToDeviceModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to consume the context
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'useModalContext must be used within a ModalContextProvider'
    );
  }
  return context;
};

export default ModalContextProvider;
