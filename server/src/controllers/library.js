// Domain
import {
  findAllLibraryPublications,
  findPublicationBySimulationId,
  publishNewSimulation,
} from '../domain/library.js';
import { findSimulationById } from '../domain/simulations.js';
// Errors
import { myEmitterErrors } from '../event/errorEvents.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';
// Responses
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const getAllLibraryPublicationsHandler = async (req, res) => {
  try {
    const foundPublications = await findAllLibraryPublications();

    if (!foundPublications) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.publicationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { libraryFiles: foundPublications });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(
      req.user,
      `Get all library simulations failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
export const publishSimulationHandler = async (req, res) => {
  const { simulationId } = req.params;
  const { title, description, imageUrl } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return sendDataResponse(res, 400, {
      message: 'Missing user ID.',
    });
  }

  if (!simulationId) {
    return sendDataResponse(res, 400, {
      message: 'Missing simulation ID.',
    });
  }

  if (!title || !description || !imageUrl) {
    return sendDataResponse(res, 400, {
      message: 'Missing required fields: title, description, or imageUrl.',
    });
  }

  try {
    const foundSimulation = await findSimulationById(simulationId);

    if (!foundSimulation) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.publicationNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // Check if the simulation is already published
    const existingPublication = await findPublicationBySimulationId(
      simulationId
    );

    if (existingPublication) {
      return sendDataResponse(res, 400, {
        message: 'Simulation is already published.',
      });
    }

    const publishedSimulation = await publishNewSimulation(
      simulationId,
      title,
      description,
      imageUrl,
      userId
    );

    if (!publishedSimulation) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.createPublicationFail
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 201, { publication: publishedSimulation });
  } catch (err) {
    const serverError = new ServerErrorEvent(
      req.user,
      `Publishing simulation failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
