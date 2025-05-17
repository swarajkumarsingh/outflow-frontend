export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "deleted";
  createdAt: string;
  updatedAt: string;
}

export interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
