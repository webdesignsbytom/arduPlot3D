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
// Data
import {
  configurationPageAdditionalMeta,
  configurationPageStructuredData,
} from '../../utils/data/PageData';

function ConfigurationPage() {
  const { consentMessageVisible } = useModalContext();

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Configuration'
        desc={`Manage your ${CompanyName} preferences and account settings on the configuration page.`}
        keywords={`configuration, settings, preferences, account management, ${CompanyName}`}
        additionalMeta={configurationPageAdditionalMeta}
        structuredData={configurationPageStructuredData}
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
