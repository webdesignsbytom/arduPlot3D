// Emitters
import { myEmitterErrors } from '../event/errorEvents.js';
// Domain
import {
  createSimulation,
  deleteSimulationById,
  findAllSimulations,
  findSimulationById,
} from '../domain/simulations.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';
import {
  BadRequestEvent,
  NotFoundEvent,
  ServerErrorEvent,
} from '../event/utils/errorUtils.js';
import { findUserById } from '../domain/users.js';

export const getAllSimulations = async (req, res) => {
  console.log('get all simulations');

  try {
    const foundSimulations = await findAllSimulations();
    console.log('found simulations:', foundSimulations);

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
    const serverError = new ServerErrorEvent(req.user, `Get all simulations`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Get simulation by id
export const getSimulationById = async (req, res) => {
  console.log('getSimulationById');
  const { simulationId } = req.params;
  console.log('simulationId', simulationId);

  try {
    const foundSimulation = await findSimulationById(simulationId);
    console.log('found simulation', foundSimulation);

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
    const serverError = new ServerErrorEvent(req.user, `Get all simulations`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const saveSimulation = async (req, res) => {};

export const createNewSimulation = async (req, res) => {
  console.log('creating new simulation');
  const { simulationData } = req.body;
  const { userId } = req.params;

  console.log('simulationData', simulationData);
  console.log('userId', userId);
  
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

    const createdSimulation = await createSimulation(simulationString, userId);

    if (!createdSimulation) {
      const badRequest = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createSimulationFail
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    console.log('createdSimulation', createdSimulation);
    return sendDataResponse(res, 201, { createdSimulation: createdSimulation });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Create new simulation`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// delete simulation
export const deleteSimulation = async (req, res) => {
  console.log('deleteOpenSimulation');
  console.log('req', req.params);
  const simulationId = req.params.simulationId;
  console.log('simulationId', simulationId);

  try {
    const foundSimulation = await findSimulationById(simulationId);
    console.log('foundSimulation card', foundSimulation);

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
    const serverError = new ServerErrorEvent(req.user, `Create simulation`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
