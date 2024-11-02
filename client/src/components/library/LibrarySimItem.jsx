import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Constants
import { LIBRARY_VOTE_API } from '../../utils/Constants';

function LibrarySimItem({ simulation }) {
  const [userRating, setUserRating] = useState(simulation.rating || 0); // Initialize with existing rating or 0

  const handleRating = (rating) => {
    setUserRating(rating);

    client
      .patch(`${LIBRARY_VOTE_API}/${rating}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error('Unable to vote on simulation', err);
      });
  };

  // Render stars for rating
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => handleRating(star)}
        className={`cursor-pointer ${
          star <= userRating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <article className='grid grid-rows-reg outline outline-black outline-1 rounded-xl shadow-lg overflow-hidden bg-white'>
      {/* Header Section with Title and Download Button */}
      <section className='grid grid-cols-3 gap-2 w-full border-b-2 border-solid border-gray-300 px-4 py-2 bg-gray-100 items-center'>
        <div className='col-span-2'>
          <h4 className='font-semibold text-lg text-main-colour'>
            {simulation.label}
          </h4>
          <p className='text-sm text-gray-600'>By {simulation.author}</p>
        </div>
        <div className='flex justify-end'>
          <button className='px-3 py-1 bg-main-colour text-white outline-none outline-2 active:scale-95 no__highlights hover:bg-yellow-400 rounded-lg'>
            DOWNLOAD
          </button>
        </div>
      </section>

      {/* Main Content Section with Image and Description */}
      <section className='px-4 py-4 grid grid-cols-5 gap-4 items-start'>
        <div className='col-span-2 flex justify-center items-center'>
          <img
            src={simulation.imageUrl}
            alt={simulation.label}
            className='rounded-lg w-full h-auto'
          />
        </div>
        <div className='col-span-3'>
          <p className='text-sm text-gray-700'>{simulation.description}</p>
        </div>
      </section>

      {/* Footer Section with Star Rating */}
      <section className='px-4 py-2 grid grid-cols-2 gap-2 border-t border-gray-300 bg-gray-50'>
        <div className='flex items-center text-sm text-gray-600'>
          <span className='font-semibold'>Rating:</span>
          <div className='ml-2'>{renderStars()}</div> {/* Render star rating */}
        </div>
        <div className='flex justify-end text-sm text-gray-500'>
          <span>Category: Simulation</span>
        </div>
      </section>
    </article>
  );
}

export default LibrarySimItem;
