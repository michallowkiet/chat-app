import { updateProfile } from '@/controllers/profile.controller.js';
import { Router } from 'express';

const profileRoutes = Router();

profileRoutes.put('/update', updateProfile);

export default profileRoutes;
