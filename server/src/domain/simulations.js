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
      userId: userId,
      title: simulationTitle,
      fullSimulation: JSON.stringify(mainSimulationDataPoints),
      timeToComplete: simulationTimeToComplete, 
      loops: {
        createMany: {
          data: simulationLoops.map(loop => ({
            title: loop.loopTitle,
            dataGroup: loop.dataGroup,
            fullLoop: JSON.stringify(loop.mainSimulationLoopDataPoints), 
            timeToComplete: loop.loopTimeToComplete,
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
