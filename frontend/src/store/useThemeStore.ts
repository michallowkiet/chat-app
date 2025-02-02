import { create } from 'zustand';

interface Theme {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<Theme>((set) => ({
  theme: localStorage.getItem('chat-app-theme') ?? 'dark',
  setTheme: (newTheme: string) => {
    localStorage.setItem('chat-app-theme', newTheme);
    set({ theme: newTheme });
  },
}));
