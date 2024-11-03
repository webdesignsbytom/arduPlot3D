import React from 'react';
import SimulationDataToobar from '../toolbars/SimulationDataToobar';
import SimulationFunctionsToolbar from '../toolbars/SimulationFunctionsToolbar';
import SimulationPageTopToolBar from '../toolbars/SimulationPageTopToolBar';
import SimulationDisplayComponent from './SimulationDisplayComponent';

function SimulationPageMainContainer() {
  return (
    <>
      {/* Main */}
      <main
        className={`relative grid h-full ${
          userMenuIsOpen && !simulationDataIsOpen
            ? 'grid-cols-reg'
            : simulationDataIsOpen && !userMenuIsOpen
            ? 'grid-cols-rev'
            : userMenuIsOpen && simulationDataIsOpen
            ? 'grid-cols-a1a'
            : ''
        } overflow-hidden`}
      >
        {/* Functions bar */}
        <SimulationFunctionsToolbar
          runSimulation={runSimulation}
          stopSimulation={stopSimulation}
          resetSimulationToStartingPoint={resetSimulationToStartingPoint}
          createNewSimulationFile={createNewSimulationFile}
          saveCurrentSimulationFile={saveCurrentSimulationFile}
          openSaveAsModal={openSaveAsModal}
          openTimeoutSettingsModal={openTimeoutSettingsModal}
          openTapSettingsModal={openTapSettingsModal}
          openMovementSettingsModal={openMovementSettingsModal}
          openDragSettingsModal={openDragSettingsModal}
          openDeviceSelectModal={openDeviceSelectModal}
          openUploadVideoModal={openUploadVideoModal}
          downloadFileToMachine={handleDownload}
          saveAsNewFile={handleSaveAsNewFile}
          openLoadModal={openLoadModal}
          openPublishModal={openPublishModal}
          userMenuIsOpen={userMenuIsOpen}
          setUserMenuIsOpen={setUserMenuIsOpen}
        />

        {/* canvas */}
        <section className='grid grid-rows-reg gap-2 p-2 overflow-hidden'>
          {/* Top tool bar menu */}
          <SimulationPageTopToolBar
            setSimulationLandScape={setSimulationLandScape}
            setSimulationPortrait={setSimulationPortrait}
            timeoutLength={timeoutLength}
            timeoutUnitSelected={timeoutUnitSelected}
            numberOfFingerTapping={numberOfFingerTapping}
            simulationToolSelected={simulationToolSelected}
            speedOfArmMoving={speedOfArmMoving}
            speedOfDraggingArmMoving={speedOfDraggingArmMoving}
            speedOfFingerMoving={speedOfFingerMoving}
            toggleMousePositionDisplay={toggleMousePositionDisplay}
            positionOfMouseAndCanvasVisible={positionOfMouseAndCanvasVisible}
          />

          {/* CANVAS container */}
          <SimulationDisplayComponent
            isResettingAnimation={isResettingAnimation}
            userMenuIsOpen={userMenuIsOpen}
            setUserMenuIsOpen={setUserMenuIsOpen}
            simulationDataIsOpen={simulationDataIsOpen}
            setSimulationDataIsOpen={setSimulationDataIsOpen}
          />
        </section>

        {/* data bar */}
        <section
          className={`${
            simulationDataIsOpen ? 'grid overflow-hidden' : 'hidden'
          }`}
        >
          <section
            className={`grid overflow-hidden h-full max-w-[300px] 2xl:max-w-[400px]`}
          >
            <SimulationDataToobar
              setSimulationDataIsOpen={setSimulationDataIsOpen}
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default SimulationPageMainContainer;
