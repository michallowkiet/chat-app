import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { getMessagesByUserId, getUsers } from '../services/apiServices';
import { User } from '../types/types';

interface ChatStore {
  messages: string[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (selectedUserId: string) => Promise<void>;
  selectUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await getUsers();
      if (response.success) {
        set({ users: response.users, isUsersLoading: false });
      }
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Error fetching users: ${error?.message}`);
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (selectedUserId: string) => {
    set({ isMessagesLoading: true });

    try {
      const response = await getMessagesByUserId(selectedUserId);
      if (response.success)
        set({ messages: response.messages, isMessagesLoading: false });
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Error fetching messages: ${error?.message}`);
      set({ isMessagesLoading: false });
    }
  },
  selectUser: (user: User | null) => {
    set({ selectedUser: user });
  },
}));
