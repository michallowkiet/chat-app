import {
  checkAuth,
  login,
  logout,
  signup,
} from '@/controllers/auth.controller.js';
import { protectedRoute } from '@/middleware/auth.middleware.js';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/login', login);

authRoutes.post('/signup', signup);

authRoutes.post('/logout', logout);

authRoutes.get('/check-auth', protectedRoute, checkAuth);

export default authRoutes;
