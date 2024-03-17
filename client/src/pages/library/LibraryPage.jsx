import React, { useContext, useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Components
import Navbar from '../../components/nav/Navbar';
// Context
import { ToggleContext } from '../../context/ToggleContext';

function LibraryPage() {
  const { setActiveNav } = useContext(ToggleContext);

  const [libraryOfSimulations, setLibraryOfSimulations] = useState([]);

  useEffect(() => {
    setActiveNav('/');
  }, []);

  useEffect(() => {
    client
      .get(`simulations/get-all-simulations`)
      .then((res) => {
        console.log(res.data.data.simulations);
      })
      .catch((err) => {
        console.error('Unable to retrieve simulation data', err);
      });
  }, []);

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

      {/* Main */}
      <main className='grid h-full grid-cols-a1a overflow-hidden'>
        LibraryPage
      </main>
    </div>
  );
}

export default LibraryPage;
