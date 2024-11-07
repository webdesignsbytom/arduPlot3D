import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Context
import { useUser } from '../../context/UserContext';
// Components
// Icons
import { MdOutlinePublish } from 'react-icons/md';
import { IoImageOutline } from 'react-icons/io5';
import LibrarySimItem from '../library/LibrarySimItem';

// Constants
const PUBLISH_SIMULATION_API = '/api/publish-simulation'; // Replace with actual API endpoint

function PublishSimulationComponent() {
  const { user } = useUser();

  const [simulationData, setSimulationData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    author: user?.name || 'Anonymous',
    rating: 0,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSimulationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        setSimulationData((prev) => ({
          ...prev,
          imageUrl: event.target.result, // For preview only
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    client
      .post(PUBLISH_SIMULATION_API, simulationData)
      .then((res) => {
        console.log('Simulation published:', res.data);
        setSimulationData({
          title: '',
          description: '',
          imageUrl: '',
          rating: 0,
          author: user?.name || 'Anonymous',
        });
        setPreviewImage(null);
      })
      .catch((err) => {
        console.error('Error publishing simulation:', err);
      })
      .finally(() => {
        setIsPublishing(false);
      });
  };

  return (
    <section className='container mx-auto p-4'>
      <h2 className='text-2xl font-semibold text-main-colour mb-4'>
        Publish a Simulation
      </h2>

      {/* Form Section */}
      <form className='grid gap-4 mb-6'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Simulation Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={simulationData.title}
            onChange={handleInputChange}
            placeholder='Enter simulation title'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-colour focus:ring-main-colour sm:text-sm'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={simulationData.description}
            onChange={handleInputChange}
            placeholder='Enter simulation description'
            rows='4'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-colour focus:ring-main-colour sm:text-sm'
          ></textarea>
        </div>

        <div>
          <label
            htmlFor='image'
            className='block text-sm font-medium text-gray-700'
          >
            Upload Image
          </label>
          <div className='mt-1 flex items-center'>
            <label
              htmlFor='image-upload'
              className='cursor-pointer flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-main-colour bg-white hover:bg-gray-50 focus:outline-none'
            >
              <IoImageOutline className='w-5 h-5 mr-2' />
              Upload Image
            </label>
            <input
              type='file'
              id='image-upload'
              name='image'
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <button
          type='button'
          onClick={handlePublish}
          disabled={isPublishing}
          className='inline-flex justify-center px-4 py-2 text-white bg-main-colour border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-main-hover-colour focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-colour'
        >
          {isPublishing ? 'Publishing...' : 'Publish Simulation'}
        </button>
      </form>

      {/* Preview Section */}
      <h3 className='text-xl font-semibold text-gray-700 mb-2'>Preview</h3>
      <div>
        <LibrarySimItem
          simulation={{
            label: simulationData.title || 'Simulation Title',
            description: simulationData.description || 'Simulation Description',
            imageUrl: previewImage || '',
            author: simulationData.author,
            rating: simulationData.rating,
          }}
        />
      </div>
    </section>
  );
}

export default PublishSimulationComponent;
