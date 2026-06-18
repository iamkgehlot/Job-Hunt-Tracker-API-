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
import { catchAsync } from "../utils/catchAsync.js";
import { is } from "zod/v4/locales";

const createJob = catchAsync(async (req: Request, res: Response) => {
  const newJob = req.body;
  await postJobService(newJob);
  return res.status(200).json({ success: true, message: "job posted" });
});

const getJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string, 10);
    const job = await getJobByIdService(id);
    if (job === null) {
      return next(new AppError(404, "Job application not found"));
    }
    return res.status(200).json({ success: true, data: job });
  },
);

const getAllJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = {
      status: req.query.status as string | undefined,
      company: req.query.company as string | undefined,
      sort: req.query.sort as string | undefined,
      order: req.query.order as string | undefined,
    };
    const allJobs = await getAlljobService(filters);

    const isFiltering = !!(
      filters.status ||
      filters.company ||
      filters.sort ||
      filters.order
    );

    if (allJobs.length === 0) {
      return res
        .status(200)
        .json({
          success: true,
          data: [],
          message: isFiltering
            ? "no jobs matched for given filters"
            : "no jobs are posted yet",
        });
    }
    return res.status(200).json({ success: true, data: allJobs });
  },
);

const patchJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string, 10);
    const data = req.body;
    const patchRes = await patchJobService(id, data);
    if (patchRes === null) {
      return next(new AppError(404, "no job found with given id"));
    }
    return res.status(200).json({ success: true, data: patchRes });
  },
);

const deleteById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string, 10);
    const deleteRes = await deleteByIdService(id);
    if (deleteRes === null) {
      return next(new AppError(404, "no job found with given id"));
    }
    return res.status(200).json({ success: true, data: deleteRes });
  },
);

const getStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await statsService();
    return res.status(200).json({ success: true, data: stats });
  },
);

export { getAllJob, patchJob, deleteById, getJob, createJob, getStats };
