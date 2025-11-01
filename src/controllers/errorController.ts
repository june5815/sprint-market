import { Request, Response, NextFunction } from "express";
import { StructError } from "superstruct";
import BadRequestError from "../lib/errors/BadRequestError";
import NotFoundError from "../lib/errors/NotFoundError";

interface ErrorWithCode extends Error {
  code?: string;
  status?: number;
}

export function defaultNotFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(404).send({ message: "Not found" });
}

export function globalErrorHandler(
  err: ErrorWithCode,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof StructError || err instanceof BadRequestError) {
    res.status(400).send({ message: err.message });
    return;
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ message: "Invalid JSON" });
    return;
  }

  if (err.code) {
    console.error(err);
    res.status(500).send({ message: "Failed to process data" });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500).send({ message: "Internal server error" });
}
