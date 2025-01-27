import {
  getMessagesByUserId,
  getUsers,
  sendMessage,
} from '@/controllers/message.controller.js';
import { protectedRoute } from '@/middleware/auth.middleware.js';
import { Router } from 'express';

const messageRoutes = Router();

messageRoutes.get('/users', protectedRoute, getUsers);
messageRoutes.get('/:receiverId', protectedRoute, getMessagesByUserId);
messageRoutes.post('/send/:receiverId', protectedRoute, sendMessage);

export default messageRoutes;
