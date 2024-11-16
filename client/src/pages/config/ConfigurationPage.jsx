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
        PageName="Configuration"
        desc={`Manage your ${CompanyName} preferences and account settings on the configuration page.`}
        keywords={`configuration, settings, preferences, account management, ${CompanyName}`}
        additionalMeta={[
          { property: 'og:title', content: `Configuration - ${CompanyName}` },
          { property: 'og:description', content: `Easily configure your ${CompanyName} account preferences and settings.` },
          { property: 'og:image', content: 'https://localhost:9000/config/config-preview.jpg' }, // Relevant configuration page image
          { property: 'og:url', content: 'https://yourwebsite.com/configuration' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Configuration - ${CompanyName}` },
          { name: 'twitter:description', content: `Access and manage your ${CompanyName} account configurations and preferences.` },
          { name: 'twitter:image', content: 'https://localhost:9000/config/config-preview.jpg' },
          { name: 'robots', content: 'noindex, nofollow' }, // Prevent indexing for privacy
        ]}
      />

      <div className="relative grid main__bg font-poppins min-h-screen grid-rows-reg lg:max-h-screen lg:overflow-hidden">
        <Navbar />

        {/* Main */}
        <main className="grid h-full overflow-hidden">
          <ConfigPageContent />
        </main>

        {consentMessageVisible && <ConsentModal />}
      </div>
    </>
  );
}

export default ConfigurationPage;
