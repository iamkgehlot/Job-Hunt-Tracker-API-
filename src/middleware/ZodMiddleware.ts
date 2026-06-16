import type { Request, Response, NextFunction } from "express";
import { ZodType, ZodError, success } from "zod";

export const ZodMiddleware = (validations: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = validations.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const hasUnrecognizedKeys = error.issues.some((err) => {
          return err.code === "unrecognized_keys";
        });
        if (hasUnrecognizedKeys) {
          return res.status(400).json({
            success: false,
            message:
              "Only company, role, jobUrl and status  can be updated, please check your payload",
          });
        }
        const errorType = error.issues.map((issue) => ({
          issueAt: issue.path.join("."),
          message: issue.message,
        }));
        return res.status(400).json({
          success: false,
          message: "issue with input data",
        });
      }

      next(error);
    }
  };
};
