import { Router } from 'express';
import {
  getAllLibraryPublicationsHandler,
  publishSimulationHandler,
} from '../controllers/library.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/get-all-library-publications', getAllLibraryPublicationsHandler);
router.post('/publish-new-simulation/:simulationId', publishSimulationHandler);

export default router;
