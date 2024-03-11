import dbClient from '../utils/dbClient.js';

export const findAllDesigns = () =>
  dbClient.design.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const findDesignById = (designId) =>
  dbClient.design.findFirst({
    where: {
      id: designId,
    },
  });

export const createDesign = (designString, userId) =>
  dbClient.design.create({
    data: {
      userId: userId,
      designString: designString,
    },
  });

export const deleteDesignById = (designId) =>
  dbClient.design.delete({
    where: {
      id: designId,
    },
  });
