'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting the next best action for a candidate in the hiring pipeline.
 *
 * - candidateNextStepSuggestion - A function that takes candidate profile and pipeline stage as input and returns a suggestion for the next step.
 * - CandidateNextStepSuggestionInput - The input type for the candidateNextStepSuggestion function.
 * - CandidateNextStepSuggestionOutput - The return type for the candidateNextStepSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CandidateNextStepSuggestionInputSchema = z.object({
  candidateProfile: z
    .string()
    .describe('The profile of the candidate, including their skills, experience, and qualifications.'),
  pipelineStage: z
    .string()
    .describe(
      'The current stage of the candidate in the hiring pipeline (e.g., Application, Phone Screen, Interview, Offer).'      
    ),
  historicalData: z
    .string()
    .optional()
    .describe('Historical data on successful candidates and their progress through the pipeline.'),
});
export type CandidateNextStepSuggestionInput = z.infer<typeof CandidateNextStepSuggestionInputSchema>;

const CandidateNextStepSuggestionOutputSchema = z.object({
  nextStepSuggestion: z
    .string()
    .describe(
      'A suggestion for the next best action to take for the candidate (e.g., schedule interview, send rejection email).'      
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested next step, based on the candidate profile, pipeline stage, and historical data.'
    ),
});
export type CandidateNextStepSuggestionOutput = z.infer<typeof CandidateNextStepSuggestionOutputSchema>;

export async function candidateNextStepSuggestion(
  input: CandidateNextStepSuggestionInput
): Promise<CandidateNextStepSuggestionOutput> {
  return candidateNextStepSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'candidateNextStepSuggestionPrompt',
  input: {schema: CandidateNextStepSuggestionInputSchema},
  output: {schema: CandidateNextStepSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to suggest the next best action for candidates in a hiring pipeline.

  Based on the candidate's profile, their current stage in the pipeline, and historical data on successful candidates, suggest the most appropriate next step.

  Candidate Profile: {{{candidateProfile}}}
  Pipeline Stage: {{{pipelineStage}}}
  Historical Data: {{{historicalData}}}

  Consider actions such as: Scheduling an interview, sending a rejection email, moving to the next stage, requesting more information.  Explain your reasoning.

  Output the next step suggestion and the reasoning behind it.`,  
});

const candidateNextStepSuggestionFlow = ai.defineFlow(
  {
    name: 'candidateNextStepSuggestionFlow',
    inputSchema: CandidateNextStepSuggestionInputSchema,
    outputSchema: CandidateNextStepSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
