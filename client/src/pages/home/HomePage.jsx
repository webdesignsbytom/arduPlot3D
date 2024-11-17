import React from 'react';
// Analytics
import { usePageTracking } from '../../components/hooks/useAnalytics';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import HomePageHeader from '../../components/home/HomePageHeader';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  homePageAdditionalMeta,
  homePageStructuredData,
} from '../../utils/data/PageData';

function HomePage() {
  usePageTracking();

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Home'
        desc={`${CompanyName} offers expert web and circuit design solutions in England. Discover our services and featured projects.`}
        keywords={`web design, circuit design, ${CompanyName}, England, UK, custom solutions`}
        additionalMeta={homePageAdditionalMeta}
        structuredData={homePageStructuredData}
      />

      {/* Page start */}
      <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
        <Navbar />
        {/* Main */}
        <main className='grid relative h-full w-full items-center justify-center px-4'>
          <HomePageHeader />
        </main>
      </div>
    </>
  );
}

export default HomePage;
