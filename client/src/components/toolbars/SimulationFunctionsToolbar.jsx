import React, { useContext } from 'react';
// Icons
import { FaArrowAltCircleLeft } from 'react-icons/fa';
// Context
import { useModalContext } from '../../context/ModalContext';
import { SimulationContext } from '../../context/SimulationContext';

function SimulationFunctionsToolbar({
  openTimeoutSettingsModal,
  openTapSettingsModal,
  openMovementSettingsModal,
  openDragSettingsModal,
  openDeviceSelectModal,
  openUploadVideoModal,
  downloadFileToMachine,
  openLoadModal,
  openPublishModal,
  userMenuIsOpen,
  setUserMenuIsOpen,
}) {
  const {
    toggleConnectToDeviceModal,
    handleOpenNewSimulationModal,
    handleOpenSaveAsModal,
  } = useModalContext();

  const {
    runSimulation,
    stopSimulation,
    handleResetSimulationToStartingPoint,
    handleSaveSimulation,
  } = useContext(SimulationContext);

  // Close this container
  const hideContainer = () => {
    setUserMenuIsOpen(false);
  };

  // Lists of user functions
  const simulationActions = [
    { label: 'Run Simulation', onClick: runSimulation },
    { label: 'Stop Simulation', onClick: stopSimulation },
    {
      label: 'Reset Simulation',
      onClick: handleResetSimulationToStartingPoint,
    },
  ];

  const fileActions = [
    { label: 'New Simulation', onClick: handleOpenNewSimulationModal },
    { label: 'Save', onClick: handleSaveSimulation },
    { label: 'Save As', onClick: handleOpenSaveAsModal },
    { label: 'Load File', onClick: openLoadModal },
  ];

  const downloadActions = [
    { label: 'Download', onClick: downloadFileToMachine },
    { label: 'Connect Device', onClick: toggleConnectToDeviceModal },
  ];

  const settingsActions = [
    { label: 'Tap Settings', onClick: openTapSettingsModal },
    { label: 'Move Settings', onClick: openMovementSettingsModal },
    { label: 'Drag Settings', onClick: openDragSettingsModal },
    { label: 'Timeout Settings', onClick: openTimeoutSettingsModal },
  ];

  const deviceActions = [
    { label: 'Device Select', onClick: openDeviceSelectModal },
    { label: 'Dimensions', onClick: () => {} },
    { label: 'Custom', onClick: () => {} },
    { label: 'Offset', onClick: () => {} },
    { label: 'Layout', onClick: () => {} },
  ];

  const videoActions = [
    { label: 'Upload Video', onClick: openUploadVideoModal },
  ];

  const publishActions = [
    { label: 'Publish Simulation', onClick: openPublishModal },
  ];

  const renderActions = (actions) => (
    <ul>
      {actions.map(({ label, onClick }, index) => (
        <li
          key={index}
          className='cursor-pointer hover:text-gray-600 active:scale-95 no__highlights'
          onClick={onClick}
        >
          {label}
        </li>
      ))}
    </ul>
  );

  return (
    <section className='bg-secondary-colour h-full grid grid-rows-reg w-fit max-w-[350px] border-r-2 border-solid border-black px-1 py-2 overflow-hidden'>
      <div className='p-2'>
        {/* Header data */}
        <article className='grid grid-cols-rev gap-4 mb-2'>
          <div className='grid items-center'>
            <h2 className='font-semibold text-xl text-center'>
              Simulation Tools
            </h2>
          </div>

          <div className='grid items-center justify-center'>
            <FaArrowAltCircleLeft
              onClick={hideContainer}
              title='Hide'
              className='hover:brightness-90 cursor-pointer text-main-colour'
              size={20}
            />
          </div>
        </article>

        {/* Divider */}
        <div className='w-full h-[1px] bg-slate-400'></div>

        {/* Tools */}
        <section className='text-sm 2xl:text-base'>
          <div className='py-2'>{renderActions(simulationActions)}</div>

          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-400'></div>

          <section className='py-2'>{renderActions(fileActions)}</section>

          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-400'></div>

          <section className='py-2'>{renderActions(downloadActions)}</section>

          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-400'></div>

          <section className='py-2'>{renderActions(settingsActions)}</section>

          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-400'></div>

          <section className='py-2'>{renderActions(deviceActions)}</section>

          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-400'></div>

          <section className='py-2'>{renderActions(videoActions)}</section>

          {/* Divider */}
          <div className='w-full h-[1px] bg-slate-400'></div>

          <section className='py-2'>{renderActions(publishActions)}</section>
        </section>
      </div>
    </section>
  );
}

export default SimulationFunctionsToolbar;
