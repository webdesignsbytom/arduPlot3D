import React from 'react';
// Context
import { useModalContext } from '../../context/ModalContext';
// Components
import ConsentModal from '../modals/ConsentModal';
import SaveAsModal from '../modals/SaveAsModal';

function SimulationPageModelContainer() {
  const { consentMessageVisible, saveAsModalOpen } = useModalContext();
console.log('saveAsModalOpen', saveAsModalOpen);
  return (
    <>
      {/* Consent */}
      {consentMessageVisible && <ConsentModal />}
      {/* Save  */}
      {saveAsModalOpen && <SaveAsModal />}
    </>
  );
}

export default SimulationPageModelContainer;
