import React from 'react';

function LibrarySimItem({ index, simulation }) {
  return (
    <article className='grid grid-rows-reg outline outline-black outline-1 rounded-xl'>
      <section className='grid grid-cols-rev w-full border-b-2 border-solid border-black px-2 py-1'>
        <div className=''>
          <h4>{simulation.title}</h4>
        </div>
        <div>
          <button className='px-2 py-1 bg-yellow-400 outline-black outline outline-2 active:scale-95 no__highlights hover:bg-yellow-100 rounded-xl'>DOWNLOAD</button>
        </div>
      </section>
      <section className='px-2 py-2 grid grid-cols-rev'>
        <div>item desc</div>
        <div>socre 5 stars</div>
      </section>
    </article>
  );
}

export default LibrarySimItem;
