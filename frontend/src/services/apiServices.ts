/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { SignUpForm, SignUpFormResponse, User } from '../types/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
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

const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Logout failed: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
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

export { checkAuth, logout, signIn, signUp };
export default axiosInstance;
