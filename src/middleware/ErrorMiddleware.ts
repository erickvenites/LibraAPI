import { NextFunction } from "express";
import { Request, Response } from "express";
import HttpError from "../errors/HttpError";
class ErrorMiddleware extends Error {
  public appError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    } else {
      next();
    }
  }
}

export default ErrorMiddleware;
