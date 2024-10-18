import { Router } from 'express';
const authRoute = require('../controllers/AuthenticationController');

const router = Router();

// Route for user registration
router.post('/register', authRoute.register);

// Route for user login
router.post('/login', authRoute.login);

export default router;
