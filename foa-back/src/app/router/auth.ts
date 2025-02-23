//file to create route for auth

import express from 'express';
import { checkSession, login, register } from '../handler/auth/lcrHandle';
import authenticate from '../middleware/authenticate';

const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post('/checkSession', authenticate, checkSession);

export default authRoutes;