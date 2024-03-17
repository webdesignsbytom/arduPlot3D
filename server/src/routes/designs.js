import { Router } from 'express';
import {
  getAllDesigns,
  deleteDesign,
  getDesignById,
  createNewSimulation,
  saveSimulation,
} from '../controllers/designs.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/all-designs', getAllDesigns);
router.get('/design/:designId', getDesignById);
router.post('/create-new-simulation', createNewSimulation); // Save as function front end
router.post('/save-simulation', saveSimulation); // Save as function front end
router.delete('/delete-design-by-id/:designId', deleteDesign);

export default router;
