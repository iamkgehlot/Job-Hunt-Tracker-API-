import {
  type filterType,
  type applicationType,
  ApplicationStatus,
} from "../types/types.js";
import { readFile, writeFile } from "../utils/writeAndReadfile.js";

const postJobService = async (job: applicationType) => {
  const currentData = (await readFile()) || [];
  const allIds = currentData.map((arr: applicationType) => arr.id);
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
  const findJob = data.find((job: applicationType) => job.id === id);
  if (!findJob) {
    return null;
  }
  return findJob;
};

const getAlljobService = async (filterdata?: filterType) => {
  let allJobs = await readFile();
  if (filterdata?.status || filterdata?.company) {
    allJobs = allJobs.filter((data: applicationType) => {
      const statusMatch =
        filterdata.status && filterdata.status.trim() !== ""
          ? data.status.toLowerCase() === filterdata.status?.toLowerCase()
          : true;
      const companyMatch =
        filterdata.company && filterdata.company.trim() !== ""
          ? data.company.toLowerCase() === filterdata.company?.toLowerCase()
          : true;

      return statusMatch && companyMatch;
    });
  }

  if (filterdata && filterdata.sort) {
    if (
      filterdata?.sort === "appliedAt" ||
      filterdata?.sort === "LastUpdated"
    ) {
      const filterDateType = filterdata.sort;
      allJobs.sort((a: applicationType, b: applicationType) => {
        const [dayA, monthA, yearA] = (a[filterDateType] as string).split("/");
        const [dayB, monthB, yearB] = (b[filterDateType] as string).split("/");
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
    } else {
      const sortProperty = filterdata.sort as keyof applicationType;
      allJobs.sort((a: applicationType, b: applicationType) => {
        return filterdata.order === "asc"
          ? (a[sortProperty] as string).localeCompare(b[sortProperty] as string)
          : (b[sortProperty] as string).localeCompare(
              a[sortProperty] as string,
            );
      });
    }
  }

  return allJobs;
};

const patchJobService = async (id: number, data: applicationType) => {
  const alldata = await readFile();
  const findJob = alldata.find((arr: applicationType) => arr.id === id);
  if (!findJob) {
    return null;
  }
  if (data.jobUrl) findJob.jobUrl = data.jobUrl;
  findJob.appliedAt = findJob.appliedAt;
  if (data.company) findJob.company = data.company;
  findJob.LastUpdated = new Date().toLocaleDateString();
  if (data.role) findJob.role = data.role;
  if (data.status) findJob.status = data.status;
  await writeFile(alldata);
  return findJob;
};

const deleteByIdService = async (id: number) => {
  const data = await readFile();
  const findIndexById = data.findIndex((arr: applicationType) => arr.id === id);
  if (findIndexById === -1) {
    return null;
  }

  data.splice(findIndexById, 1);
  await writeFile(data);
  return { response: "job application deleted" };
};

const statsService = async () => {
  const data = await readFile();

  const stats = {
    total: 0,
    status: {
      [ApplicationStatus.APPLIED]: 0,
      [ApplicationStatus.FINAL_ROUND]: 0,
      [ApplicationStatus.GHOSTED]: 0,
      [ApplicationStatus.OFFER]: 0,
      [ApplicationStatus.PHONE_SCREEN]: 0,
      [ApplicationStatus.REJECTED]: 0,
      [ApplicationStatus.TECHNICAL]: 0,
    },
    responseRate: 0,
    offerRate: 0,
    avgDaysToFirstResponse: 0,
    _totalResponseDays: 0,
    _responseCounter: 0,
  };
  const dateToMs = (data: string) => {
    const [day, month, year] = data.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  };
  const newStats = data.reduce((acc: typeof stats, curr: applicationType) => {
    acc.status[curr.status] += 1;
    acc.total += 1;
    if (
      curr.status !== ApplicationStatus.APPLIED &&
      curr.status !== ApplicationStatus.GHOSTED
    ) {
      acc._responseCounter += 1;
      const appliedDate = dateToMs(curr.appliedAt);
      const updateDate = dateToMs(curr.LastUpdated);
      acc._totalResponseDays +=
        (updateDate - appliedDate) / (1000 * 60 * 60 * 24);
    }
    return acc;
  }, stats);
  newStats.offerRate =
    newStats.total > 0
      ? Math.round(
          (newStats.status[ApplicationStatus.OFFER] / newStats.total) * 100,
        )
      : null;
  newStats.responseRate =
    newStats.total > 0
      ? Math.round((newStats._responseCounter / newStats.total) * 100)
      : null;
  newStats.avgDaysToFirstResponse =
    newStats._responseCounter > 0
      ? Math.round(newStats._totalResponseDays / newStats._responseCounter)
      : null;

  const { _totalResponseDays, _responseCounter, ...finalstats } = newStats;
  return finalstats;
};

export {
  postJobService,
  getJobByIdService,
  getAlljobService,
  patchJobService,
  deleteByIdService,
  statsService,
};
