import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Context
import { useUser } from '../../context/UserContext';
import { useModalContext } from '../../context/ModalContext';
// Icons
import { IoReloadCircle, IoPencilOutline } from 'react-icons/io5';
import { MdOutlinePublish } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
// Constants
import { GET_ALL_USER_SIMULATIONS_AND_LOOPS_API } from '../../utils/Constants';
// Consent utils
import { ConfirmDeleteSavedLoop, ConfirmDeleteSavedSimulation } from '../../utils/design/ConfrimMessages';

function SimuationAndLoopComponent({ setDisplaySelected }) {
  const { user } = useUser();
  const { handleCreateConsentModal } = useModalContext();

  const [userSimulations, setUserSimulations] = useState(user.simulations);
  const [userLoops, setUserLoops] = useState(user.loops);

  const refreshUserData = () => {
    client
      .get(GET_ALL_USER_SIMULATIONS_AND_LOOPS_API)
      .then((res) => {
        setUserSimulations(res.data.simulations);
        setUserLoops(res.data.loops);
      })
      .catch((err) => {
        console.error('Unable to retrieve simulation data', err);
      });
  };

  const handleEditSimulation = (simulationId) => {
    console.log(`Edit Simulation: ${simulationId}`);
    // Add logic to edit simulation
  };

  const handlePublishSimulation = (simulationId) => {
    console.log(`Publish Simulation: ${simulationId}`);
    setDisplaySelected('publish');
    // Add logic to publish simulation
  };

  const handleDeleteSimulation = (simulationId) => {
    console.log(`Delete Simulation: ${simulationId}`);
    // Add logic to delete simulation
  };

  const handleEditLoop = (loopId) => {
    console.log(`Edit Loop: ${loopId}`);
    handleCreateConsentModal(ConfirmDeleteSavedSimulation);
  };

  const handleDeleteLoop = (loopId) => {
    console.log(`Delete Loop: ${loopId}`);
    handleCreateConsentModal(ConfirmDeleteSavedLoop);
  };

  return (
    <div className='grid grid-rows-reg'>
      <article className='mb-2 grid grid-flow-col justify-between'>
        <div className='mb-2'>
          <h2 className='text-xl text-colour5 font-semibold'>
            Manage Simulations
          </h2>
        </div>
        <div>
          <button
            onClick={refreshUserData}
            className='w-8 h-8 text-colour5 hover:text-hover-grey'
            aria-label='Refresh Data'
          >
            <IoReloadCircle />
          </button>
        </div>
      </article>

      <section className='grid lg:grid-cols-2 gap-4'>
        {/* Simulations Section */}
        <section aria-labelledby='simulations-section'>
          <h4
            id='simulations-section'
            className='text-lg font-semibold text-colour5 mb-2'
          >
            Simulations
          </h4>
          <ul className='space-y-2' aria-live='polite'>
            {userSimulations.map((simulation) => (
              <li
                key={simulation.id}
                className='flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-200'
              >
                <span>{simulation.title}</span>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => handleEditSimulation(simulation.id)}
                    aria-label={`Edit Simulation: ${simulation.title}`}
                    title='Edit Simulation'
                  >
                    <IoPencilOutline className='w-6 h-6 text-colour2 hover:brightness-75' />
                  </button>
                  <button
                    onClick={() => handlePublishSimulation(simulation.id)}
                    aria-label={`Publish Simulation: ${simulation.title}`}
                    title='Publish Simulation'
                  >
                    <MdOutlinePublish className='w-6 h-6 text-colour2 hover:brightness-75' />
                  </button>
                  <button
                    onClick={() => handleDeleteSimulation(simulation.id)}
                    aria-label={`Delete Simulation: ${simulation.title}`}
                    title='Delete Simulation'
                  >
                    <TiDelete className='w-6 h-6 text-error-red hover:brightness-75' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Loops Section */}
        <section aria-labelledby='loops-section'>
          <h4
            id='loops-section'
            className='text-lg font-semibold text-colour5 mb-2'
          >
            Loops
          </h4>
          <ul className='space-y-2' aria-live='polite'>
            {userLoops.map((loop) => (
              <li
                key={loop.id}
                className='flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-200'
              >
                <span>{loop.title}</span>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => handleEditLoop(loop.id)}
                    aria-label={`Edit Loop: ${loop.title}`}
                    title='Edit Loop'
                  >
                    <IoPencilOutline className='w-6 h-6 text-colour2 hover:brightness-75' />
                  </button>
                  <button
                    onClick={() => handleDeleteLoop(loop.id)}
                    aria-label={`Delete Loop: ${loop.title}`}
                    title='Delete Loop'
                  >
                    <TiDelete className='w-6 h-6 text-error-red hover:brightness-75' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default SimuationAndLoopComponent;
