import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
import LibraryPageDisplay from '../../components/library/LibraryPageDisplay';

function LibraryPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Library'
        desc={`Explore the extensive simulation library of ${CompanyName}. Download and experience the best simulation routines.`}
        keywords='library, simulations, downloads, game routines'
        additionalMeta={[
          { property: 'og:title', content: `Library - ${CompanyName}` },
          {
            property: 'og:description',
            content: `Browse the library of simulations and tools offered by ${CompanyName}.`,
          },
          {
            property: 'og:image',
            content: 'https://localhost:9000/library/preview.jpg',
          }, // Use a relevant library preview image
          { property: 'og:url', content: 'https://yourwebsite.com/library' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Library - ${CompanyName}` },
          {
            name: 'twitter:description',
            content: `Explore a wide range of simulations and tools for gaming.`,
          },
          {
            name: 'twitter:image',
            content: 'https://localhost:9000/library/preview.jpg',
          },
        ]}
      />

      <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden'>
        <Navbar />

        {/* Main */}
        <main className='grid h-full w-full py-8 overflow-y-auto'>
          <LibraryPageDisplay />
        </main>
      </div>
    </>
  );
}

export default LibraryPage;
