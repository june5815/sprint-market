import { Response } from "express";
import { AuthenticatedRequest, AuthenticatedHandler } from "../types/common";
import { UpdateUserInfoRequest, ChangePasswordRequest } from "../types/requests";
export declare const getMyInfo: AuthenticatedHandler;
export declare function updateMyInfo(req: UpdateUserInfoRequest, res: Response): Promise<void>;
export declare function changeMyPassword(req: ChangePasswordRequest, res: Response): Promise<void>;
export declare function getMyProducts(req: AuthenticatedRequest, res: Response): Promise<void>;
