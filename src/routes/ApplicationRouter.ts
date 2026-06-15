import { Router } from "express";
import {
  getAllJob,
  patchJob,
  deleteById,
  getJob,
  createJob,
  getStats,
} from "../controllers/ApplicationController.js";
import { ZodMiddleware } from "../middleware/ZodMiddleware.js";
import { validations } from "../validations/validations.js";

const jobRouter = Router();

jobRouter.post("/", ZodMiddleware(validations), createJob);

jobRouter.get("/stats", getStats);

jobRouter.get("/:id", getJob);

jobRouter.get("/", getAllJob);

jobRouter.patch("/:id", ZodMiddleware(validations), patchJob);

jobRouter.delete("/:id", deleteById);

export { jobRouter };
