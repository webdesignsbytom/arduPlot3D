import bcrypt from 'bcrypt';
import dbClient from '../src/utils/dbClient.js';

// Seed data
const users = [
  { email: 'tom@gmail.com', id: 'test', role: 'USER' },
  { email: 'admin@admin.com', role: 'ADMIN', id: 'admin' },
  { email: 'dev@dev.com', role: 'DEVELOPER', id: 'dev' },
];

const events = [
  {
    type: 'ERROR',
    topic: 'Test event',
    code: 500,
    content: '500 test content',
  },
  { type: 'USER', topic: 'Test event', code: 200, content: '200 test content' },
  {
    type: 'ADMIN',
    topic: 'Test event',
    code: 201,
    content: '201 test content',
  },
  {
    type: 'VISITOR',
    topic: 'Test event',
    code: 201,
    content: '201 test content',
  },
  {
    type: 'DEVELOPER',
    topic: 'Test event',
    code: 201,
    content: '201 test content',
  },
];

async function seed() {
  try {
    // Validate environment variables
    if (!process.env.SEED_PASSWORD || !process.env.SALT_ROUNDS) {
      throw new Error(
        'Environment variables SEED_PASSWORD and SALT_ROUNDS are required'
      );
    }

    // Hash the seed password
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const password = await bcrypt.hash(process.env.SEED_PASSWORD, saltRounds);

    // Create users
    for (const user of users) {
      await dbClient.user.create({
        data: {
          id: user.id,
          email: user.email,
          password,
          role: user.role || 'USER',
        },
      });
    }

    // Creating a simulation for the test user
    const simulation = await dbClient.simulation.create({
      data: {
        id: 'testSim',
        title: 'Temp Sim 1',
        fullSimulation: JSON.stringify([
          {
            dataGroup: 'simulation',
            dataType: 'tap',
            xPos: 10,
            yPos: 20,
            zSpeed: 'initzMovementSpeed',
            numFingers: 1,
            timeLength: 0,
          },
          {
            dataGroup: 'simulation',
            dataType: 'move_tap',
            xPos: 22,
            yPos: 20,
            xySpeed: 'initxyMovementSpeed',
            zSpeed: 'initzMovementSpeed',
            numFingers: 1,
            timeLength: 0,
          },
          {
            dataGroup: 'simulation',
            dataType: 'move',
            xPos: 33,
            yPos: 40,
            xySpeed: 'initxyMovementSpeed',
            timeLength: 0,
          },
          {
            dataGroup: 'simulation',
            dataType: 'move_tap',
            xPos: 42,
            yPos: 20,
            xySpeed: 'initxyMovementSpeed',
            zSpeed: 'initzMovementSpeed',
            numFingers: 1,
            timeLength: 0,
          },
          {
            dataGroup: 'simulation',
            dataType: 'timeout',
            xPos: 88,
            yPos: 77,
            timeoutLength: 0,
          },
        ]),
        timeToComplete: 500000,
        isVisibleInLibrary: false,
        userId: 'dev',
      },
    });

    // Creating loops associated with the simulation
    await Promise.all([
      dbClient.loop.create({
        data: {
          title: 'Loop 1',
          fullLoop: JSON.stringify([
            {
              dataGroup: 'loop',
              dataType: 'tap',
              xPos: 23,
              yPos: 13,
              zSpeed: 'initzMovementSpeed',
              numFingers: 1,
              timeLength: 0,
            },
            {
              dataGroup: 'loop',
              dataType: 'move_tap',
              xPos: 22,
              yPos: 23,
              xySpeed: 'initxyMovementSpeed',
              zSpeed: 'initzMovementSpeed',
              numFingers: 1,
              timeLength: 0,
            },
            {
              dataGroup: 'loop',
              dataType: 'move',
              xPos: 24,
              yPos: 32,
              xySpeed: 'initxyMovementSpeed',
              timeLength: 0,
            },
            {
              dataGroup: 'loop',
              dataType: 'move_tap',
              xPos: 24,
              yPos: 44,
              xySpeed: 'initxyMovementSpeed',
              zSpeed: 'initzMovementSpeed',
              numFingers: 1,
              timeLength: 0,
            },
          ]),
          timeToComplete: 1230,
          userId: 'dev',
          dataGroup: 'simulation', // Added the missing dataGroup field
        },
      }),
      dbClient.loop.create({
        data: {
          title: 'Loop 3',
          fullLoop: JSON.stringify([
            {
              dataGroup: 'loop',
              dataType: 'tap',
              xPos: 49,
              yPos: 19,
              zSpeed: 'initzMovementSpeed',
              numFingers: 1,
              timeLength: 0,
            },
            {
              dataGroup: 'loop',
              dataType: 'move_tap',
              xPos: 64,
              yPos: 62,
              xySpeed: 'initxyMovementSpeed',
              zSpeed: 'initzMovementSpeed',
              numFingers: 1,
              timeLength: 0,
            },
            {
              dataGroup: 'loop',
              dataType: 'move',
              xPos: 46,
              yPos: 53,
              xySpeed: 'initxyMovementSpeed',
              timeLength: 0,
            },
            {
              dataGroup: 'loop',
              dataType: 'move_tap',
              xPos: 64,
              yPos: 164,
              xySpeed: 'initxyMovementSpeed',
              zSpeed: 'initzMovementSpeed',
              numFingers: 1,
              timeLength: 0,
            },
            {
              dataGroup: 'loop',
              dataType: 'timeout',
              xPos: 88,
              yPos: 77,
              timeoutLength: 0,
            },
          ]),
          timeToComplete: 1230,
          userId: 'dev',
          dataGroup: 'simulation', // Added the missing dataGroup field
        },
      }),
    ]);

    // Create events
    for (const event of events) {
      await dbClient.event.create({
        data: event,
      });
    }
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await dbClient.$disconnect();
  }
}

seed().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
