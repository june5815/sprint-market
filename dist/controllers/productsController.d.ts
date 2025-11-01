import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
    };
}
export declare function createProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getProduct(req: Request, res: Response): Promise<void>;
export declare function updateProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function deleteProduct(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getProductList(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function createComment(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getCommentList(req: Request, res: Response): Promise<void>;
export {};
