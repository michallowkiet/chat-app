import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  getMessagesByUserId,
  getUsers,
  sendMessage,
} from '../services/apiServices';
import { ChatMessage, User } from '../types/types';

interface ChatStore {
  messages: ChatMessage[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (selectedUser: User | null) => Promise<void>;
  selectUser: (user: User | null) => void;
  sendMessage: (
    receiverUser: User | null,
    message: string,
    image?: string | null,
  ) => Promise<void>;
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
  getMessages: async (selectedUser: User | null) => {
    set({ isMessagesLoading: true });
    if (!selectedUser) return;

    try {
      const response = await getMessagesByUserId(selectedUser?._id);
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
  sendMessage: async (
    user: User | null,
    message: string,
    image?: string | null,
  ) => {
    try {
      const receiverId = user?._id;
      if (!receiverId) return;
      const response = await sendMessage(receiverId, message, image);
      if (response.success) toast.success(`Message sent successfully`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Error sending message: ${error?.message}`);
    }
  },
}));
