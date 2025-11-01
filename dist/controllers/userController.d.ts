import { Request, Response } from "express";
interface RegisterRequest extends Request {
    body: {
        email: string;
        nickname: string;
        password: string;
    };
}
interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}
interface RefreshTokenRequest extends Request {
    body: {
        refreshToken: string;
    };
}
export declare function registerUser(req: RegisterRequest, res: Response): Promise<void>;
export declare function loginUser(req: LoginRequest, res: Response): Promise<void>;
export declare function refreshToken(req: RefreshTokenRequest, res: Response): Promise<void>;
export {};
