import type { Response, Request, NextFunction } from "express";

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(err.statusCode).json({
    error: err.message,
    errorCode: err.statusCode,
  });
};
