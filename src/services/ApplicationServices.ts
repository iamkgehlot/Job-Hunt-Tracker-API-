import { type filterType, type applicationType } from "../types/types.js";
import { readFile, writeFile } from "../utils/writeAndReadfile.js";

const postJobService = async (job: applicationType) => {
  const currentData = await readFile();
  const allIds = currentData.map((arr) => arr.id);
  let id: number;
  if (allIds.length === 0) {
    id = 1;
  } else {
    id = Math.max(...allIds) + 1;
  }

  const tempData: applicationType = {
    id: id,
    company: job.company,
    role: job.role,
    jobUrl: job.jobUrl,
    status: job.status,
    appliedAt: new Date().toLocaleDateString(),
    LastUpdated: new Date().toLocaleDateString(),
  };
  currentData.push(tempData);
  await writeFile(currentData);
};

const getJobByIdService = async (
  id: number,
): Promise<applicationType | null> => {
  const data = await readFile();
  const findJob = data.find((job) => job.id === id);
  if (!findJob) {
    return null;
  }
  return findJob;
};

const getAlljobService = async (filterdata?: filterType) => {
  let allJobs = await readFile();
  if (filterdata?.status) {
    allJobs = allJobs.filter(
      (data) => data.status.toLowerCase() === filterdata.status?.toLowerCase(),
    );
  }
  console.log(allJobs);
  if (filterdata?.company) {
    allJobs = allJobs.filter(
      (data) =>
        data.company.toLowerCase() === filterdata.company?.toLowerCase(),
    );
  }

  if (filterdata?.sort === "applydate") {
    allJobs.sort((a, b) => {
      const [dayA, monthA, yearA] = a.appliedAt.split("/");
      const [dayB, monthB, yearB] = b.appliedAt.split("/");
      const dateA = new Date(
        Number(yearA),
        Number(monthA) - 1,
        Number(dayA),
      ).getTime();
      const dateB = new Date(
        Number(yearB),
        Number(monthB) - 1,
        Number(dayB),
      ).getTime();

      return filterdata.order === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  return allJobs;
};

const patchJobService = async (id: number, data: applicationType) => {
  const alldata = await readFile();
  const findJob = alldata.find((arr) => arr.id === id);
  if (!findJob) {
    return null;
  }
  if (data.jobUrl) findJob.jobUrl = data.jobUrl;
  if (data.appliedAt) findJob.appliedAt = findJob.appliedAt;
  if (data.company) findJob.company = data.company;
  findJob.LastUpdated = new Date().toLocaleDateString();
  if (data.role) findJob.role = data.role;
  if (data.status) findJob.status = data.status;
  await writeFile(alldata);
  return findJob;
};

const deleteByIdService = async (id: number) => {
  const data = await readFile();
  const findIndexById = data.findIndex((arr) => arr.id === id);
  if (findIndexById === -1) {
    return null;
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
