import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  getMessagesByUserId,
  getUsers,
  sendMessage,
} from '../services/apiServices';
import { ChatMessage, User } from '../types/types';
import useAuthStore from './useAuthStore';

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
  subscribeToNewMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
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
      if (response.success) {
        toast.success(`Message sent successfully`);
        set({ messages: [...get().messages, response.message] });
      }
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Error sending message: ${error?.message}`);
    }
  },
  subscribeToNewMessages: () => {
    const receiverId = get().selectedUser?._id;
    if (!receiverId) return;
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.on('newMessage', (newMessage: ChatMessage) => {
      if (newMessage.senderId !== receiverId) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off('newMessage');
  },
}));
