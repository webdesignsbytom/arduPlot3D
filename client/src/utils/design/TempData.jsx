import { initxyMovementSpeed, initzMovementSpeed } from './SpeedUtils';

export const blankLoopObject = {
  loopTitle: '',
  dataGroup: 'loop',
  mainSimulationLoopDataPoints: [],
  timeToComplete: 0,
};

export const blankSimulationObject = {
  title: '',
  mainSimulationDataPoints: [],
  loops: [],
  timeToComplete: 0,
};

let simAminationId = 1;

export const simulationAnimationObject = {
  title: '',
  mainSimulationDataPoints: [
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 222,
      yPos: 120,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 22,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 123,
      yPos: 33,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 66,
      yPos: 300,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 22,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 232,
      yPos: 232,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 311,
      yPos: 211,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 11,
      yPos: 111,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 99,
      yPos: 321,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: simAminationId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 222,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
  ],
  loops: [],
};

let blankSimId = 1;
export const blankSimulationAnimationObject = {
  title: '',
  mainSimulationDataPoints: [
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 222,
      yPos: 120,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 22,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 123,
      yPos: 33,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 66,
      yPos: 300,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 22,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 232,
      yPos: 232,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 311,
      yPos: 211,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 11,
      yPos: 111,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 99,
      yPos: 321,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: blankSimId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 222,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
  ],
  loops: [],
};

let tempDesignId = 1;
let tempLoopId = 1;

let loop1Id = 1;
let loop2Id = 1;
let loop3Id = 1;

export const tempDesignData = {
  title: 'Temp Sim 1',
  mainSimulationDataPoints: [
    {
      id: tempDesignId++,
      dataGroup: 'simulation',
      dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 10,
      yPos: 20,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: tempDesignId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 22,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: tempDesignId++,
      dataGroup: 'simulation',
      dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 33,
      yPos: 40,
      xySpeed: initxyMovementSpeed,
      timeLength: 0,
    },
    {
      id: tempDesignId++,
      dataGroup: 'simulation',
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 42,
      yPos: 20,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      id: tempDesignId++,
      dataGroup: 'simulation',
      dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 88,
      yPos: 77,
      timeoutLength: 0, // milliseconds only
    },
    {
      loopTitle: 'Loop 3',
      dataGroup: 'loop',
      mainSimulationLoopDataPoints: [
        {
          id: tempLoopId++,
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 49,
          yPos: 19,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: tempLoopId++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 64,
          yPos: 62,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: tempLoopId++,
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 46,
          yPos: 53,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
          id: tempLoopId++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 64,
          yPos: 164,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: tempLoopId++,
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      timeToComplete: 1230,
    },
  ],
  loops: [
    {
      loopTitle: 'Loop 1',
      dataGroup: 'loop',
      mainSimulationLoopDataPoints: [
        {
          id: loop1Id++,
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 23,
          yPos: 13,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop1Id++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 22,
          yPos: 23,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop1Id++,
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 24,
          yPos: 32,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
          id: loop1Id++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 24,
          yPos: 44,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop1Id++,
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      timeToComplete: 1230,
    },
    {
      loopTitle: 'Loop 2',
      dataGroup: 'loop',
      mainSimulationLoopDataPoints: [
        {
          id: loop2Id++,
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 35,
          yPos: 15,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop2Id++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 35,
          yPos: 25,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop2Id++,
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 9,
          yPos: 90,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
          id: loop2Id++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 90,
          yPos: 90,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop2Id++,
          dataGroup: 'loop',
          dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
          startxPos: 90,
          startyPos: 90,
          finishxPos: 80,
          finishyPos: 80,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop2Id++,
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      timeToComplete: 1230,
    },
    {
      loopTitle: 'Loop 3',
      dataGroup: 'loop',
      mainSimulationLoopDataPoints: [
        {
          id: loop3Id++,
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 1,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop3Id++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 2,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop3Id++,
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 3,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
          id: loop3Id++,
          dataGroup: 'loop',
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 4,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          id: loop3Id++,
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      timeToComplete: 1230,
    },
  ],
  timeToComplete: 0,
};
