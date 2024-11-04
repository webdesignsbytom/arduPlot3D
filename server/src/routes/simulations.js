import { Router } from 'express';
import {
  handleGetAllSimulations,
  handleGetAllUsersSimulations,
  handleGetSimulationById,
  handleCreateNewSimulation,
  handleSaveSimulation,
  handlePublishSimulation,
  handleDeleteSimulation,
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
  handleGetAllSimulations
);
router.get(
  '/user/get-all-user-simulations',
  validateAuthentication,
  handleGetAllUsersSimulations
);
router.get(
  '/user/get-simulation-by-id/:simulationId',
  validateAuthentication,
  handleGetSimulationById
);

router.post('/user/create-new-simulation', handleCreateNewSimulation);
router.post('/user/save-simulation/:userId', handleSaveSimulation);

router.patch(
  '/user/publish-simulation-to-library/:userId/:simulationId',
  handlePublishSimulation
);
router.delete('/user/delete-simulation/:simulationId', handleDeleteSimulation);

export default router;
