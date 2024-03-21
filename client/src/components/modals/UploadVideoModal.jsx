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
    <section className='grid outline outline-yellow-400 outline-2 rounded-lg bg-white w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='p-2'>
        <div className='text-center'>
          <h4 className=''>Upload Video</h4>
          <div>
            <p>
              Video can be played under the simulation design canvas to assist
              with plotting.
            </p>
          </div>
        </div>

        <section className='mt-4 p-1'>
          <div>
            <label htmlFor='videoFile' className='text-sm'>
              Select Video
            </label>

            <div className='pl-2 py-1 grid grid-cols-rev gap-2'>
              <input
                type='file'
                id='videoFile'
                accept='video/*'
                onChange={handleFileChange}
                className=''
              />

              <div>
                <button className='outline outline-1 outline-yellow-400 bg-white active:scale-95 px-4 py-2 w-full rounded-lg'>
                  Add
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className='grid mt-4'>
          <div className='grid justify-center'>
            <button
              onClick={closeUploadVideoModal}
              className='bg-yellow-400 active:scale-95 px-4 py-2 w-full rounded-lg'
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
