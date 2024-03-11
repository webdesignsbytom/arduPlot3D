import { Router } from 'express';
import {
  getAllDesigns,
  deleteDesign,
  getDesignById,
  createNewDesign,
} from '../controllers/designs.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/all-designs', getAllDesigns);
router.get('/design/:designId', getDesignById);
router.post('/create-new-design', createNewDesign);
router.delete('/delete-design-by-id/:designId', deleteDesign);

export default router;
