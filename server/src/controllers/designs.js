// Emitters
import { myEmitterErrors } from '../event/errorEvents.js';
// Domain
import {
  createDesign,
  deleteDesignById,
  findAllDesigns,
  findDesignById,
} from '../domain/designs.js';
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

export const getAllDesigns = async (req, res) => {
  console.log('get all designs');

  try {
    const foundDesigns = await findAllDesigns();
    console.log('found designs:', foundDesigns);

    if (!foundDesigns) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.designNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }
    return sendDataResponse(res, 200, { designs: foundDesigns });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all designs`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Get design by id
export const getDesignById = async (req, res) => {
  console.log('getDesignById');
  const { designId } = req.params;
  console.log('designId', designId);

  try {
    const foundDesign = await findDesignById(designId);
    console.log('found design', foundDesign);

    if (!foundDesign) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.designNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { design: foundDesign });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Get all designs`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewDesign = async (req, res) => {
  console.log('creating new design');
  const { designString, userId } = req.body;
  console.log('designString, userId', designString, userId);

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

    const createdDesign = await createDesign(designString, userId);

    if (!createdDesign) {
      const badRequest = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createDesignFail
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    console.log('createdDesign', createdDesign);
    return sendDataResponse(res, 201, { createdDesign: createdDesign });

  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Create new design`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// delete design
export const deleteDesign = async (req, res) => {
  console.log('deleteOpenDesign');
  console.log('req', req.params);
  const designId = req.params.designId;
  console.log('designId', designId);

  try {
    const foundDesign = await findDesignById(designId);
    console.log('foundDesign card', foundDesign);

    if (!foundDesign) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.designNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const deletedDesign = await deleteDesignById(designId);
    if (!deletedDesign) {
      const notDeleted = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.designNotDeleted
      );
      myEmitterErrors.emit('error', notDeleted);
      return sendMessageResponse(res, notDeleted.code, notDeleted.message);
    }

    return sendDataResponse(res, 202, { deletedDesign: deletedDesign });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Create design`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
