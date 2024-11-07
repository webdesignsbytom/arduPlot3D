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

export const findListOfSimulations = (userId) =>
  dbClient.simulation.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      title: true,
    },
  });
  
export const findListOfLoops = (userId) =>
  dbClient.loop.findMany({
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

export const findSimulationTitle = (title) =>
  dbClient.simulation.findFirst({
    where: {
      title: title,
    },
    include: {
      loops: true,
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

export const findSimulationByTitle = (title) =>
  dbClient.simulation.findFirst({
    where: {
      title: title,
    },
  });
  
  export const createSimulation = (
    userId,
    title,
    mainSimulationDataPoints,
    loops,
    timeToComplete
  ) =>
    dbClient.simulation.create({
      data: {
        userId: userId,
        title: title,
        fullSimulation: JSON.stringify(mainSimulationDataPoints), // Still store this as a JSON string if intended
        timeToComplete: timeToComplete,
        loops: {
          create: loops.map((loop) => ({
            title: loop.loopTitle,
            fullLoop: JSON.stringify(loop.mainSimulationLoopDataPoints), // Stringify nested data points if necessary
            timeToComplete: loop.timeToComplete,
            dataGroup: 'loop',
          })),
        },
      },
      include: {
        loops: true,
      },
    });
    
    export const deleteAllLoopsFromSimulation = (id) =>
        dbClient.loop.deleteMany({
          where: { simulationId: id },
      });
    export const updateSimulation = (
      id,
  title,
  mainSimulationDataPoints,
  loops,
  timeToComplete
) =>
  dbClient.simulation.update({
    where: { id: id },
    data: {
      title: title,
      fullSimulation: JSON.stringify(mainSimulationDataPoints),
      timeToComplete: timeToComplete,
      loops: {
        createMany: {
          data: loops.map((loop) => ({
            title: loop.loopTitle,
            dataGroup: loop.dataGroup,
            fullLoop: JSON.stringify(loop.mainSimulationLoopDataPoints),
            timeToComplete: loop.timeToComplete,
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
