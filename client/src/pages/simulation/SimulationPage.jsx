import React, { useContext } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import SimulationPageMainContainer from '../../components/simulation/SimulationPageMainContainer';
// Constants
import { CompanyName } from '../../utils/Constants';
// Context
import { SimulationContext } from '../../context/SimulationContext';
// Data
import { simulationPageAdditionalMeta, simulationPageStructuredData } from '../../utils/data/PageData';

const SimulationPage = React.memo(() => {
  const { simulationData } = useContext(SimulationContext) 

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName={simulationData?.name || 'Simulation'}
        desc={`${simulationData?.description}. Discover the best robot path simulations provided by ${CompanyName}.`}
        keywords={`simulation, ${simulationData?.name}, robot path, movement sequence, ${CompanyName}`}
        additionalMeta={simulationPageAdditionalMeta(simulationData)}
        structuredData={simulationPageStructuredData(simulationData)}
      />

      {/* Page start */}
      <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
        <Navbar />

        {/* Main */}
        <SimulationPageMainContainer />
      </div>
    </>
  );
});

export default SimulationPage;
