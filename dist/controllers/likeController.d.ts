import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
    };
}
export declare function likeArticle(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function unlikeArticle(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function likeProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function unlikeProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
export {};
