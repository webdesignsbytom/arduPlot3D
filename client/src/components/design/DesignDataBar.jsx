import React, { useEffect, useState } from 'react';

function DesignDataBar({
  clearDataPoints,
  lineRef,
  dataCollection,
  setDataCollection,
}) {
  console.log('PPPP dataCollection', dataCollection);

  const handleChange = () => {};

  return (
    <section className='bg-white border-l-2 border-solid border-black p-2'>
      {/* Header data */}
      <article>
        <h2 className='text-xl text-center'>Simulation Data</h2>
        <p className='mt-2'>
          See a list of your movements and timing controls for a simulation.
          Edit and modify the positions to refine your simulation.
        </p>
      </article>

      {/* List of plot points */}
      <section className='mt-6'>
        <div>
          <div className='text-center'>
            <h4>Simulation Timeline</h4>
          </div>
          <form className='grid w-fit'>
            {dataCollection?.map((item, index) => {
              return (
                <div key={index} className='grid grid-cols-rev gap-4'>
                  <div className='grid'>
                    <label htmlFor='pointOne'>Point {index + 1}</label>
                    <input
                      className='w-[140px] outline-black outline outline-2 pl-1'
                      type='text'
                      name='pointOne'
                      id='pointOne'
                      value={`x: ${item.xpos}, y: ${item.ypos}`}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid items-end justify-end'>
                    <button
                      id='pointOne'
                      onClick={clearDataPoints}
                      className='p-1 outline-black outline outline-2 active:scale-95 no__highlights bg-yellow-400 hover:bg-yellow-100 rounded-xl'
                    >
                      Clear
                    </button>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </section>
    </section>
  );
}

export default DesignDataBar;
