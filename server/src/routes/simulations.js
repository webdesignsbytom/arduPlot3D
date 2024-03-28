import { Router } from 'express';
import {
  getAllSimulations,
  getSimulationById,
  createNewSimulation,
  saveSimulation,
  getAllUsersSimulations,
  deleteSimulation,
} from '../controllers/simulations.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/all-simulations', getAllSimulations);
router.get('/user/:userId/get-all-simulations', getAllUsersSimulations);
router.get('/user/get-simulation/:simulationId', getSimulationById);
router.post('/user/save-simulation/:userId', saveSimulation); // Save as function front end
router.post('/user/create-new-simulation/:userId', createNewSimulation); // Save as function front end
router.delete('/user/delete-simulation/:simulationId', deleteSimulation);

export default router;
