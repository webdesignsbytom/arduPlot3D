import { Router } from 'express';
import {
  getAllSimulations,
  deleteSimulation,
  getSimulationById,
  createNewSimulation,
  saveSimulation,
} from '../controllers/simulations.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/all-simulations', getAllSimulations);
router.get('/simulation/:simulationId', getSimulationById);
router.post('/user/save-simulation', saveSimulation); // Save as function front end
router.post('/user/create-new-simulation/:userId', createNewSimulation); // Save as function front end
router.delete('/delete-simulation-by-id/:simulationId', deleteSimulation);

export default router;
