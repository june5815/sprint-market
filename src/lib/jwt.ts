import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || 'changeme-secret';

export function signToken(payload: object, options: jwt.SignOptions = {}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h', ...options });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export function signRefreshToken(payload: object, options: jwt.SignOptions = {}): string {
  // Refresh Token은 더 긴 만료시간(예: 7일)
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...options });
}
