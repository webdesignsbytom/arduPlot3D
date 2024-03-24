import dbClient from '../utils/dbClient.js';

export const findAllSimulations = () =>
  dbClient.simulation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const findSimulationById = (simulationId) =>
  dbClient.simulation.findFirst({
    where: {
      id: simulationId,
    },
  });

  export const createSimulation = (userId, simulationTitle, mainSimulationDataPoints, simulationLoops, simulationTimeToComplete) =>
  dbClient.simulation.create({
    data: {
      title: simulationTitle,
      fullSimulation: JSON.stringify(mainSimulationDataPoints), // Assuming this is how you store simulation data points
      totalTime: simulationTimeToComplete, // Set this accordingly based on your logic
      userId: userId,
      // Use the `createMany` operator under `loops` for nested creation
      loops: {
        createMany: {
          data: simulationLoops.map(loop => ({
            title: loop.loopTitle,
            dataGroup: loop.dataGroup,
            fullLoop: JSON.stringify(loop.mainSimulationLoopDataPoints), // Example structure; adjust based on actual structure
            totalTime: loop.loopTimeToComplete,
          })),
        },
      },
    },
  });


export const deleteSimulationById = (simulationId) =>
  dbClient.simulation.delete({
    where: {
      id: simulationId,
    },
  });
