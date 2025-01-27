import logger from '@/lib/logger.js';
import User, { createUser } from '@/models/user.model.js';
import { generateJWTToken, hashPassword } from '@/services/auth.service.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const signup = async (req: Request, res: Response): Promise<any> => {
  const { fullName, email, password } = req.body;

  try {
    // Validate the input fields
    if (!fullName || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: { message: 'All fields are required' },
      });
    }

    if (!email.includes('@')) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: { message: 'Invalid email format' } });
    }

    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: { message: 'Password must be at least 8 characters long' },
      });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: { message: 'Email already exists' } });
    }

    // hash the password
    const hashedPassword = await hashPassword(password); // Implement your password hashing logic here
    // Save the user to the database
    const user = await createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    if (user._id) {
      // Generate a JWT token for the user
      const token = await generateJWTToken(user._id, res);
      // Send the JWT token in the response

      return res.status(StatusCodes.CREATED).json({
        success: true,
        data: {
          user,
          token,
        },
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message, {
        service: 'auth',
        method: 'signup',
        trace: error.stack,
      });

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: { message: 'An internal server error occurred' } });
    }

    logger.error('An unknown error occurred', {
      service: 'auth',
      method: 'signup',
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: { message: 'An unknown error occurred' } });
  }
};

const login = (req: Request, res: Response) => {
  res.send('login');
};

const logout = (req: Request, res: Response) => {
  res.send('logout');
};

export { login, logout, signup };
