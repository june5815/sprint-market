import { Request, Response } from "express";
import { AuthenticatedRequest, AuthenticatedHandler, ExpressHandler } from "../types/common";
export declare const createArticle: AuthenticatedHandler;
export declare const getArticle: ExpressHandler;
export declare const updateArticle: AuthenticatedHandler;
export declare function deleteArticle(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getArticleList(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function createComment(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getCommentList(req: Request, res: Response): Promise<void>;
