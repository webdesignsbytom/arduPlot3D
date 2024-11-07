// Domain
import { findAllLibraryPublications } from '../domain/library.js';
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
