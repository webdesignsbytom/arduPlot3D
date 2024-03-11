import bcrypt from 'bcrypt';
import dbClient from '../src/utils/dbClient.js';

async function seed() {

  const testUser = await dbClient.user.create({
    data: {
      username: 'barbie',
      score: 115
    },
  });

  const testUser2 = await dbClient.user.create({
    data: {
      username: 'oppenhiemer',
      score: 110
    },
  });

  const testUser3 = await dbClient.user.create({
    data: {
      username: 'github',
      score: 100
    },
  });

  const testUser4 = await dbClient.user.create({
    data: {
      username: 'tyler',
      score: 77
    },
  });

  const testUser5 = await dbClient.user.create({
    data: {
      username: 'jeff',
      score: 55
    },
  });
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
