import React from 'react';
// Context
import { useModalContext } from '../../context/ModalContext';
// Components
import ConsentModal from '../modals/ConsentModal';
import SaveAsModal from '../modals/SaveAsModal';
import LoadSimulationModal from '../modals/LoadSimulationModal';
import AddLoopToSimulationModal from '../modals/AddLoopToSimulationModal';
import ConnectToDeviceModal from '../modals/ConnectToDeviceModal';
import TimeoutSettingsModal from '../modals/TimeoutSettingsModal';
import DragSettingsModal from '../modals/DragSettingsModal';
import MovementSettingsModal from '../modals/MovementSettingsModal';
import TapSettingsModal from '../modals/TapSettingsModal';
import PublishSimulationModal from '../modals/PublishSimulationModal';
import UploadVideoModal from '../modals/UploadVideoModal';
import DeviceSelectModal from '../modals/DeviceSelectModal';

function SimulationPageModelContainer() {
  const {
    consentMessageVisible,
    saveAsModalOpen,
    loadModalIsOpen,
    addCreateLoopModalOpen,
    connectToDeviceModalOpen,
    timeoutModalOpen,
    dragSettingsModalOpen,
    movementSettingsModalOpen,
    tapSettingsModalOpen,
    uploadVideoModalOpen,
    isPublishModalOpen,
    deviceSelectionModalOpen,
  } = useModalContext();

  return (
    <>
      {/* Consent */}
      {consentMessageVisible && <ConsentModal />}
      {/* Save  */}
      {saveAsModalOpen && <SaveAsModal />}
      {/* Load */}
      {loadModalIsOpen && <LoadSimulationModal />}
      {/* Loop */}
      {addCreateLoopModalOpen && <AddLoopToSimulationModal />}
      {/* Connect */}
      {connectToDeviceModalOpen && <ConnectToDeviceModal />}
      {/* Device select */}
      {deviceSelectionModalOpen && <DeviceSelectModal />}
      {/* Publish */}
      {isPublishModalOpen && <PublishSimulationModal />}
      {/* Upload video */}
      {uploadVideoModalOpen && <UploadVideoModal />}
      {/* Tap settings */}
      {tapSettingsModalOpen && <TapSettingsModal />}
      {/* Movement */}
      {movementSettingsModalOpen && <MovementSettingsModal />}
      {/* Drag */}
      {dragSettingsModalOpen && <DragSettingsModal />}
      {/* Timeout */}
      {timeoutModalOpen && <TimeoutSettingsModal />}
    </>
  );
}

export default SimulationPageModelContainer;
