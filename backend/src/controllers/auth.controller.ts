import { Request, Response } from 'express';

const signup = (req: Request, res: Response) => {
  res.send('Signup');
};

const login = (req: Request, res: Response) => {
  res.send('login');
};

const logout = (req: Request, res: Response) => {
  res.send('logout');
};

export { login, logout, signup };
