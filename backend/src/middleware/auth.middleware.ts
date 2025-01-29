import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../lib/logger';
import User from '../models/user.model';
import { verifyJWTToken } from '../services/auth.service';
import { ChatAppRequest } from '../types/types';

// Middleware to check if the user is authenticated
const protectedRoute = async (
  req: ChatAppRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error('Token not found');
    }
    const decoded = await verifyJWTToken(token);

    if (!decoded) {
      throw new Error('Invalid token');
    }

    const user = await User.findOne({ _id: decoded.userId }).select(
      '-password',
    );

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error in protected route middleware', {
        service: 'auth.middleware',
        method: 'protectedRoute',
        error: error.message,
      });
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
  }
};

export { protectedRoute };
