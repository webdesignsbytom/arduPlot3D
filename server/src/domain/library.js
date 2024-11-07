import dbClient from '../utils/dbClient.js';

export const findAllLibraryPublications = () =>
  dbClient.publication.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
