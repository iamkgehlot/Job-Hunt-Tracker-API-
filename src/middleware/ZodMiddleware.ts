import type { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const ZodMiddleware = (validations: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validations.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorType = error.issues.map((issue) => ({
          issueAt: issue.path.join("."),
          message: issue.message,
        }));
        return res.status(400).json({
          message: "issue with input data",
          error: errorType,
        });
      }
      next(error);
    }
  };
};
