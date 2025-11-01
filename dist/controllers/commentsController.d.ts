import { Response } from "express";
import { AuthenticatedRequest, AuthenticatedHandler } from "../types/common";
export declare const updateComment: AuthenticatedHandler;
export declare function deleteComment(req: AuthenticatedRequest, res: Response): Promise<void>;
