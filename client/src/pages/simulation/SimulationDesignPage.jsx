// import React, { useContext, useState } from 'react';
// // Api
// import client from '../../api/client';
// // Components
// import Navbar from '../../components/nav/Navbar';
// import ConsentModal from '../../components/modals/ConsentModal';
// import TapSettingsModal from '../../components/modals/TapSettingsModal';
// import MovementSettingsModal from '../../components/modals/MovementSettingsModal';
// import DragSettingsModal from '../../components/modals/DragSettingsModal';
// import UploadVideoModal from '../../components/modals/UploadVideoModal';
// import AddLoopToSimulationModal from '../../components/modals/AddLoopToSimulationModal';
// import DeviceSelectModal from '../../components/modals/DeviceSelectModal';
// import TimeoutSettingsModal from '../../components/modals/TimeoutSettingsModal';
// import SimulationDataToobar from '../../components/toolbars/SimulationDataToobar';
// import SimulationFunctionsToolbar from '../../components/toolbars/SimulationFunctionsToolbar';
// import SimulationPageTopToolBar from '../../components/toolbars/SimulationPageTopToolBar';
// import SaveAsModal from '../../components/modals/SaveAsModal';
// // Context
// import { SimulationContext } from '../../context/SimulationContext';
// import { UserContext } from '../../context/UserContext';
// // Configuration modal
// import { ConfirmCreateNewProject } from '../../utils/design/ConfrimMessages';
// import LoadSimulationModal from '../../components/modals/LoadSimulationModal';
// import PublishSimulationModal from '../../components/modals/PublishSimulationModal';
// import { SAVE_SIMULATION_API } from '../../utils/Constants';
// import SimulationDisplayComponent from '../../components/simulation/SimulationDisplayComponent';
// import { useModalContext } from '../../context/ModalContext';
// import ConnectToDeviceModal from '../../components/modals/ConnectToDeviceModal';
// import {
//   downloadFileToMachine,
//   loadSimulationFile,
//   saveAsNewFile,
// } from '../../utils/simulation/SimulationUtils';

// function SimulationDesignPage() {
//   const { user } = useContext(UserContext);
//   const {
//     setSimulationIsRunning,
//     setIsLandscapeMode,
//     simulationToolSelected,
//     numberOfFingerTapping,
//     setNumberOfFingerTapping,
//     speedOfFingerMoving,
//     setSpeedOfFingerMoving,
//     tapSettingsModalOpen,
//     setTapSettingsModalOpen,
//     movementSettingsModalOpen,
//     setMovementSettingsModalOpen,
//     speedOfArmMoving,
//     setSpeedOfArmMoving,
//     addCreateLoopModalOpen,
//     timeoutModalOpen,
//     setTimeoutModalOpen,
//     timeoutLength,
//     setTimeoutLength,
//     timeoutUnitSelected,
//     setTimeoutUnitSelected,
//     dragSettingsModalOpen,
//     setDragSettingsModalOpen,
//     speedOfDraggingArmMoving,
//     setSpeedOfDraggingArmMoving,
//     positionOfMouseAndCanvasVisible,
//     setpositionOfMouseAndCanvasVisible,
//     consentMessageVisible,
//     setConsentMessageVisible,
//     consentMessage,
//     setConsentMessage,
//     simulationData,
//   } = useContext(SimulationContext);
//   const { connectToDeviceModalOpen } = useModalContext();

//   // Video modal

//   // Device selection

//   // Save
//   const [saveAsModalOpen, setSaveAsModalOpen] = useState(false);
//   // Load
//   const [loadModalOpen, setLoadModalOpen] = useState(false);

//   // Left menu
//   const [userMenuIsOpen, setUserMenuIsOpen] = useState(true);
//   const [simulationDataIsOpen, setSimulationDataIsOpen] = useState(true);



//   // Open timeout settings modal
//   const openTimeoutSettingsModal = () => {
//     closeAllModalsMaster();
//     setTimeoutModalOpen(true);
//   };
//   const closeTimeoutSettingsModal = () => {
//     setTimeoutModalOpen(false);
//   };

