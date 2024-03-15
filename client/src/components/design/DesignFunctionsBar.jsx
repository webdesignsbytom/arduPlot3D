import React from 'react';

function DesignFunctionsBar({ createNewSimulationFile }) {
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
        <div className="py-2">
          <ul>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95' onClick={createNewSimulationFile}>New Simulation</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Save</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Save As</li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className="py-2">
          <ul>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Tap Screen</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Move To</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Drag</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Timeout</li>
          </ul>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        <div className="py-2">
          <ul>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Device Select</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Dimensions</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Custom</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Offset</li>
            <li className='cursor-pointer hover:text-gray-600 active:scale-95'>Layout</li>
          </ul>
        </div>
      </section>
    </section>
  );
}

export default DesignFunctionsBar;
