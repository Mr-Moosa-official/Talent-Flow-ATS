'use server';

/**
 * @fileOverview This flow extracts data from a resume using AI.
 *
 * - extractResumeData - Extracts data from a resume.
 * - ResumeDataExtractionInput - The input type for the extractResumeData function.
 * - ResumeDataExtractionOutput - The return type for the extractResumeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeDataExtractionInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ResumeDataExtractionInput = z.infer<
  typeof ResumeDataExtractionInputSchema
>;

const ResumeDataExtractionOutputSchema = z.object({
  name: z.string().describe('The name of the candidate.'),
  email: z.string().describe('The email address of the candidate.'),
  phone: z.string().describe('The phone number of the candidate.'),
  experience: z.array(z.string()).describe('The work experience of the candidate.'),
  skills: z.array(z.string()).describe('The skills of the candidate.'),
  education: z.array(z.string()).describe('The education history of the candidate.'),
});

export type ResumeDataExtractionOutput = z.infer<
  typeof ResumeDataExtractionOutputSchema
>;

export async function extractResumeData(
  input: ResumeDataExtractionInput
): Promise<ResumeDataExtractionOutput> {
  return extractResumeDataFlow(input);
}

const resumeDataExtractionPrompt = ai.definePrompt({
  name: 'resumeDataExtractionPrompt',
  input: {schema: ResumeDataExtractionInputSchema},
  output: {schema: ResumeDataExtractionOutputSchema},
  prompt: `You are an expert resume parser.

  Extract the following information from the resume:
  - Name
  - Email
  - Phone
  - Experience
  - Skills
  - Education

  Resume:
  {{media url=resumeDataUri}}
  `,
});

const extractResumeDataFlow = ai.defineFlow(
  {
    name: 'extractResumeDataFlow',
    inputSchema: ResumeDataExtractionInputSchema,
    outputSchema: ResumeDataExtractionOutputSchema,
  },
  async input => {
    const {output} = await resumeDataExtractionPrompt(input);
    return output!;
  }
);
