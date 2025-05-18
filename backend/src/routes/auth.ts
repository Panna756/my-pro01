import express from 'express';
import { signin, login } from '../controllers/authController';
import checkAuthFields from '../middlewares/checkAuthFields';

const router = express.Router();

router.post('/register', checkAuthFields, signin);
router.post('/login', checkAuthFields, login);

export default router;