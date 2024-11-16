import React from 'react';
// Analytics
import { usePageTracking } from '../../components/hooks/useAnalytics';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import HomePageHeader from '../../components/home/HomePageHeader';
// Constants
import { CompanyName } from '../../utils/Constants';

function HomePage() {
  usePageTracking();

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Home'
        desc={`Welcome to ${CompanyName}, your destination for the best simulations, tools, and insights. Discover our extensive library and engage with our community.`}
        keywords='home, simulations, tools, community, gaming'
        additionalMeta={[
          { property: 'og:title', content: `Welcome to ${CompanyName}` },
          {
            property: 'og:description',
            content:
              'Explore our simulations and tools for optimal gaming experiences.',
          },
          {
            property: 'og:image',
            content: 'https://localhost:9000/brand/logo.png',
          },
          { property: 'og:url', content: 'https://yourwebsite.com/' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Welcome to ${CompanyName}` },
          {
            name: 'twitter:description',
            content:
              'Discover simulations and tools for optimal gaming experiences.',
          },
          {
            name: 'twitter:image',
            content: 'https://localhost:9000/brand/logo.png',
          },
        ]}
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
