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
import { postValidations ,patchValidations} from "../validations/validations.js";


const jobRouter = Router();

jobRouter.post("/", ZodMiddleware(postValidations), createJob);

jobRouter.get("/stats", getStats);

jobRouter.get("/:id", getJob);

jobRouter.get("/", getAllJob);

jobRouter.patch("/:id", ZodMiddleware(patchValidations), patchJob);

jobRouter.delete("/:id", deleteById);

export { jobRouter };
