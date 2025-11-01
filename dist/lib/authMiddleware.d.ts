import { Request, Response, NextFunction } from "express";
interface User {
    userId: number;
    email?: string;
    nickname?: string;
}
interface AuthenticatedRequest extends Request {
    user?: User;
}
export declare function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
export {};
