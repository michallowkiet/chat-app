import logger from '@/lib/logger.js';
import { IUser } from '@/types/types.js';
import { Model, model, Schema } from 'mongoose';

const UserSchema = new Schema<IUser, Model<IUser>>(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    profilePicture: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const User = model('User', UserSchema);

const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error creating user: ${error.message}`);
      throw new Error(error.message);
    } else {
      logger.error('An unknown error occurred');
      throw new Error('An unknown error occurred');
    }
  }
};

export { createUser };

export default User;
