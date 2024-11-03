import React from 'react';
import { Link } from 'react-router-dom';
// Constants
import { SIMULATION_PAGE_URL } from '../../utils/Constants';

function HomePageHeader() {
  return (
    <header className='stripped_border grid p-5 w-full h-fit shadow-cardShadow z-10'>
      <div className='grid gap-8 text-center bg-colour1 shadow-input py-6 px-4 lg:px-8 lg:py-8 h-fit w-full'>
        {/* Text */}
        <article className='grid gap-4 h-fit'>
          <div>
            <h2 className='text-xl font-semibold text-colour5'>Welcome To</h2>
            <h1 className='text-4xl font-poppins font-bold text-colour2'>
              ArduPlot<span className='text-colour3'>3</span>D
            </h1>
          </div>
          <div className='grid'>
            <div>
              <p>
                Sign up today and create plotted programs <br /> for your
                ArduPlot device.
              </p>
            </div>
            <div>
              <p>Visit the library for prereleased games!</p>
            </div>
          </div>
        </article>

        {/* cta */}
        <section className='px-4 py-2'>
          <Link to={SIMULATION_PAGE_URL}>
            <div className='stripped_border_dense py-1 px-1 shadow-cardShadow'>
              <div className='bg-colour1 text-colour5 text-lg w-full py-2 px-2 hover:bg-colour2 font-semibold duration-300'>
                Try Now For Free
              </div>
            </div>
          </Link>
        </section>
      </div>
    </header>
  );
}

export default HomePageHeader;
