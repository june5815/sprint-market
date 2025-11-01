import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
    };
}
export declare function createArticle(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getArticle(req: Request, res: Response): Promise<void>;
export declare function updateArticle(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function deleteArticle(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getArticleList(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function createComment(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getCommentList(req: Request, res: Response): Promise<void>;
export {};
