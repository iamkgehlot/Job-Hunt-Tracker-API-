import { type applicationType } from "../types/types.js";
import { readFile, writeFile } from "../utils/writeAndReadfile.js";

const postJobService = async (job: applicationType) => {
  const currentData = await readFile();
  currentData.push(job);
  await writeFile(currentData);
};

const getJobByIdService = async (
  id: number,
): Promise<applicationType | string> => {
  const data = await readFile();
  const findJob = data.find((job) => job.id === id);
  if (!findJob) {
    return "no data found";
  }
  return findJob;
};

const getAlljobService = async () => {
  const allJobs = await readFile();
  if (allJobs.length === 0) {
    return "no data. start posting job";
  }
  return allJobs;
};

const patchJobService = async (id: number, data: applicationType) => {
  const alldata = await readFile();
  const findJob = alldata.find((arr) => arr.id === id);
  if (!findJob) {
    return "no data found";
  }
  if (data.jobUrl) findJob.jobUrl = data.jobUrl;
  if (data.appliedAt) findJob.appliedAt = data.appliedAt;
  if (data.company) findJob.company = data.company;
  if (data.LastUpdated) findJob.LastUpdated = data.LastUpdated;
  if (data.role) findJob.role = data.role;
  if (data.status) findJob.status = data.status;
  await writeFile(alldata);
  return findJob;
};

const deleteByIdService = async (id: number) => {
  const data = await readFile();
  const findIndexById = data.findIndex((arr) => arr.id === id);
  if (findIndexById === -1) {
    return "id not found";
  }
  console.log(findIndexById);
  data.splice(findIndexById, 1);
  await writeFile(data);
  return { response: "job application deleted" };
};
export {
  postJobService,
  getJobByIdService,
  getAlljobService,
  patchJobService,
  deleteByIdService,
};
