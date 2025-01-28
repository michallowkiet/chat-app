import { create } from 'zustand';
import { checkAuth } from '../services/apiServices';
import { User } from '../types/types';

interface AuthState {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  user?: User; // Adjust the type as needed
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isCheckingAuth: true,
  user: undefined,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  signup: (name: string, email: string, password: string) => {
    console.log(
      `Signup user ${name} with email ${email} and password ${password}`,
    );
  },

  login: (email: string, password: string) => {
    console.log(`Login user ${email} with password ${password}`);
  },
  logout: () => set({ isAuthenticated: false }),
  checkAuth: () => checkAuth,
}));

export default useAuthStore;
