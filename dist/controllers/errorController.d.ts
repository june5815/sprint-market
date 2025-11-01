import { Request, Response, NextFunction } from "express";
import { ExpressMiddleware } from "../types/common";
interface ErrorWithCode extends Error {
    code?: string;
    status?: number;
}
export declare const defaultNotFoundHandler: ExpressMiddleware;
type ErrorHandler = (err: ErrorWithCode, req: Request, res: Response, next: NextFunction) => void;
export declare const globalErrorHandler: ErrorHandler;
export {};
