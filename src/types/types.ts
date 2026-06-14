enum ApplicationStatus {
  APPLIED = "APPLIED",
  PHONE_SCREEN = "PHONE_SCREEN",
  TECHNICAL = "TECHNICAL",
  FINAL_ROUND = "FINAL_ROUND",
  OFFER = "OFFER",
  REJECTED = "REJECTED",
  GHOSTED = "GHOSTED",
}

interface applicationType {
  id: number;
  company: string;
  role: string;
  jobUrl: string;
  status: ApplicationStatus;
  appliedAt: string;
  LastUpdated: string;
}
export { ApplicationStatus, type applicationType };
