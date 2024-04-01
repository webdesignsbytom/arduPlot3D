import bcrypt from 'bcrypt';
import dbClient from '../src/utils/dbClient.js';

async function seed() {
  const password = await bcrypt.hash('123', 8);

  const testUser = await dbClient.user.create({
    data: {
      id: 'testUser',
      email: `xtombrock1989@gmail.com`,
      password,
    },
  });

  const devUser = await dbClient.user.create({
    data: {
      id: 'dev',
      email: 'dev@dev.com',
      password,
      role: 'DEVELOPER',
    },
  });

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
      userId: testUser.id,
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
        simulationId: simulation.id,
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
        simulationId: simulation.id,
        dataGroup: 'simulation', // Added the missing dataGroup field
      },
    }),
  ]);

  // EVENTS
  const eventOne = await dbClient.event.create({
    data: {
      type: 'ERROR',
      topic: 'Test event',
      code: 500,
      content: '500 test content',
    },
  });
  const eventTwo = await dbClient.event.create({
    data: {
      type: 'USER',
      topic: 'Test event',
      code: 200,
      content: '200 test content',
    },
  });
  const eventThree = await dbClient.event.create({
    data: {
      type: 'ADMIN',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
    },
  });
  const eventFour = await dbClient.event.create({
    data: {
      type: 'VISITOR',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
    },
  });
  const eventFive = await dbClient.event.create({
    data: {
      type: 'DEVELOPER',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
    },
  });
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
