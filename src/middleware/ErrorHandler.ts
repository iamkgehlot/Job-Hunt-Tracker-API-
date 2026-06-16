import type { Response, Request, NextFunction } from "express";


export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(err.statusCode||500).json({
    success:false,
    errorCode: err.statusCode||500,
    error: err.message||"internal server error",
    
  });
};
