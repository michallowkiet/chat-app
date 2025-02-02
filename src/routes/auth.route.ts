import { Router } from 'express';
import {
  login,
  signup,
  logout,
  checkAuth,
} from '../controllers/auth.controller';
import { protectedRoute } from '../middleware/auth.middleware';

const authRoutes = Router();

authRoutes.post('/login', login);

authRoutes.post('/signup', signup);

authRoutes.post('/logout', logout);

authRoutes.get('/check-auth', protectedRoute, checkAuth);

export default authRoutes;
