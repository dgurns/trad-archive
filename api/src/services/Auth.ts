import jwt from 'jsonwebtoken';
import { CookieSerializeOptions } from 'cookie';
import addDays from 'date-fns/addDays';
import subYears from 'date-fns/subYears';
import { User } from 'models/User';

const { SERVERLESS_STAGE } = process.env;
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

const createJwt = (user: User) => {
  const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
  return token;
};

type JwtPayload = {
  userId: string;
};

const extractUserIdFromJwt = (token: string): string | undefined => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (!decoded || typeof decoded !== 'object') {
      throw new Error();
    }
    const payload = decoded as JwtPayload;
    return payload.userId;
  } catch {
    return undefined;
  }
};
export interface JwtCookie {
  name: string;
  value: string;
  options: CookieSerializeOptions;
}

export const COOKIE_NAME = 'jwt';

const makeJwtCookie = (token: string, expirationDate: Date): JwtCookie => {
  let sameSite: 'none' | 'lax' | 'strict' = 'none';
  if (SERVERLESS_STAGE === 'dev') {
    sameSite = 'lax';
  } else if (SERVERLESS_STAGE === 'prod') {
    sameSite = 'strict';
  }
  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      path: '/',
      expires: expirationDate,
      httpOnly: true,
      sameSite,
      secure: SERVERLESS_STAGE === 'dev' ? false : true,
    },
  };
};

const makeValidJwtCookie = (token: string): JwtCookie => {
  const validExpirationDate = addDays(new Date(), 30);
  return makeJwtCookie(token, validExpirationDate);
};

const makeInvalidJwtCookie = (): JwtCookie => {
  const invalidExpirationDate = subYears(new Date(), 1);
  return makeJwtCookie('', invalidExpirationDate);
};

export default {
  isValidEmail,
  isSecurePassword,
  createJwt,
  extractUserIdFromJwt,
  makeValidJwtCookie,
  makeInvalidJwtCookie,
};
