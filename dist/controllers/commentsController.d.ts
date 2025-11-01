import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
    };
}
export declare function updateComment(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function deleteComment(req: AuthenticatedRequest, res: Response): Promise<void>;
export {};
