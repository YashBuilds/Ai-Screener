import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

export const createTokens = (user: { id: string; role: string }) => {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    env.jwtSecret as string,
    { expiresIn: env.jwtExpiresIn } as SignOptions
  );

  const refreshToken = jwt.sign(
    { userId: user.id, role: user.role },
    env.refreshSecret as string,
    { expiresIn: env.refreshExpiresIn } as SignOptions
  );

  return { accessToken, refreshToken };
};
