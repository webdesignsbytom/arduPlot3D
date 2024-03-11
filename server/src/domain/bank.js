import dbClient from '../utils/dbClient.js';

export const createBankForUser = (userId) =>
  dbClient.bank.create({
    data: {
      userId: userId,
    },
  });

export const chargePackToBankAccount = (userId, cost) =>
  dbClient.bank.update({
    where: {
      userId: userId,
    },
    data: {
      funds: {
        decrement: cost,
      },
    },
  });
