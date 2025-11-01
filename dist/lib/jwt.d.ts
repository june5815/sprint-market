import jwt from "jsonwebtoken";
import { ID } from "../types/common";
export interface JwtPayload {
    userId: ID;
    email?: string;
    nickname?: string;
    iat?: number;
    exp?: number;
}
export interface TokenPayload {
    userId: ID;
    email?: string;
    nickname?: string;
}
export declare function signToken(payload: TokenPayload, options?: jwt.SignOptions): string;
export declare function verifyToken(token: string): JwtPayload;
export declare function signRefreshToken(payload: TokenPayload, options?: jwt.SignOptions): string;
