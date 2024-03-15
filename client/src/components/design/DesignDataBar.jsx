import React, { useEffect, useState } from 'react';
// Icons
import { IoCloseCircleSharp } from "react-icons/io5";

function DesignDataBar({
  clearDataPoints,
  lineRef,
  dataCollection,
  setDataCollection,
}) {
  console.log('PPPP dataCollection', dataCollection);

  const handleChange = () => {};

  return (
    <section className='bg-white grid grid-rows-reg border-l-2 border-solid border-black p-1 overflow-hidden'>
      {/* Header data */}
      <article className='grid h-fit'>
        <h2 className='text-xl text-center'>Simulation Data</h2>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className='p-1'>
          <p className='leading-4 text-xs'>
            See a list of your movements and timing controls for a simulation.
            Edit and modify the positions to refine your simulation.
          </p>
        </div>
      </article>

      {/* List of plot points */}
      <section className='grid h-full w-full overflow-hidden'>
        <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
          {/* Buttons */}
          <section className='grid grid-cols-2 gap-2 h-fit w-full p-2'>
            <div className='grid w-full'>
              <button className='bg-yellow-400 px-2 rounded-lg text-black w-full outline outline-black outline-2 hover:brightness-90 active:scale-95'>
                Simualtion
              </button>
            </div>
            <div className='grid w-full'>
              <button className='bg-yellow-400 px-2 rounded-lg text-black w-full outline outline-black outline-2 hover:brightness-90 active:scale-95'>
                Loops
              </button>
            </div>
          </section>

          {/* List */}
          <form className='grid w-full overflow-hidden'>
            <div className='grid overflow-y-scroll p-1'>
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
                        <IoCloseCircleSharp />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}

export default DesignDataBar;
