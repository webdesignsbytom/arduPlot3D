import { Router } from 'express';
import {
  getAllLibrarySimulations,
} from '../controllers/library.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/get-all-library-simulations', getAllLibrarySimulations);

export default router;
