import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Components
import Navbar from '../../components/nav/Navbar';
// Context
import { ToggleContext } from '../../context/ToggleContext';
// Constants
import { HOME_PAGE_URL } from '../../utils/Constants';

function HomePage() {
  const { setActiveNav } = useContext(ToggleContext);

  let navigate = useNavigate();

  useEffect(() => {
    setActiveNav(HOME_PAGE_URL);
  }, []);

  const navigateToPage = (event) => {
    const { id } = event.target;
    setActiveNav(id);
    navigate(`${id}`);
  };

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />
      {/* Main */}
      <main className='grid h-full p-1 items-center justify-center'>
        <section>
          <div className='grid text-center outline outline-2 outline-black rounded-xl bg-main-colour px-6 py-8'>
            <article className=''>
              <div>
                <h2 className='text-xl font-semibold'>Welcome To</h2>
                <h1 className='text-3xl font-poppins font-bold'>
                  ArduPlot3D
                </h1>
              </div>
              <div className='mt-4 grid'>
                <p>
                  <span className='text-hyperlink-blue font-semibold'>
                    <Link to='/sign-up'>Sign up</Link>
                  </span>{' '}
                  today and create plotted programs for your ArduPlot device. 
                </p>
                <p>Visit the library for prereleased games!</p>
              </div>
            </article>
            {/* cta */}
            <div className='mt-6'>
              <button id='/design' onClick={navigateToPage} className='px-4 py-2 bg-secondary-colour outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-xl'>
                Try Now For Free
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
