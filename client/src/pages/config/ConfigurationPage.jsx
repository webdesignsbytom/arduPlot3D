import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
import ConfigPageContent from '../../components/config/ConfigPageContent';

function ConfigurationPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName={'Configuration'}
        desc={`Configuration page of ${CompanyName}.`}
      />

      <div className='grid main__bg font-poppins min-h-screen grid-rows-reg lg:max-h-screen lg:overflow-hidden'>
        <Navbar />

        {/* Main */}
        <main className='grid h-full overflow-hidden'>
          <ConfigPageContent />
        </main>
      </div>
    </>
  );
}

export default ConfigurationPage;
