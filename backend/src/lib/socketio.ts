import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import logger from './logger.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

const userSocketMap = new Map<string, string>();

// Return socket ID of a given user
export const getReceiverSocketId = (userId: string): string | undefined => {
  return userSocketMap.get(userId);
};

io.on('connection', (socket) => {
  logger.info(`User connected with socket ID ${socket.id}`);

  // Get user ID from the connection data or any other source
  const userId = socket.handshake.query.userId as string;

  if (!userId) {
    logger.warn('User ID not provided');
    return;
  }

  // Store the mapping between user ID and socket ID
  userSocketMap.set(userId, socket.id);
  logger.info(`User ${userId} connected with socket ID ${socket.id}`);

  socket.emit('getOnlineUsers', Array.from(userSocketMap.keys()));
  logger.info(`Online users: ${userSocketMap.size}`);

  // Handle disconnection event
  io.on('disconnect', () => {
    userSocketMap.delete(userId);
    logger.info(`User ${userId} disconnected`);
  });

  // Handle other events as needed
  io.on('error', (err) => {
    logger.error(`Socket.IO error: ${err.message}`);
  });
});

export { app, io, server };
