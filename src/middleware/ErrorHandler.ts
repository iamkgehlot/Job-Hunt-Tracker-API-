import type { Response, Request, NextFunction } from "express";
import { success } from "zod";

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(err.statusCode).json({
    success:false,
    errorCode: err.statusCode,
    error: err.message,
    
  });
};
