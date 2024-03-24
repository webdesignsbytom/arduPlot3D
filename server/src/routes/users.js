import { Router } from 'express';
import {
  getAllUsers,
  postNewScore,
} from '../controllers/users.js';
import {
  validateAuthentication,
  validateAdminRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/get-all-users', getAllUsers);
// router.post('/register', registerNewUser);
// router.get('/user/email/:email', getUserByEmail);
// router.get('/user/username/:username', getUserByUsername);
// router.delete('/delete/:userId', deleteUser);

export default router;
