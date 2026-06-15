import { z } from "zod";
import { ApplicationStatus } from "../types/types.js";

export const validations = z.object({
  company: z.string().min(1, "company name is required"),

  role: z.string().min(1, "role is required"),

  jobUrl: z.url("invalid url"),

  status: z.enum(ApplicationStatus),
});
