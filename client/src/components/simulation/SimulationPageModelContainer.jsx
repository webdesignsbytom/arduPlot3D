import React from 'react';
// Components
import ConsentModal from '../modals/ConsentModal';

function SimulationPageModelContainer() {
  return (
    <>
      {consentMessageVisible && (
        <ConsentModal
          consentMessage={consentMessage}
          cancalFunction={cancelFunction}
        />
      )}
    </>
  );
}

export default SimulationPageModelContainer;
