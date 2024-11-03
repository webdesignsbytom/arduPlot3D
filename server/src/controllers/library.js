import { findAllLibrarySimulations } from '../domain/simulations.js';
import { myEmitterErrors } from '../event/errorEvents.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';
import { EVENT_MESSAGES, sendDataResponse, sendMessageResponse } from '../utils/responses.js';

export const getAllLibrarySimulations = async (req, res) => {
    try {
      const foundSimulations = await findAllLibrarySimulations();
  
      if (!foundSimulations) {
        const notFound = new NotFoundEvent(
          req.user,
          EVENT_MESSAGES.notFound,
          EVENT_MESSAGES.simulationNotFound
        );
        myEmitterErrors.emit('error', notFound);
        return sendMessageResponse(res, notFound.code, notFound.message);
      }

      return sendDataResponse(res, 200, { libraryFiles: foundSimulations });
    } catch (err) {
      //
      const serverError = new ServerErrorEvent(req.user, `Get all library simulations failed`);
      myEmitterErrors.emit('error', serverError);
      sendMessageResponse(res, serverError.code, serverError.message);
      throw err;
    }
  };