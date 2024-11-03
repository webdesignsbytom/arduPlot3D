import React, { createContext, useContext, useState } from 'react';
import { ConfirmCreateNewProject } from '../utils/design/ConfrimMessages';

// Create the context
const ModalContext = createContext();

// Create the provider component
const ModalContextProvider = ({ children }) => {
  const [toggleNavigation, setToggleNavigation] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [saveAsModalOpen, setSaveAsModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [connectToDeviceModalOpen, setConnectToDeviceModalOpen] =
    useState(false);
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [movementSettingsModalOpen, setMovementSettingsModalOpen] =
    useState(false);
  const [tapSettingsModalOpen, setTapSettingsModalOpen] = useState(false);
  const [dragSettingsModalOpen, setDragSettingsModalOpen] = useState(false);
  const [addCreateLoopModalOpen, setAddCreateLoopModalOpen] = useState(false);
  const [deviceSelectionModalOpen, setDeviceSelectionModalOpen] =
    useState(false);
  const [uploadVideoModalOpen, setuploadVideoModalOpen] = useState(false);

  // Popup modals
  const [consentMessageVisible, setConsentMessageVisible] = useState('');
  const [consentMessage, setConsentMessage] = useState({});

  const toggleNavbarOpenClosed = () => {
    setToggleNavigation(!toggleNavigation);
  };

  const toggleConnectToDeviceModal = () => {
    setConnectToDeviceModalOpen(!connectToDeviceModalOpen);
  };

  const openPublishModal = () => {
    handleCloseAllModalsMaster();
    setIsPublishModalOpen(true);
  };
  const closePublishModal = () => {
    setIsPublishModalOpen(false);
  };

  // Open timeout settings modal
  const openTimeoutSettingsModal = () => {
    handleCloseAllModalsMaster();
    setTimeoutModalOpen(true);
  };
  const closeTimeoutSettingsModal = () => {
    setTimeoutModalOpen(false);
  };

  // Open drag settings modal
  const openDragSettingsModal = () => {
    handleCloseAllModalsMaster();
    setDragSettingsModalOpen(true);
  };
  const closeDragSettingsModal = () => {
    setDragSettingsModalOpen(false);
  };

  // Open movement settings modal
  const openMovementSettingsModal = () => {
    handleCloseAllModalsMaster();
    setMovementSettingsModalOpen(true);
  };
  const closeMovementSettingsModal = () => {
    setMovementSettingsModalOpen(false);
  };

  // Open tap settings modal
  const openTapSettingsModal = () => {
    handleCloseAllModalsMaster();
    setTapSettingsModalOpen(true);
  };
  const closeTapSettingsModal = () => {
    setTapSettingsModalOpen(false);
  };

  // Open tap settings modal
  const openDeviceSelectModal = () => {
    handleCloseAllModalsMaster();
    setDeviceSelectionModalOpen(true);
  };
  const closeDeviceSelectModal = () => {
    setDeviceSelectionModalOpen(false);
  };

  const openUploadVideoModal = () => {
    handleCloseAllModalsMaster();
    setuploadVideoModalOpen(true);
  };
  const closeUploadVideoModal = () => {
    setuploadVideoModalOpen(false);
  };

  // Create new simulation
  const handleOpenNewSimulationModal = () => {
    handleCloseAllModalsMaster();

    handleCreateConsentModal(ConfirmCreateNewProject);
  };

  // Save
  // Open save as
  const handleOpenSaveAsModal = () => {
    console.log('aaaa');
    handleCloseAllModalsMaster();
    setSaveAsModalOpen(true);
  };
  // Close save as
  const handleCloseSaveAsModal = () => {
    setSaveAsModalOpen(false);
  };

  // Open consent modal
  const handleCreateConsentModal = (consentData) => {
    setConsentMessageVisible(true);
    setConsentMessage(consentData);
  };

  const handleCancelConsentModel = () => {
    setConsentMessage({});
    setConsentMessageVisible(false);
  };

  // Clear state
  const handleSetBlankConsentMessage = () => {
    setConsentMessageVisible(false);
    setConsentMessage('');
  };

  // Close all modals master
  const handleCloseAllModalsMaster = () => {
    setDeviceSelectionModalOpen(false);
    setTapSettingsModalOpen(false);
    setMovementSettingsModalOpen(false);
    setDragSettingsModalOpen(false);
    setTimeoutModalOpen(false);
    closeUploadVideoModal(false);
    setIsPublishModalOpen(false);
    setSaveAsModalOpen(false);
    setLoadModalOpen(false);
    setConsentMessageVisible(false);

    setConsentMessageVisible(false);
    setConsentMessage('');
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
        // Close all
        handleCloseAllModalsMaster,
        // Consent modal
        handleCreateConsentModal,
        handleSetBlankConsentMessage,
        handleCancelConsentModel,
        consentMessageVisible,
        consentMessage,
        // Create
        handleOpenNewSimulationModal,
        // Save
        handleOpenSaveAsModal,
        handleCloseSaveAsModal,
        saveAsModalOpen,
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
