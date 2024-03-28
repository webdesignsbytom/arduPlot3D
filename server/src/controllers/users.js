import bcrypt from 'bcrypt';
// Components
import { createVerificationInDB, createPasswordResetInDB } from './utils.js';
// Emitters
import { myEmitterUsers } from '../event/userEvents.js';
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  findAllUsers,
  findUserByEmail,
  findUserById,
  deleteUserById,
  createUser,
} from '../domain/users.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';
import {
  NotFoundEvent,
  ServerErrorEvent,
  MissingFieldEvent,
  RegistrationServerErrorEvent,
  BadRequestEvent,
} from '../event/utils/errorUtils.js';
// Password hash
const hashRate = 8;

export const getAllUsers = async (req, res) => {
  console.log('getAllUsers');
  try {
    const foundUsers = await findAllUsers();

    if (!foundUsers) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.userNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { users: foundUsers });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Get all users`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getUserById = async (req, res) => {
  console.log('getUserById');
  const { userId } = req.params;
  
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

    delete foundUser.password;
    delete foundUser.agreedToTerms;

    // myEmitterUsers.emit('get-user-by-id', req.user);
    return sendDataResponse(res, 200, { user: foundUser });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Get user by ID`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getUserByEmail = async (req, res) => {
  console.log('getUserByEmail');
  const { email } = req.params;
  console.log('xxx', email);

  const lowerCaseEmail = email.toLowerCase();
  try {
    const foundUser = await findUserByEmail(lowerCaseEmail);

    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.userNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    console.log('found', foundUser);
    delete foundUser.password;
    delete foundUser.agreedToTerms;

    myEmitterUsers.emit('get-user-by-id', req.user);
    return sendDataResponse(res, 200, { user: foundUser });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Get user by ID`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const registerNewUser = async (req, res) => {
  console.log('create new user');

  const { email, password, agreedToTerms } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  try {
    // Check missing data
    if (!lowerCaseEmail || !password) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Registration: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // Check if unique names exist
    const foundUser = await findUserByEmail(lowerCaseEmail);

    if (foundUser) {
      return sendDataResponse(res, 400, { email: EVENT_MESSAGES.emailInUse });
    }

    // Encode password
    const hashedPassword = await bcrypt.hash(password, hashRate);

    // Create user
    const createdUser = await createUser(
      lowerCaseEmail,
      hashedPassword,
    );

    if (!createdUser) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createUserFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    delete createdUser.password;
    delete createdUser.updatedAt;

    return sendDataResponse(res, 202, { createdUser: createdUser });
  } catch (err) {
    // Error
    const serverError = new RegistrationServerErrorEvent(
      `Register Server error`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};


export const deleteUser = async (req, res) => {
  console.log('deleteUser');
  const userId = req.params.userId;

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

    await deleteUserById(userId);

    const updatedUserArray = await findAllUsers();

    return sendDataResponse(res, 202, {
      deletedUser: foundUser,
      updatedUserArray: updatedUserArray,
      message: `User ${foundUser.email} deleted`,
    });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `delete user by ID`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
