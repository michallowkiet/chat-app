import { create } from 'zustand';
import { checkAuth } from '../services/apiServices';
import { SignUpForm, User } from '../types/types';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User; // Adjust the type as needed
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (data: SignUpForm) => Promise<void>;
  checkAuth: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  signup: async (data: SignUpForm) => {
    console.log(`Signup user with data ${JSON.stringify(data)}`);
  },

  login: (email: string, password: string) => {
    console.log(`Login user ${email} with password ${password}`);
  },
  logout: () => set({ isAuthenticated: false }),
  checkAuth: async () => {
    set({ isLoading: true });

    const user = await checkAuth();

    if (user) {
      set({ isAuthenticated: true, user });
    } else {
      set({ isAuthenticated: false, user: undefined });
    }
    set({ isLoading: false });
  },
}));

export default useAuthStore;
