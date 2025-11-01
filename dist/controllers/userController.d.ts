import { Response } from "express";
import { LoginRequest, RefreshTokenRequest } from "../types/requests";
import { ExpressHandler } from "../types/common";
export declare const registerUser: ExpressHandler;
export declare function loginUser(req: LoginRequest, res: Response): Promise<void>;
export declare function refreshToken(req: RefreshTokenRequest, res: Response): Promise<void>;
