import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import logger from './logger.js';

const connectToCloudinary = async () => {
  try {
    logger.info('Connecting to Cloudinary...', { service: 'cloudinary' });

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    logger.info('Connected to Cloudinary', { service: 'cloudinary' });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Failed to connect to Cloudinary', {
        services: 'cloudinary',
        method: 'connectToCloudinary',
        error: error.message,
      });
    }
  }
};

export { connectToCloudinary };

export default cloudinary;
