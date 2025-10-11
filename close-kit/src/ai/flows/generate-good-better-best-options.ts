'use server';
/**
 * @fileOverview Generates Good-Better-Best options for a job using AI.
 *
 * - generateGoodBetterBestOptions - A function that handles the GBB options generation.
 * - GenerateGoodBetterBestOptionsInput - The input type for the generateGoodBetterBestOptions function.
 * - GenerateGoodBetterBestOptionsOutput - The return type for the generateGoodBetterBestOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGoodBetterBestOptionsInputSchema = z.object({
  jobDescription: z.string().describe('The description of the job.'),
  pricingData: z.string().describe('Proprietary pricing data for materials and labor.'),
});
export type GenerateGoodBetterBestOptionsInput = z.infer<
  typeof GenerateGoodBetterBestOptionsInputSchema
>;

const GenerateGoodBetterBestOptionsOutputSchema = z.object({
  goodOption: z.string().describe('The "Good" option description.'),
  betterOption: z.string().describe('The "Better" option description.'),
  bestOption: z.string().describe('The "Best" option description.'),
});
export type GenerateGoodBetterBestOptionsOutput = z.infer<
  typeof GenerateGoodBetterBestOptionsOutputSchema
>;

export async function generateGoodBetterBestOptions(
  input: GenerateGoodBetterBestOptionsInput
): Promise<GenerateGoodBetterBestOptionsOutput> {
  return generateGoodBetterBestOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGoodBetterBestOptionsPrompt',
  input: {schema: GenerateGoodBetterBestOptionsInputSchema},
  output: {schema: GenerateGoodBetterBestOptionsOutputSchema},
  prompt: `You are an AI assistant for generating Good-Better-Best options for contractors.

  Based on the job description and proprietary pricing data provided, generate three options:
  - Good: The most basic and cost-effective option.
  - Better: An upgraded option with enhanced features or materials.
  - Best: The premium option with the highest quality and most comprehensive features.

  Job Description: {{{jobDescription}}}
  Pricing Data: {{{pricingData}}}

  Format your response as a JSON object with "goodOption", "betterOption", and "bestOption" keys.
`,
});

const generateGoodBetterBestOptionsFlow = ai.defineFlow(
  {
    name: 'generateGoodBetterBestOptionsFlow',
    inputSchema: GenerateGoodBetterBestOptionsInputSchema,
    outputSchema: GenerateGoodBetterBestOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
