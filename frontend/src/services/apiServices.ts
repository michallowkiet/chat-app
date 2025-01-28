import axios from 'axios';
import { User } from '../types/types';

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
    console.error('Login failed:', error);
    throw error;
  }
};

const signUp = async (username: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Sign up failed:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

const checkAuth = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get('/auth/check-auth');
    const user = await response.data.user;
    return user;
  } catch (error) {
    console.error('Check auth failed:', error);
    throw error;
  }
};

export { checkAuth, logout, signIn, signUp };
export default axiosInstance;
