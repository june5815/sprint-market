import { Request, Response, NextFunction } from "express";
interface ErrorWithCode extends Error {
    code?: string;
    status?: number;
}
export declare function defaultNotFoundHandler(req: Request, res: Response, next: NextFunction): void;
export declare function globalErrorHandler(err: ErrorWithCode, req: Request, res: Response, next: NextFunction): void;
export {};
