import jwt from "jsonwebtoken";
export interface JwtPayload {
    userId: number;
    email?: string;
    nickname?: string;
    iat?: number;
    exp?: number;
}
export declare function signToken(payload: object, options?: jwt.SignOptions): string;
export declare function verifyToken(token: string): JwtPayload;
export declare function signRefreshToken(payload: object, options?: jwt.SignOptions): string;
