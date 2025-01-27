import logger from '@/lib/logger.js';
import authRoutes from '@routes/auth.route.js';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import morgan from 'morgan';
import { connectToMongoDB } from './lib/mongoDB.js';

const PORT = process.env.PORT ?? 3000;

const app: Express = express();

// Middleware to enable CORS and parse JSON bodies
app.use(morgan('common'));
app.use(cors({ origin: '*' }));
app.use(express.json());

// Define your routes here
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, async () => {
  await connectToMongoDB();
  logger.info(`Server is running on port ${PORT}`);
});
