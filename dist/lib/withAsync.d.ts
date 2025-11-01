import { Request, Response, NextFunction } from "express";
export declare function withAsync(handler: (req: Request, res: Response) => Promise<void>): (req: Request, res: Response, next: NextFunction) => Promise<void>;
