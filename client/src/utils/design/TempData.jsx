import { initxyMovementSpeed, initzMovementSpeed } from './SpeedUtils';

export const blankLoopObject = {
  loopTitle: '',
  mainSimulationLoopDataPoints: [],
  loopTimeToComplete: 0,
};

export const tempDesignData = {
  simulationTitle: 'Temp Sim 1',
  mainSimulationDataPoints: [
    {
      dataGroup: 'simulation',
      dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 10,
      yPos: 20,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
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
      dataGroup: 'simulation',
      dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 33,
      yPos: 40,
      xySpeed: initxyMovementSpeed,
      timeLength: 0,
    },
    {
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
      dataGroup: 'simulation',
      dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
      startxPos: 352,
      startyPos: 20,
      finishxPos: 0,
      finishyPos: 0,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
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
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 49,
          yPos: 19,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 46,
          yPos: 53,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
          startxPos: 111,
          startyPos: 116,
          finishxPos: 0,
          finishyPos: 0,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      loopTimeToComplete: 1230,
    },
  ],
  simulationLoops: [
    {
      loopTitle: 'Loop 1',
      dataGroup: 'loop',
      mainSimulationLoopDataPoints: [
        {
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 23,
          yPos: 13,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 24,
          yPos: 32,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
          startxPos: 22,
          startyPos: 55,
          finishxPos: 0,
          finishyPos: 0,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      loopTimeToComplete: 1230,
    },
    {
      loopTitle: 'Loop 2',
      dataGroup: 'loop',
      mainSimulationLoopDataPoints: [
        {
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 35,
          yPos: 15,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 9,
          yPos: 90,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      loopTimeToComplete: 1230,
    },
    {
      loopTitle: 'Loop 3',
      dataGroup: 'loop',
      mainSimulationLoopDataPoints: [
        {
          dataGroup: 'loop',
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 1,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 3,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
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
          dataGroup: 'loop',
          dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
          startxPos: 0,
          startyPos: 0,
          finishxPos: 0,
          finishyPos: 0,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataGroup: 'loop',
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 88,
          yPos: 77,
          timeoutLength: 0, // milliseconds only
        },
      ],
      loopTimeToComplete: 1230,
    },
  ],
  simulationTimeToComplete: 0,
};
