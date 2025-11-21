export interface Candidate {
  _id: string;
  name: string;
  email: string;
  roleApplied: string;
  resumeText?: string;
  summary?: string;
  scores?: {
    resume?: number;
    mcq?: number;
    coding?: number;
    assignment?: number;
    quality?: number;
    similarityPenalty?: number;
  };
  statusHistory?: Array<{
    stage: string;
    updatedAt: string;
    _id: string;
  }>;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}