import React from 'react'
// Components
import Navbar from '../../components/nav/Navbar'
import { HelmetItem } from '../../components/utils/HelmetItem'
// Constants
import { CompanyName } from '../../utils/Constants'
import SimulationPageMainContainer from '../../components/simulation/SimulationPageMainContainer'

function SimulationPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Simulation'} desc={`Simulation page of ${CompanyName}.`} />

      {/* Page start */}
      <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />

        {/* Main */}
        <SimulationPageMainContainer />
      </div>
    </>
  )
}

export default SimulationPage