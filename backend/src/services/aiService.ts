import type {
  CodeReviewPayload,
  ResumeSummaryPayload,
  ScorecardPayload,
  SimilarityPayload,
  TestGenerationPayload,
} from './aiProvider.js';
import { OpenAiProvider } from './openAiProvider.js';

const provider = new OpenAiProvider();

export const aiService = {
  resumeSummary: (payload: ResumeSummaryPayload) => provider.summarizeResume(payload),
  testGeneration: (payload: TestGenerationPayload) => provider.generateTest(payload),
  codeReview: (payload: CodeReviewPayload) => provider.reviewCode(payload),
  similarity: (payload: SimilarityPayload) => provider.checkSimilarity(payload),
  scorecard: (payload: ScorecardPayload) => provider.buildScorecard(payload),
};
