/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { SignUpForm, SignUpFormResponse, User } from '../types/types';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/',
  withCredentials: true,
});

const signIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`${error.response?.data?.error.message || 'Unknown error'}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
    return null;
  }
};

const signUp = async (data: SignUpForm) => {
  try {
    const response = await axiosInstance.post<SignUpFormResponse>(
      '/auth/signup',
      {
        ...data,
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Sign up failed: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }

    return null;
  }
};

const logout = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return await response.data.success;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Logout failed: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
    return null;
  }
};

const checkAuth = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get('/auth/check-auth');
    const user = (await response.data.user) as User;

    return user;
  } catch (error) {
    return null;
  }
};

const updateUser = async (data: Partial<User>) => {
  try {
    const image = data.profilePicture ?? '';
    const response = await axiosInstance.put('/profile/update', {
      profilePicture: image,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Update profile failed: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
  }
};

const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/message/users');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Failed to get users: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
  }
};

const getMessagesByUserId = async (receiverId: string | undefined) => {
  try {
    if (!receiverId) return toast.error('Please select a user');
    const response = await axiosInstance.get(`/message/${receiverId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Failed to get messages by user ID: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
  }
};

const sendMessage = async (
  receiverId: string,
  content: string,
  image?: string | null,
) => {
  try {
    if (!receiverId || !content)
      return toast.error('Please fill in all fields');
    const response = await axiosInstance.post(`/message/send/${receiverId}`, {
      content,
      image,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Failed to send message: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
  }
};

export {
  checkAuth,
  getMessagesByUserId,
  getUsers,
  logout,
  sendMessage,
  signIn,
  signUp,
  updateUser,
};
export default axiosInstance;
