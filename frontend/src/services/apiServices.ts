import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { SignUpForm, User } from '../types/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

const signIn = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Login failed: ${error.message}`);
    } else {
      toast.error(`An unexpected error occurred.`);
    }
    return null;
  }
};

const signUp = async (data: SignUpForm) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      data,
    });
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
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error('Session expired. Please log in again.');
    }
    return null;
  }
};

export { checkAuth, logout, signIn, signUp };
export default axiosInstance;
