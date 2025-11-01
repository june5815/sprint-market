import { Request, Response } from "express";
import multer from "multer";
export declare const upload: multer.Multer;
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}
export declare function uploadImage(req: MulterRequest, res: Response): Promise<void>;
export {};
