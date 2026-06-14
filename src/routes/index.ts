import { jobRouter } from "./ApplicationRouter.js";
import { Router } from "express";

const masterRouter = Router();

masterRouter.use("/job", jobRouter);

export { masterRouter };
