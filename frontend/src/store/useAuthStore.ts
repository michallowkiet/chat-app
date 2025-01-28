/* eslint-disable @typescript-eslint/no-unused-vars */
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { checkAuth, logout, signIn, signUp } from '../services/apiServices';
import { SignUpForm, User } from '../types/types';

type AuthState = {
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  user: User | null; // Adjust the type as needed
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignUpForm) => Promise<void>;
  checkAuth: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  user: null,
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
      toast.success('Logout successful');
      set({ user: null });
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
}));

export default useAuthStore;
