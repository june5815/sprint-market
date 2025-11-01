import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "changeme-secret";

export interface JwtPayload {
  userId: number;
  email?: string;
  nickname?: string;
  iat?: number;
  exp?: number;
}

export function signToken(
  payload: object,
  options: jwt.SignOptions = {}
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h", ...options });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function signRefreshToken(
  payload: object,
  options: jwt.SignOptions = {}
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...options });
}
