import React, { createContext, useContext, useState } from 'react';
// Utils
import { ConfirmCreateNewProject } from '../utils/design/ConfrimMessages';

// Create the context
const ModalContext = createContext();

// Create the provider component
const ModalContextProvider = ({ children }) => {
  const [toggleNavigation, setToggleNavigation] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [saveAsModalOpen, setSaveAsModalOpen] = useState(false);
  const [loadModalIsOpen, setLoadModalIsOpen] = useState(false);
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

  const handleOpenPublishModal = () => {
    handleCloseAllModalsMaster();
    setIsPublishModalOpen(true);
  };

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false);
  };

  // Open timeout settings modal
  const handleOpenTimeoutSettingsModal = () => {
    handleCloseAllModalsMaster();
    setTimeoutModalOpen(true);
  };
  const handleCloseTimeoutSettingsModal = () => {
    setTimeoutModalOpen(false);
  };

  // Open drag settings modal
  const handleOpenDragSettingsModal = () => {
    handleCloseAllModalsMaster();
    setDragSettingsModalOpen(true);
  };
  const handleCloseDragSettingsModal = () => {
    setDragSettingsModalOpen(false);
  };

  // Open movement settings modal
  const handleOpenMovementSettingsModal = () => {
    handleCloseAllModalsMaster();
    setMovementSettingsModalOpen(true);
  };
  const handleCloseMovementSettingsModal = () => {
    setMovementSettingsModalOpen(false);
  };

  // Open tap settings modal
  const handleOpenTapSettingsModal = () => {
    handleCloseAllModalsMaster();
    setTapSettingsModalOpen(true);
  };
  const handleCloseTapSettingsModal = () => {
    setTapSettingsModalOpen(false);
  };

  // Open tap settings modal
  const handleOpenDeviceSelectModal = () => {
    handleCloseAllModalsMaster();
    setDeviceSelectionModalOpen(true);
  };

  const handleCloseDeviceSelectModal = () => {
    setDeviceSelectionModalOpen(false);
  };

  const handleOpenUploadVideoModal = () => {
    handleCloseAllModalsMaster();
    setuploadVideoModalOpen(true);
  };
  const handleCloseUploadVideoModal = () => {
    setuploadVideoModalOpen(false);
  };

  // Create new simulation
  const handleOpenNewSimulationModal = () => {
    handleCloseAllModalsMaster();

    handleCreateConsentModal(ConfirmCreateNewProject);
  };

  // Loops
  const handleOpenLoopModal = () => {
    handleCloseAllModalsMaster();
    setAddCreateLoopModalOpen(true);
  };
  const handleCloseLoopModal = () => {
    setAddCreateLoopModalOpen(false);
  };

  // Save
  // Open save as
  const handleOpenSaveAsModal = () => {
    handleCloseAllModalsMaster();
    setSaveAsModalOpen(true);
  };

  // Close save as
  const handleCloseSaveAsModal = () => {
    setSaveAsModalOpen(false);
  };

  // Load
  // Open load
  const handleOpenLoadModal = () => {
    handleCloseAllModalsMaster();
    setLoadModalIsOpen(true);
  };

  // Close load
  const handleCloseLoadModal = () => {
    setLoadModalIsOpen(false);
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
    setuploadVideoModalOpen(false);
    setIsPublishModalOpen(false);
    setSaveAsModalOpen(false);
    setLoadModalIsOpen(false);
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
        // Load
        handleOpenLoadModal,
        handleCloseLoadModal,
        loadModalIsOpen,
        // Loop
        handleOpenLoopModal,
        handleCloseLoopModal,
        addCreateLoopModalOpen,
        // Settings
        // Move
        handleOpenMovementSettingsModal,
        handleCloseMovementSettingsModal,
        movementSettingsModalOpen,
        // Drag
        handleOpenDragSettingsModal,
        handleCloseDragSettingsModal,
        dragSettingsModalOpen,
        // Timeout
        handleOpenTimeoutSettingsModal,
        handleCloseTimeoutSettingsModal,
        timeoutModalOpen,
        // Tap
        handleOpenTapSettingsModal,
        handleCloseTapSettingsModal,
        tapSettingsModalOpen,
        // Device select
        handleOpenDeviceSelectModal,
        handleCloseDeviceSelectModal,
        deviceSelectionModalOpen,
        // Video upload
        handleOpenUploadVideoModal,
        handleCloseUploadVideoModal,
        uploadVideoModalOpen,
        // Publish
        handleOpenPublishModal,
        handleClosePublishModal,
        isPublishModalOpen,
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