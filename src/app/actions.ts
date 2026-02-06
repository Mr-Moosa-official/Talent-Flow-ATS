'use server';

import {
  extractResumeData,
  ResumeDataExtractionInput,
  ResumeDataExtractionOutput,
} from '@/ai/flows/resume-data-extraction';
import {
  candidateNextStepSuggestion,
  CandidateNextStepSuggestionInput,
  CandidateNextStepSuggestionOutput,
} from '@/ai/flows/candidate-next-step-suggestion';

export async function parseResumeAction(
  prevState: any,
  formData: FormData
): Promise<{
  data: ResumeDataExtractionOutput | null;
  error: string | null;
}> {
  const file = formData.get('resume') as File;
  if (!file || file.size === 0) {
    return { data: null, error: 'No file provided.' };
  }

  try {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const input: ResumeDataExtractionInput = { resumeDataUri: dataURI };
    const result = await extractResumeData(input);
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || 'Failed to parse resume.' };
  }
}

export async function suggestNextStepAction(
  input: CandidateNextStepSuggestionInput
): Promise<{
  data: CandidateNextStepSuggestionOutput | null;
  error: string | null;
}> {
  try {
    const result = await candidateNextStepSuggestion(input);
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || 'Failed to get suggestion.' };
  }
}
