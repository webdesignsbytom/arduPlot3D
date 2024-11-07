import React, { useState } from 'react';
// Constants
import SimuationAndLoopComponent from './SimuationAndLoopComponent';
import PublishSimulationComponent from './PublishSimulationComponent';

function UserSimulationsComponent() {
  const [displaySelected, setDisplaySelected] = useState('lists');

  return (
    <section
      className='grid container mx-auto'
      aria-label='User Simulations and Loops Management'
    >
      <div className='grid stripped_border p-2'>
        <div className='grid gap-4 bg-colour1 py-6 px-8'>
          {displaySelected === 'lists' && <SimuationAndLoopComponent setDisplaySelected={setDisplaySelected} />}
          {displaySelected === 'publish' && <PublishSimulationComponent setDisplaySelected={setDisplaySelected} />}
        </div>
      </div>
    </section>
  );
}

export default UserSimulationsComponent;
