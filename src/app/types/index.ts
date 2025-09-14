export type Job = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  jobDescription: string;
  requirements: string | null;
  responsibilities: string | null;
  applicationDeadline: string;
  datePosted: string;
};