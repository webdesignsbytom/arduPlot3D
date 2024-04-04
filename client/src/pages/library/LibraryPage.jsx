import React, { useContext, useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Components
import Navbar from '../../components/nav/Navbar';
// Context
import { ToggleContext } from '../../context/ToggleContext';
import LibrarySimItem from '../../components/library/LibrarySimItem';

function LibraryPage() {
  const { setActiveNav } = useContext(ToggleContext);

  const [libraryOfSimulations, setLibraryOfSimulations] = useState([]);

  useEffect(() => {
    setActiveNav('/');
  }, []);

  useEffect(() => {
    client
      .get(`/library/get-all-library-simulations`)
      .then((res) => {
        console.log(res.data.data.libraryFiles);
        setLibraryOfSimulations(res.data.data.libraryFiles);
      })
      .catch((err) => {
        console.error('Unable to retrieve simulation data', err);
      });
  }, []);

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

      {/* Main */}
      <main className='grid h-full w-full overflow-hidden py-4'>
        <section className='grid grid-rows-reg w-3/4 h-full mx-auto outline-black outline outline-2 rounded-xl bg-white px-4 py-2'>
          <div className='mb-2'>
            <h2 className='text-xl font-semibold text-yellow-400'>
              Library of simulation files
            </h2>
          </div>

          <section className='grid'>
            <div>
              {libraryOfSimulations.map((simulation, index) => {
                return <LibrarySimItem key={index} index={index} simulation={simulation} />;
              })}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default LibraryPage;
