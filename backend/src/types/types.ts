import { Request } from 'express';

export interface IUser {
  _id?: string;
  fullName: string;
  password: string;
  profilePicture?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMessage {
  _id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatAppRequest extends Request {
  user?: IUser | null;
}

export type MessageList = IMessage[];
export type UserList = IUser[];
