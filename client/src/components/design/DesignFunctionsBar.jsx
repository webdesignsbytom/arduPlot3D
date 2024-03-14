import React from 'react';

function DesignFunctionsBar() {
  return (
    <section className='bg-white border-r-2 border-solid border-black p-2'>
      {/* Header data */}
      <article>
        <h2 className='text-xl text-center'>Simulation Tools</h2>
      </article>

      {/* Divider */}
      <div className='w-full h-[1px] bg-slate-400'></div>

      {/* Tools */}
      <section>
        <div>
          <ul>
            <li>New Simulation</li>
            <li>Save</li>
            <li>Save As</li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div>
          <ul>
            <li>Tap Screen</li>
            <li>Move To</li>
            <li>Drag</li>
            <li>Timeout</li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div>
          <ul>
            <li>Device Select</li>
            <li>Dimensions</li>
            <li>Custom</li>
            <li>Offset</li>
            <li>Layout</li>
          </ul>
        </div>
      </section>
    </section>
  );
}

export default DesignFunctionsBar;
