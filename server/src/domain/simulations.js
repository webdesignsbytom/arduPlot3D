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

export const createSimulation = (simulationString, userId) =>
  dbClient.simulation.create({
    data: {
      userId: userId,
      simulationString: simulationString,
    },
  });

export const deleteSimulationById = (simulationId) =>
  dbClient.simulation.delete({
    where: {
      id: simulationId,
    },
  });
