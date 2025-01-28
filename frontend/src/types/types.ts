export type User = {
  _id?: string;
  fullName: string;
  password: string;
  profilePicture?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SignUpForm = {
  email: string;
  password: string;
  fullName: string;
};
