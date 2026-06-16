import { z } from "zod";
import { ApplicationStatus } from "../types/types.js";

export const validations = z.object({
  id: z.string(),

  company: z.string().min(1, "company name is required"),

  role: z.string().min(1, "role is required"),

  jobUrl: z.url("invalid url"),

  status: z.enum(ApplicationStatus),

  appliedAt: z.string(),

  LastUpdated: z.string(),
});

export const postValidations=validations.omit({
  id:true,
  appliedAt:true,
  LastUpdated:true
});

export const patchValidations =validations.omit({
  id:true,
  appliedAt:true,
  LastUpdated:true,
  
}).partial().strict();

