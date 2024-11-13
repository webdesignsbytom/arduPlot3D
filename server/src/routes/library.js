import { Router } from 'express';
import {
  getAllLibraryPublicationsHandler,
  publishSimulationHandler,
} from '../controllers/library.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { uploadToMinio } from '../middleware/minio.js';

const router = Router();

router.get('/get-all-library-publications', getAllLibraryPublicationsHandler);
router.post('/publish-new-simulation/:simulationId', validateAuthentication, uploadToMinio, publishSimulationHandler);

export default router;
