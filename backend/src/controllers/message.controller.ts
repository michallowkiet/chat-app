import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import cloudinary from '../lib/cloudinary';
import logger from '../lib/logger';
import { getReceiverSocketId, io } from '../lib/socketio';
import Message from '../models/message.model';
import User from '../models/user.model';
import { ChatAppRequest } from '../types/types';

const getUsers = async (req: ChatAppRequest, res: Response) => {
  try {
    const users = await User.find({ _id: { $ne: req.user?._id } }).select(
      '-password -__v',
    );
    res.status(StatusCodes.OK).json({ success: true, users: users });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message, {
        service: 'message.controller',
        method: 'getUsers',
        stack: error.stack,
      });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
};

const getMessagesByUserId = async (req: ChatAppRequest, res: Response) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user?._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).select('-__v');

    res.status(StatusCodes.OK).json({ success: true, messages });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message, {
        service: 'message.controller',
        method: 'getMessagesByUserId',
        stack: error.stack,
      });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
};

const sendMessage = async (req: ChatAppRequest, res: Response) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user?._id;
    const { content, image } = req.body;

    let imageUrl = null;

    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }

    const message = await Message.create({
      senderId,
      receiverId,
      content,
      imageUrl,
    });

    const receiverSockedId = getReceiverSocketId(receiverId);
    if (receiverSockedId) {
      io.to(receiverSockedId).emit('newMessage', message);
    }

    res.status(StatusCodes.CREATED).json({ success: true, message });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message, {
        service: 'message.controller',
        method: 'sendMessage',
        stack: error.stack,
      });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
};

export { getMessagesByUserId, getUsers, sendMessage };
