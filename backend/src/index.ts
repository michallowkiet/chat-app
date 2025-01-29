import logger from '@/lib/logger.js';
import { connectToMongoDB } from '@/lib/mongoDB.js';
import profileRoutes from '@/routes/profile.route.js';
import authRoutes from '@routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import morgan from 'morgan';
import { connectToCloudinary } from './lib/cloudinary.js';
import { protectedRoute } from './middleware/auth.middleware.js';
import messageRoutes from './routes/message.route.js';

const PORT = process.env.PORT ?? 3000;

const app: Application = express();

// Middleware to enable CORS and parse JSON bodies
app.use(morgan('common'));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Define your routes here
app.use('/api/auth', authRoutes);
app.use('/api/profile', protectedRoute, profileRoutes);
app.use('/api/message', messageRoutes);

// Start the server
app.listen(PORT, async () => {
  await connectToMongoDB();
  await connectToCloudinary();
  logger.info(`Server is running on port ${PORT}`);
});
