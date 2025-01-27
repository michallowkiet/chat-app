import cloudinary from '@/lib/cloudinary.js';
import logger from '@/lib/logger.js';
import User from '@/models/user.model.js';
import { ChatAppRequest } from '@/types/types.js';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const updateProfile = async (
  req: ChatAppRequest,
  res: Response,
): Promise<any> => {
  try {
    const { profilePicture } = req.body;

    // Check if the user exists
    if (!req.user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    // Check if the profile picture is provided
    if (!profilePicture) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Profile picture is required' });
    }

    // Update the user's profile data
    const uploadResponse = await cloudinary.uploader.upload(profilePicture);

    // Update the user's profile data in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        profilePicture: uploadResponse.secure_url,
      },
      { new: true },
    ).select('-password');

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    logger.error('Error updating profile:', {
      controller: 'profile.controller.ts',
      method: 'updateProfile',
      error,
    });

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};
export { updateProfile };
