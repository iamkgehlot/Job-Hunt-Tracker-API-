import { type NextFunction, type Request, type Response } from "express";
import {
  postJobService,
  getJobByIdService,
  getAlljobService,
  patchJobService,
  deleteByIdService,
  statsService,
} from "../services/ApplicationServices.js";
import { AppError } from "../utils/AppError.js";

const createJob = async (req: Request, res: Response) => {
  const newJob = req.body;
  await postJobService(newJob);
  return res.status(200).json({success:true,message:"job posted"});
};

const getJob = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10);
  const job = await getJobByIdService(id);
  if (job === null) {
    return next(new AppError(400, "Job application not found"));
  }
  return res.status(200).json({success:true,data:job});
};

const getAllJob = async (req: Request, res: Response, next: NextFunction) => {
  const allJobs = await getAlljobService({
    status: req.query.status as string | undefined,
    company: req.query.company as string | undefined,
    sort: req.query.sort as string | undefined,
    order: req.query.order as string | undefined,
  });

  if (allJobs.length === 0) {
    return next(new AppError(400, "No job Application available"));
  }
  return res.status(200).json({success:true,data:allJobs});
};

const patchJob = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10);
  const data = req.body;
  const patchRes = await patchJobService(id, data);
  if (patchRes === null) {
    return next(new AppError(400, "no job found with given id"));
  }
  return res.status(200).json({success:true,data:patchRes});
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10);
  const deleteRes = await deleteByIdService(id);
  if (deleteRes === null) {
    return next(new AppError(400, "no job found with given id"));
  }
  return res.status(200).json({success:true,data:deleteRes});
};

const getStats = async (req: Request, res: Response, next: NextFunction) => {
  const stats = await statsService();
  if(stats===null){
    return new AppError(400, "no data available to calculate stats")
  }
  return res.status(200).json({success:true,data:stats});
};

export { getAllJob, patchJob, deleteById, getJob, createJob, getStats };
