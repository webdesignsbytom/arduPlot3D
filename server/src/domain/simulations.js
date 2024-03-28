import dbClient from '../utils/dbClient.js';

export const findAllSimulations = () =>
  dbClient.simulation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  
export const findAllUsersSimulations = (userId) =>
  dbClient.simulation.findMany({
    where: {
      userId: userId,
    },
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
export const findSimulationByTitle = (simulationTitle) =>
  dbClient.simulation.findFirst({
    where: {
      title: simulationTitle,
    },
  });

export const createSimulation = (
  userId,
  simulationTitle,
  mainSimulationDataPoints,
  simulationLoops,
  simulationTimeToComplete
) =>
  dbClient.simulation.create({
    data: {
      userId: userId,
      title: simulationTitle,
      fullSimulation: JSON.stringify(mainSimulationDataPoints),
      timeToComplete: simulationTimeToComplete,
      loops: {
        createMany: {
          data: simulationLoops.map((loop) => ({
            title: loop.loopTitle,
            dataGroup: loop.dataGroup,
            fullLoop: JSON.stringify(loop.mainSimulationLoopDataPoints),
            timeToComplete: loop.loopTimeToComplete,
          })),
        },
      },
    },
  });

export const updateSimulation = (
  id,
  simulationTitle,
  mainSimulationDataPoints,
  simulationLoops,
  simulationTimeToComplete
) =>
  dbClient.simulation.update({
    where: { id: id },
    data: {
      title: simulationTitle,
      fullSimulation: JSON.stringify(mainSimulationDataPoints),
      timeToComplete: simulationTimeToComplete,
      loops: {
        createMany: {
          data: simulationLoops.map((loop) => ({
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
