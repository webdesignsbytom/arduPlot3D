import { Router } from 'express';
import {
  getAllSimulationsHandler,
  getAllUsersSimulationsHandler,
  getSimulationByIdHandler,
  createNewSimulationHandler,
  saveSimulationHandler,
  publishSimulationHandler,
  deleteSimulationHandler,
} from '../controllers/simulations.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get(
  '/all-simulations',
  validateAuthentication,
  validateDeveloperRole,
  getAllSimulationsHandler
);
router.get(
  '/user/get-all-user-simulations',
  validateAuthentication,
  getAllUsersSimulationsHandler
);
router.get(
  '/user/get-simulation-by-id/:simulationId',
  validateAuthentication,
  getSimulationByIdHandler
);

router.post('/user/create-new-simulation', validateAuthentication, createNewSimulationHandler);
router.post('/user/save-simulation/:userId', saveSimulationHandler);

router.patch(
  '/user/publish-simulation-to-library/:userId/:simulationId',
  publishSimulationHandler
);
router.delete('/user/delete-simulation/:simulationId', deleteSimulationHandler);

export default router;