//   // Open drag settings modal
//   const openDragSettingsModal = () => {
//     closeAllModalsMaster();
//     setDragSettingsModalOpen(true);
//   };
//   const closeDragSettingsModal = () => {
//     setDragSettingsModalOpen(false);
//   };

//   // Open movement settings modal
//   const openMovementSettingsModal = () => {
//     closeAllModalsMaster();
//     setMovementSettingsModalOpen(true);
//   };
//   const closeMovementSettingsModal = () => {
//     setMovementSettingsModalOpen(false);
//   };


//   // Close all modals master
//   const closeAllModalsMaster = () => {
//     setTapSettingsModalOpen(false);
//     setMovementSettingsModalOpen(false);
//     setDragSettingsModalOpen(false);
//     setTimeoutModalOpen(false);
//     setSaveAsModalOpen(false);
//     setLoadModalOpen(false);
//     setConsentMessageVisible(false);

//     setConsentMessageVisible('');
//     setConsentMessage('');
//   };

//   return (
//     <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
//       <Navbar />

//       {/* Main */}
//       <main
//         className={`relative grid h-full ${
//           userMenuIsOpen && !simulationDataIsOpen
//             ? 'grid-cols-reg'
//             : simulationDataIsOpen && !userMenuIsOpen
//             ? 'grid-cols-rev'
//             : userMenuIsOpen && simulationDataIsOpen
//             ? 'grid-cols-a1a'
//             : ''
//         } overflow-hidden`}
//       >
//         {/* Functions bar */}
//         <SimulationFunctionsToolbar
//           runSimulation={runSimulation}
//           stopSimulation={stopSimulation}
//           resetSimulationToStartingPoint={resetSimulationToStartingPoint}
//           createNewSimulationFile={createNewSimulationFile}
//           saveCurrentSimulationFile={saveCurrentSimulationFile}
//           openSaveAsModal={openSaveAsModal}
//           openTimeoutSettingsModal={openTimeoutSettingsModal}
//           openTapSettingsModal={openTapSettingsModal}
//           openMovementSettingsModal={openMovementSettingsModal}
//           openDragSettingsModal={openDragSettingsModal}
//           downloadFileToMachine={handleDownload}
//           saveAsNewFile={handleSaveAsNewFile}
//           openLoadModal={openLoadModal}
//           userMenuIsOpen={userMenuIsOpen}
//           setUserMenuIsOpen={setUserMenuIsOpen}
//         />

//         {/* canvas */}
//         <section className='grid grid-rows-reg gap-2 p-2 overflow-hidden'>
//           {/* Top tool bar menu */}
//           <SimulationPageTopToolBar
//             setSimulationLandScape={setSimulationLandScape}
//             setSimulationPortrait={setSimulationPortrait}
//             timeoutLength={timeoutLength}
//             timeoutUnitSelected={timeoutUnitSelected}
//             numberOfFingerTapping={numberOfFingerTapping}
//             simulationToolSelected={simulationToolSelected}
//             speedOfArmMoving={speedOfArmMoving}
//             speedOfDraggingArmMoving={speedOfDraggingArmMoving}
//             speedOfFingerMoving={speedOfFingerMoving}
//             toggleMousePositionDisplay={toggleMousePositionDisplay}
//             positionOfMouseAndCanvasVisible={positionOfMouseAndCanvasVisible}
//           />

//           {/* CANVAS container */}
//           <SimulationDisplayComponent
//             isResettingAnimation={isResettingAnimation}
//             userMenuIsOpen={userMenuIsOpen}
//             setUserMenuIsOpen={setUserMenuIsOpen}
//             simulationDataIsOpen={simulationDataIsOpen}
//             setSimulationDataIsOpen={setSimulationDataIsOpen}
//           />
//         </section>

//         {/* data bar */}
//         <section
//           className={`${
//             simulationDataIsOpen ? 'grid overflow-hidden' : 'hidden'
//           }`}
//         >
//           <section
//             className={`grid overflow-hidden h-full max-w-[300px] 2xl:max-w-[400px]`}
//           >
//             <SimulationDataToobar
//               setSimulationDataIsOpen={setSimulationDataIsOpen}
//             />
//           </section>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default SimulationDesignPage;
