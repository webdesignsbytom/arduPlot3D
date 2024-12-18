import React, { useContext, useState } from 'react';
// Api
import client from '../../api/client';
// Context
import { UserContext } from '../../context/UserContext';
import { useModalContext } from '../../context/ModalContext';
// Constants
import { PUBLISH_SIMULATION_API } from '../../utils/Constants';

function PublishSimulationModal() {
  const { user } = useContext(UserContext);
  const { handleClosePublishModal } = useModalContext();
  const [userSimulations, setUserSimulations] = useState([]);

  const handlePublishNewSimulation = () => {
    client
      .patch(`${PUBLISH_SIMULATION_API}/${user.id}/:simulationId`)
      .then((res) => {
        console.log(res.data.data.libraryFiles);
        setUserSimulations(res.data.data.simulations);
      })
      .catch((err) => {
        console.error('Unable to retrieve simulation data', err);
      });

    handleClosePublishModal();
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    console.log('value', value);
  };

  return (
    <section className='grid outline outline-main-colour outline-2 z-20 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='py-2 px-4'>
        <div className='text-center'>
          <h4 className='text-lg'>Publish to Library</h4>
        </div>

        <section className='py-4'>
          <div className='grid w-full gap-2'>
            <div className='w-full'>
              <select
                name='file_type'
                id='file_type'
                className='w-full outline outline-1 outline-main-colour px-1 rounded-md shadow-lg'
              >
                {userSimulations.map((file, index) => {
                  return (
                    <option
                      key={index}
                      value={file.name}
                      aria-label={`${file.title} option`}
                    >
                      {file.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </section>

        <section className='grid gap-2 pb-4'>
          <div className='my-2'>
            <h4 className='text-sm leading-5'>
              Add a desciption or readme style paragraph to allow other users to
              make full use.
            </h4>
          </div>
          <div className='grid'>
            <textarea
              className='outline outline-1 w-full outline-black p-1 rounded-md shadow-lg'
              onChange={handleDescriptionChange}
              name='description'
              id='description'
            ></textarea>
          </div>
        </section>

        <section className='grid grid-cols-2 gap-6 mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={handleClosePublishModal}
              className='grid bg-warning w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
              aria-label='Close modal button'
            >
              Close
            </button>
          </div>
          <div className='grid justify-center'>
            <button
              onClick={handlePublishNewSimulation}
              className='grid bg-main-colour w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
              aria-label='Publish simulation to public library'
            >
              Publish
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default PublishSimulationModal;
