import { initxyMovementSpeed, initzMovementSpeed } from './SpeedUtils';

export const tempDesignData = {
  simulationTitle: '',
  mainSimulationDataPoints: [
    {
      dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 1,
      yPos: 0,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 2,
      yPos: 0,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 3,
      yPos: 0,
      xySpeed: initxyMovementSpeed,
      timeLength: 0,
    },
    {
      dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
      xPos: 4,
      yPos: 0,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
      startxPos: 5,
      startyPos: 0,
      finishxPos: 0,
      finishyPos: 0,
      xySpeed: initxyMovementSpeed,
      zSpeed: initzMovementSpeed,
      numFingers: 1,
      timeLength: 0,
    },
    {
      dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
      timeoutLength: 0, // milliseconds only
    },
  ],
  simulationLoops: [
    {
      loopTitle: 'Loop 1',
      mainSimulationLoopDataPoints: [
        {
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 2,
          yPos: 1,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 2,
          yPos: 2,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 2,
          yPos: 3,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 2,
          yPos: 4,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'drag', // Tap, Move, MoveTap, Drag, Timeout
          startxPos: 2,
          startyPos: 5,
          finishxPos: 0,
          finishyPos: 0,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          timeoutLength: 0, // milliseconds only
        },
      ],
      loopTimeToComplete: 1230,
    },
    {
      loopTitle: 'Loop 2',
      mainSimulationLoopDataPoints: [
        {
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 3,
          yPos: 1,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 3,
          yPos: 2,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 0,
          yPos: 0,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 0,
          yPos: 0,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
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
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          timeoutLength: 0, // milliseconds only
        },
      ],
      loopTimeToComplete: 1230,
    },
    {
      loopTitle: 'Loop 3',
      mainSimulationLoopDataPoints: [
        {
          dataType: 'tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 1,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 2,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
          dataType: 'move', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 3,
          xySpeed: initxyMovementSpeed,
          timeLength: 0,
        },
        {
          dataType: 'move_tap', // Tap, Move, MoveTap, Drag, Timeout
          xPos: 4,
          yPos: 4,
          xySpeed: initxyMovementSpeed,
          zSpeed: initzMovementSpeed,
          numFingers: 1,
          timeLength: 0,
        },
        {
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
          dataType: 'timeout', // Tap, Move, MoveTap, Drag, Timeout
          timeoutLength: 0, // milliseconds only
        },
      ],
      loopTimeToComplete: 1230,
    },
  ],
  simulationTimeToComplete: 0,
};