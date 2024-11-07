import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import ConfigPageContent from '../../components/config/ConfigPageContent';
import ConsentModal from '../../components/modals/ConsentModal';
// Context
import { useModalContext } from '../../context/ModalContext';
// Constants
import { CompanyName } from '../../utils/Constants';

function ConfigurationPage() {
  const { consentMessageVisible } = useModalContext();
  
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName={'Configuration'}
        desc={`Configuration page of ${CompanyName}.`}
      />

      <div className='relative grid main__bg font-poppins min-h-screen grid-rows-reg lg:max-h-screen lg:overflow-hidden'>
        <Navbar />

        {/* Main */}
        <main className='grid h-full overflow-hidden'>
          <ConfigPageContent />
        </main>

        {consentMessageVisible && <ConsentModal />}
        </div>
    </>
  );
}

export default ConfigurationPage;
