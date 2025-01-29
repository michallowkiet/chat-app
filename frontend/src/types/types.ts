export type User = {
  _id?: string;
  fullName: string;
  password: string;
  profilePicture?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  isOnline?: boolean;
};

export type SignUpForm = {
  email: string;
  password: string;
  fullName: string;
};

export interface SignUpFormResponse {
  success: boolean;
  error?: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface ChatMessage {
  _id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
}
