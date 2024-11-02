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
        PageName={'Library'}
        desc={`Library page of ${CompanyName}.`}
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
