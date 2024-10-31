import React from 'react';
// Analytics
import { usePageTracking } from '../../components/hooks/useAnalytics';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
import HomePageHeader from '../../components/home/HomePageHeader';

function HomePage() {
  usePageTracking();

  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Home'} desc={`Home page of ${CompanyName}.`} />

      {/* Page start */}
      <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
        <Navbar />
        {/* Main */}
        <main className='grid h-full w-full items-center justify-center px-4'>
          <HomePageHeader />
        </main>
      </div>
    </>
  );
}

export default HomePage;
