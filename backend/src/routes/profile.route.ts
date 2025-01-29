import { Router } from 'express';
import { updateProfile } from '../controllers/profile.controller';

const profileRoutes = Router();

profileRoutes.put('/update', updateProfile);

export default profileRoutes;
