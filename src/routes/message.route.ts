import { Router } from 'express';
import {
  getUsers,
  getMessagesByUserId,
  sendMessage,
} from '../controllers/message.controller';
import { protectedRoute } from '../middleware/auth.middleware';

const messageRoutes = Router();

messageRoutes.get('/users', protectedRoute, getUsers);
messageRoutes.get('/:receiverId', protectedRoute, getMessagesByUserId);
messageRoutes.post('/send/:receiverId', protectedRoute, sendMessage);

export default messageRoutes;
