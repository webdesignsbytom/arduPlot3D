import dbClient from '../utils/dbClient.js';

export const findAllSimulations = () =>
  dbClient.simulation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
export const findAllLibrarySimulations = () =>
  dbClient.simulation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      isVisibleInLibrary: true,
    },
    include: {
      user: true, // if you want to include user details
      loops: true, // if you want to include details about loops associated with the simulation
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

export const updateSimulationVisibility = (simulationId, visibility) =>
  dbClient.simulation.update({
    where: {
      id: simulationId,
    },
    data: {
      isVisibleInLibrary: visibility,
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
      fullSimulation: JSON.stringify(mainSimulationDataPoints), // Still store this as a JSON string if intended
      timeToComplete: simulationTimeToComplete,
      loops: {
        create: simulationLoops.map((loop) => ({
          title: loop.loopTitle,
          fullLoop: JSON.stringify(loop.mainSimulationLoopDataPoints), // Stringify nested data points if necessary
          timeToComplete: loop.loopTimeToComplete,
          dataGroup: 'loop',
        })),
      },
    },
    include: {
      loops: true
    }
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
