// Emitters
import { myEmitterErrors } from '../event/errorEvents.js';
// Domain
import {
  createSimulation,
  deleteSimulationById,
  findAllSimulations,
  findAllUsersSimulations,
  findListOfSimulations,
  findSimulationById,
  findSimulationTitle,
  updateSimulation,
  updateSimulationVisibility,
} from '../domain/simulations.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';
import {
  BadRequestEvent,
  MissingFieldEvent,
  NoPermissionEvent,
  NotFoundEvent,
  ServerErrorEvent,
} from '../event/utils/errorUtils.js';
import { findUserById } from '../domain/users.js';

export const getAllSimulationsHandler = async (req, res) => {
  const userRole = req.user?.role;

  try {
    if (userRole !== 'ADMIN' && userRole !== 'DEVELOPER') {
      const badRequest = new BadRequestEvent(
        req.user,
        'Unauthorized access',
        'You are not authorized to use this route.'
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    const foundSimulations = await findAllSimulations();

    if (!foundSimulations) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.simulationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { simulations: foundSimulations });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(
      req.user,
      `Get all simulations failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getAllUsersSimulationsHandler = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return sendDataResponse(res, 400, {
      message: 'Missing user ID.',
    });
  }

  try {
    const foundUser = await findUserById(userId);

    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.userNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const foundSimulations = await findAllUsersSimulations(userId);

    if (!foundSimulations) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.simulationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }
    return sendDataResponse(res, 200, { simulations: foundSimulations });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(
      req.user,
      `Get all user simulations failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getUserSimulationsListHandler = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return sendDataResponse(res, 400, {
      message: 'Missing user ID.',
    });
  }

  try {
    const foundUser = await findUserById(userId);

    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.userNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const foundSimulations = await findListOfSimulations(userId);

    if (!foundSimulations) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.simulationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { simulations: foundSimulations });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(
      req.user,
      `Get user simulations list failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Get simulation by id
export const getSimulationByIdHandler = async (req, res) => {
  const { simulationId } = req.params;

  try {
    const foundSimulation = await findSimulationById(simulationId);

    if (!foundSimulation) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.simulationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { simulation: foundSimulation });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Get simulation by id failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Get simulation by id
export const getSimulationByTitleHandler = async (req, res) => {
  const { title } = req.params;

  try {
    const foundSimulation = await findSimulationTitle(title);

    if (!foundSimulation) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.simulationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { simulation: foundSimulation });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Get simulation by id failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewSimulationHandler = async (req, res) => {
  const packagedData = req.body;
  const userId = req.user.id;

  if (!userId) {
    return sendDataResponse(res, 400, {
      message: 'Missing user ID.',
    });
  }

  try {
    if (!packagedData) {
      const badRequest = new BadRequestEvent(
        null,
        EVENT_MESSAGES.missingSimulationData
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    const foundUser = await findUserById(userId);
    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.userNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const mainSimulationDataPoints = JSON.parse(
      packagedData.mainSimulationDataPoints
    );

    const simulationLoops = JSON.parse(packagedData.simulationLoops);

    // Create the simulation in the database with nested loops
    const createdSimulation = await createSimulation(
      userId,
      packagedData.simulationTitle,
      mainSimulationDataPoints,
      simulationLoops,
      packagedData.simulationTimeToComplete
    );

    console.log('createdSimulation', createdSimulation);

    if (!createdSimulation) {
      const badRequest = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createSimulationFail
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    return sendDataResponse(res, 201, { createdSimulation: createdSimulation });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Create new simulation failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const saveSimulationHandler = async (req, res) => {
  const {
    id,
    simulationTitle,
    mainSimulationDataPoints,
    simulationLoops,
    simulationTimeToComplete,
  } = req.body;

  const { userId } = req.params;

  try {
    if (
      !userId ||
      !simulationTitle ||
      !mainSimulationDataPoints ||
      !simulationLoops ||
      !simulationTimeToComplete
    ) {
      const missingField = new MissingFieldEvent(
        req.user,
        EVENT_MESSAGES.missingFields,
        EVENT_MESSAGES.simulationFieldMissing
      );

      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const foundSimulation = await findSimulationById(id);

    const foundUser = await findUserById(userId);

    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.userNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    simulationLoops.forEach((element) => {
      console.log('element', element);
    });

    if (foundSimulation) {
      const updatedSimulation = await updateSimulation(
        id,
        simulationTitle,
        mainSimulationDataPoints,
        simulationLoops,
        simulationTimeToComplete
      );

      if (!updatedSimulation) {
        const badRequest = new BadRequestEvent(
          req.user,
          EVENT_MESSAGES.badRequest,
          EVENT_MESSAGES.updateSimulationFail
        );
        myEmitterErrors.emit('error', badRequest);
        return sendMessageResponse(res, badRequest.code, badRequest.message);
      }

      return sendDataResponse(res, 201, { savedSimulation: updatedSimulation });
    } else if (!foundSimulation) {
      const createdSimulation = await createSimulation(
        userId,
        simulationTitle,
        mainSimulationDataPoints,
        simulationLoops,
        simulationTimeToComplete
      );

      if (!createdSimulation) {
        const badRequest = new BadRequestEvent(
          req.user,
          EVENT_MESSAGES.badRequest,
          EVENT_MESSAGES.createSimulationFail
        );
        myEmitterErrors.emit('error', badRequest);
        return sendMessageResponse(res, badRequest.code, badRequest.message);
      }

      return sendDataResponse(res, 201, {
        createdSimulation: createdSimulation,
      });
    }
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Create new simulation failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Publish Simulation
export const publishSimulationHandler = async (req, res) => {
  const { simulationId, userId } = req.params;
  const { visibility } = req.body;
  try {
    const foundSimulation = await findSimulationById(simulationId);

    if (!foundSimulation) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.simulationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    if (userId !== foundSimulation.userId) {
      const notPermitted = new NoPermissionEvent(
        req.user,
        EVENT_MESSAGES.NoPermissionEvent,
        EVENT_MESSAGES.unableToComplete
      );
      myEmitterErrors.emit('error', notPermitted);
      return sendMessageResponse(res, notPermitted.code, notPermitted.message);
    }

    const updatedSimulation = await updateSimulationVisibility(
      simulationId,
      visibility
    );

    return sendDataResponse(res, 201, { updatedSimulation: updatedSimulation });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Delete simulation failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// delete simulation
export const deleteSimulationHandler = async (req, res) => {
  const { simulationId } = req.params;

  try {
    const foundSimulation = await findSimulationById(simulationId);

    if (!foundSimulation) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.simulationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const deletedSimulation = await deleteSimulationById(simulationId);
    if (!deletedSimulation) {
      const notDeleted = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.simulationNotDeleted
      );
      myEmitterErrors.emit('error', notDeleted);
      return sendMessageResponse(res, notDeleted.code, notDeleted.message);
    }

    return sendDataResponse(res, 202, { deletedSimulation: deletedSimulation });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Delete simulation failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
