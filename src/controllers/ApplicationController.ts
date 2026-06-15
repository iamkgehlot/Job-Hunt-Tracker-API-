import { type Request, type Response } from "express";
import {
  postJobService,
  getJobByIdService,
  getAlljobService,
  patchJobService,
  deleteByIdService,
} from "../services/ApplicationServices.js";

const createJob = async (req: Request, res: Response) => {
  const newJob = req.body;
  await postJobService(newJob);
  return res.status(200).json("job posted");
};

const getJob = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const job = await getJobByIdService(id);
  if (job === null) {
    return res.status(404).json({ message: "Job application not found" });
  }
  return res.status(200).json(job);
};

const getAllJob = async (req: Request, res: Response) => {
  const allJobs = await getAlljobService({
    status: req.query.status as string | undefined,
    company: req.query.company as string | undefined,
    sort: req.query.sort as string | undefined,
    order: req.query.order as string | undefined,
  });

  if (allJobs === null) {
    return res.status(404).json({ message: "No job Application available" });
  }
  return res.status(200).json(allJobs);
};

const patchJob = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const data = req.body;
  const patchRes = await patchJobService(id, data);
  if (patchRes === null) {
    return res.status(404).json({ message: "no job found with given id" });
  }
  return res.status(200).json(patchRes);
};

const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const deleteRes = await deleteByIdService(id);
  if (deleteRes === null) {
    return res.status(404).json({ message: "no job found with given id" });
  }
  return res.status(200).json(deleteRes);
};

export { getAllJob, patchJob, deleteById, getJob, createJob };
