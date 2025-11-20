export interface ResumeSummaryPayload {
resumeText: string;
[index: string]: unknown;
}

export interface TestGenerationPayload {
role: string;
skills: string[];
[index: string]: unknown;
}

export interface CodeReviewPayload {
diff: string;
repoUrl?: string;
[index: string]: unknown;
}

export interface SimilarityPayload {
artifactUrl?: string;
repoUrl?: string;
assignmentId?: string;
[index: string]: unknown;
}

export interface ScorecardPayload {
candidateName: string;
scores: Record<string, number>;
[index: string]: unknown;
}

export interface AiProvider {
summarizeResume(payload: ResumeSummaryPayload): Promise<Record<string, unknown>>;
generateTest(payload: TestGenerationPayload): Promise<Record<string, unknown>>;
reviewCode(payload: CodeReviewPayload): Promise<Record<string, unknown>>;
checkSimilarity(payload: SimilarityPayload): Promise<Record<string, unknown>>;
buildScorecard(payload: ScorecardPayload): Promise<Record<string, unknown>>;
}
