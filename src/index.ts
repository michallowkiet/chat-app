import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { connectToCloudinary } from './lib/cloudinary';
import logger from './lib/logger';
import { connectToMongoDB } from './lib/mongoDB';
import { app, server } from './lib/socketio';
import { protectedRoute } from './middleware/auth.middleware';
import authRoutes from './routes/auth.route';
import messageRoutes from './routes/message.route';
import profileRoutes from './routes/profile.route';

const PORT = process.env.PORT ?? 3000;

// Middleware to enable CORS and parse JSON bodies
app.use(morgan('common'));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Define your routes here
app.use('/api/auth', authRoutes);
app.use('/api/profile', protectedRoute, profileRoutes);
app.use('/api/message', protectedRoute, messageRoutes);

// Start the server
server.listen(PORT, async () => {
  await connectToMongoDB();
  await connectToCloudinary();

  // Add dummy data for testing purposes
  // try {
  //   logger.info('Seeding dummy users...');
  //   await User.insertMany(seedUsers);
  //   logger.info('Dummy users seeded successfully');
  // } catch (error) {
  //   logger.error('Error seeding users:', error);
  // }

  logger.info(`Server is running on port ${PORT}`);
});
