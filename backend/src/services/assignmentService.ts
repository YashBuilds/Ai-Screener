import { Assignment, IAssignment } from '../models/Assignment.js';
import { Candidate } from '../models/Candidate.js';
import { ApiError } from '../utils/errors.js';
import { enqueueJob } from '../jobs/queue.js';
import { JobType } from '../jobs/jobTypes.js';

export const assignmentService = {
  async submit(
    candidateId: string,
    payload: { repoUrl?: string; artifactUrl?: string }
  ) {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new ApiError(404, 'Candidate not found');

    // Cast to IAssignment to satisfy TypeScript
    const assignment = (await Assignment.create({
      candidate: candidate._id,
      repoUrl: payload.repoUrl,
      artifactUrl: payload.artifactUrl,
      status: 'processing',
    })) as IAssignment;

    const jobPayload: { assignmentId: string } = {
      assignmentId: assignment._id.toString(),
    };

    await Promise.all([
      enqueueJob(JobType.CodeAnalysis, jobPayload),
      enqueueJob(JobType.Similarity, jobPayload),
      enqueueJob(JobType.AiCodeReview, jobPayload),
    ]);

    return assignment;
  },

  async getResults(assignmentId: string) {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) throw new ApiError(404, 'Assignment not found');
    return assignment;
  },
};
