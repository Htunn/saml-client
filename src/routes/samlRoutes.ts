import { Router } from 'express';
import { login, acs, metadata, logout } from '../controllers/samlController';

const router = Router();

router.get('/login', login);
router.post('/acs', acs);
router.get('/metadata', metadata);
router.get('/logout', logout); // Add this line for logout

export default router;