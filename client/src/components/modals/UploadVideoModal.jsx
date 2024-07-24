import React, { useContext } from 'react';
// Context
import { SimulationContext } from '../../context/SimulationContext';

function UploadVideoModal({ closeUploadVideoModal }) {
  const { selectedVideo, setSelectedVideo } = useContext(SimulationContext);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file); // You can replace this with any action you want to perform with the file
    setSelectedVideo(file);
  };

  return (
    <section className='grid outline outline-main-colour outline-2 rounded-lg z-20 bg-secondary-colour md:w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='py-2 px-4'>
        <div className='text-center'>
          <h4 className='text-lg'>Upload Video</h4>
          <div className='pt-1'>
            <p className='text-sm'>
              Video can be played under the simulation design canvas to assist
              with plotting.
            </p>
          </div>
        </div>

        <section className='py-4'>
          <div>
            <section className='pl-2 py-1 grid grid-cols-rev gap-2'>
              <div className='grid gap-2'>
                <label htmlFor='videoFile' className='text-sm'>
                  Select Video
                </label>
                <input
                  type='file'
                  id='videoFile'
                  accept='video/*'
                  onChange={handleFileChange}
                  className='cursor-pointer'
                />
              </div>

              <div className='grid items-center'>
                <button className='outline outline-1 outline-main-colour bg-secondary-colour active:scale-95 px-4 py-2 w-full rounded-lg hover:text-secondary-colour hover:bg-main-colour'>
                  Add
                </button>
              </div>
            </section>
          </div>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={closeUploadVideoModal}
              className='bg-main-colour active:scale-95 px-4 sm:px-10 py-2 w-full rounded-lg hover:brightness-90'
            >
              Close
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default UploadVideoModal;
