import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

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
    maxAge: 7 * 24 * 60 * 60, // 1 day in seconds
    path: '/', // The cookie will be available for all routes
    httpOnly: true, // Prevents JavaScript from accessing the cookie. XSS attacks are prevented by setting this to true.
    sameSite: 'strict', // Prevents cross-site request forgery (CSRF) attacks. Set to 'none' if you need to allow cookies from different domains.
    secure: process.env.NODE_ENV !== 'development', // Only send cookies over HTTPS
  });

  return token;
};

const verifyJWTToken = async (
  token: string,
): Promise<CustomJwtPayload | null> => {
  const secretKey = process.env.JWT_SECRET ?? 'your_secret_key';
  try {
    const decoded: CustomJwtPayload = jwt.verify(
      token,
      secretKey,
    ) as CustomJwtPayload;

    return decoded;
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return null;
  }
};

export { comparePassword, generateJWTToken, hashPassword, verifyJWTToken };
