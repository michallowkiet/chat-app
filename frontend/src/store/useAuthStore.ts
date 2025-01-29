/* eslint-disable @typescript-eslint/no-unused-vars */
import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  checkAuth,
  logout,
  signIn,
  signUp,
  updateUser,
} from '../services/apiServices';
import { SignUpForm, User } from '../types/types';

type AuthState = {
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  user: User | null;
  onlineUsers: User[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignUpForm) => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  user: null,
  onlineUsers: [],
  signup: async (data: SignUpForm) => {
    set({ isSigningUp: true });
    const response = await signUp(data);

    if (response?.success) {
      set({ user: response?.data?.user });
      toast.success('Login successful');
    }

    set({ isSigningUp: false });
  },

  login: async (email: string, password: string) => {
    set({ isLoggingIn: true });
    const response = await signIn(email, password);

    if (response?.success) {
      set({ user: response?.user });
      toast.success('Login successful');
    }
    set({ isLoggingIn: false });
  },

  logout: async () => {
    const response = await logout();
    if (response) {
      set({ user: null });
      toast.success('Logout successful');
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const user = await checkAuth();

      set({ user: user });
    } catch (error) {
      set({ user: null });
    }
    set({ isCheckingAuth: false });
  },

  updateProfile: async (data: Partial<User>) => {
    set({ isUpdatingProfile: true });
    const response = await updateUser(data);
    if (response?.success) {
      toast.success('Profile updated successfully');
      set({ user: response?.user });
    }
    set({ isUpdatingProfile: false });
  },
}));

export default useAuthStore;
