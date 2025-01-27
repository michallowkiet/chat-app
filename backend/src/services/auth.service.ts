import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

const generateJWTToken = async (userId: string, res: Response) => {
  const secretKey = process.env.JWT_SECRET ?? 'your_secret_key';
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1d' });

  res.cookie('token', token, {
    maxAge: 3600 * 24,
    httpOnly: true, // Prevents JavaScript from accessing the cookie. XSS attacks are prevented by setting this to true.
    sameSite: 'strict', // Prevents cross-site request forgery (CSRF) attacks. Set to 'none' if you need to allow cookies from different domains.
    secure: process.env.NODE_ENV !== 'development', // Only send cookies over HTTPS
  });

  return token;
};

export { comparePassword, generateJWTToken, hashPassword };
