import jwt from 'jsonwebtoken';
import { User } from 'entities/User';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'my-jwt-secret-key';

const isValidEmail = (email?: string) => {
  if (!email) return false;

  const validityRegex = new RegExp(
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  );
  return validityRegex.test(email);
};

const isSecurePassword = (password?: string) => {
  if (!password || password.length < 6) {
    return false;
  }
  return true;
};

const createJwtAccessToken = (user: User) => {
  const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
    expiresIn: '15m',
  });
  return token;
};

type JwtAccessTokenPayload = {
  userId: number;
};

const extractUserIdFromJwtAccessToken = (token: string): number | undefined => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (!decoded || typeof decoded !== 'object') {
      throw new Error();
    }
    const payload = decoded as JwtAccessTokenPayload;
    return payload.userId;
  } catch {
    return undefined;
  }
};

export default {
  isValidEmail,
  isSecurePassword,
  createJwtAccessToken,
  extractUserIdFromJwtAccessToken,
};
