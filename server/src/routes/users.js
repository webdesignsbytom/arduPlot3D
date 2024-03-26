import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
} from '../controllers/users.js';
import {
  validateAuthentication,
  validateAdminRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/get-all-users', getAllUsers);
router.post('/register',);
router.get('/user/email/:email', getUserByEmail);
router.delete('/delete/:userId', deleteUser);

export default router;
