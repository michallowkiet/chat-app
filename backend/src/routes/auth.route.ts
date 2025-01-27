import { login, logout, signup } from '@/controllers/auth.controller.js';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/login', login);

authRoutes.post('/signup', signup);

authRoutes.get('/logout', logout);

export default authRoutes;
