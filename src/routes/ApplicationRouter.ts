import {Router} from "express";
import {
  getAllJob,
  patchJob,
  deleteById,
  getJob,
  createJob,
} from "../controllers/ApplicationController.js";

const jobRouter = Router();

jobRouter.post("/", createJob);

jobRouter.get("/:id", getJob);

jobRouter.get("/", getAllJob);

jobRouter.patch("/:id", patchJob);

jobRouter.delete("/:id", deleteById);

export { jobRouter };
