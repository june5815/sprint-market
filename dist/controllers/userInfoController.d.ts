import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
    };
}
interface UpdateInfoRequest extends AuthenticatedRequest {
    body: {
        nickname?: string;
        image?: string;
    };
}
interface ChangePasswordRequest extends AuthenticatedRequest {
    body: {
        currentPassword: string;
        newPassword: string;
    };
}
export declare function getMyInfo(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function updateMyInfo(req: UpdateInfoRequest, res: Response): Promise<void>;
export declare function changeMyPassword(req: ChangePasswordRequest, res: Response): Promise<void>;
export declare function getMyProducts(req: AuthenticatedRequest, res: Response): Promise<void>;
export {};
