import { jobRouter } from "./ApplicationRouter.js";
import { Router } from "express";

const masterRouter = Router();

masterRouter.use("/jobs", jobRouter);

export { masterRouter };
