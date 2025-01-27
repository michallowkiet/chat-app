import { connect } from 'mongoose';
import logger from './logger.js';

const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? '';
const MONGO_USERNAME = process.env.MONGO_USERNAME ?? '';
const MONGO_URI = process.env.MONGO_URI ?? '';

const MONGO_URL = MONGO_URI.replace('<db_username>', MONGO_USERNAME).replace(
  '<db_password>',
  MONGO_PASSWORD,
);

const connectToMongoDB = async () => {
  try {
    await connect(MONGO_URL);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
  }
};

export { connectToMongoDB };
