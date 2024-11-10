import dbClient from '../utils/dbClient.js';

export const findAllLibraryPublications = () =>
  dbClient.publication.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const findPublicationBySimulationId = (simulationId) =>
  dbClient.publication.findUnique({
    where: {
      simulationId: simulationId,
    },
  });

export const publishNewSimulation = (simulationId, title, description, imageUrl, userId) =>
  dbClient.publication.create({
    data: {
      simulationId,
      title,
      description,
      imageUrl,
      authorId: userId,
    }
  });
