import React, { useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Components
import LibrarySimItem from './LibrarySimItem';
// Constants
import {
  CONFIGURATION_PAGE_URL,
  GET_LIBRARY_SIMULATIONS_API,
} from '../../utils/Constants';
import SearchBarComponent from '../search/SearchBarComponent';
// Data
import { tempLibraryItems } from '../../utils/library/LibraryTempData';
import useNavigateToPage from '../hooks/useNavigateToPage';

function LibraryPageDisplay() {
  const navigateToPage = useNavigateToPage();

  const [libraryOfSimulations, setLibraryOfSimulations] = useState([]);

  useEffect(() => {
    client
      .get(`${GET_LIBRARY_SIMULATIONS_API}`)
      .then((res) => {
        console.log(res.data.libraryFiles);
        setLibraryOfSimulations(res.data.libraryFiles);
        if (res.data.libraryFiles.length <= 0) {
          setLibraryOfSimulations(tempLibraryItems);
        }
      })
      .catch((err) => {
        console.error('Unable to retrieve simulation data', err);
      });
  }, []);

  const navigateToMySimulation = () => {
    navigateToPage(CONFIGURATION_PAGE_URL, 'simulations');
  };

  return (
    <section className='grid container mx-auto p-2 stripped_border'>
      <div className='grid gap-8 bg-colour1 py-6 px-8 xl:px-12'>
        {/* Header */}
        <header className='grid h-fit gap-6'>
          <section className='grid grid-flow-col justify-between h-fit'>
            <div className='grid items-center'>
              <h1 className='text-2xl xl:text-3xl font-semibold text-colour5'>
                Library Files
              </h1>
            </div>

            <SearchBarComponent />
          </section>

          <section className='grid py-2'>
            <div className='grid md:grid-cols-rev gap-4 bg-colour1 border-2 border-solid border-gray-300 shadow-cardShadow px-2 py-2'>
              <div>
                <div>
                  <h3>Share and download simulations for free!</h3>
                </div>
                <div>
                  <p>
                    You can publish your own simulations for games on other uses
                    you have for the ArduPlot robots.
                  </p>
                </div>
              </div>
              <div className='grid items-center px-2'>
                <button
                  onClick={navigateToMySimulation}
                  className={`grid bg-colour2 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-colour1 cursor-pointer hover:brightness-110 active:scale-95 shadow-lg`}
                >
                  My Simulations
                </button>
              </div>
            </div>
          </section>
        </header>

        <section className='grid'>
          <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
            {libraryOfSimulations.map((simulation, index) => {
              return (
                <LibrarySimItem
                  key={index}
                  index={index}
                  simulation={simulation}
                />
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

export default LibraryPageDisplay;
