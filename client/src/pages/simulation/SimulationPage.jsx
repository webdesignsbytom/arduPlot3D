import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
import SimulationPageMainContainer from '../../components/simulation/SimulationPageMainContainer';

function SimulationPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Simulation"
        desc={`Discover the best simulations provided by ${CompanyName}. Enhance your gaming experience with our top-rated simulation tools.`}
        keywords="simulation, game tools, gaming enhancements, simulation routines"
        additionalMeta={[
          { property: 'og:title', content: `Simulation - ${CompanyName}` },
          { property: 'og:description', content: `Explore top simulations and tools to optimize your gaming experience.` },
          { property: 'og:image', content: 'https://localhost:9000/simulations/preview.jpg' }, // A relevant simulation preview image
          { property: 'og:url', content: 'https://yourwebsite.com/simulations' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Simulation - ${CompanyName}` },
          { name: 'twitter:description', content: `Discover advanced simulation tools for enhanced gaming.` },
          { name: 'twitter:image', content: 'https://localhost:9000/simulations/preview.jpg' },
        ]}
      />

      {/* Page start */}
      <div className="grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen">
        <Navbar />

        {/* Main */}
        <SimulationPageMainContainer />
      </div>
    </>
  );
}

export default SimulationPage;
