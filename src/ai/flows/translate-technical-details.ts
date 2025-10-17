'use server';

/**
 * @fileOverview A flow to convert technical details into customer-friendly explanations.
 *
 * - translateTechnicalDetails - A function that handles the translation process.
 * - TranslateTechnicalDetailsInput - The input type for the translateTechnicalDetails function.
 * - TranslateTechnicalDetailsOutput - The return type for the translateTechnicalDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTechnicalDetailsInputSchema = z.object({
  technicalDetails: z
    .string()
    .describe('The technical details to be translated into customer-friendly language.'),
});
export type TranslateTechnicalDetailsInput = z.infer<typeof TranslateTechnicalDetailsInputSchema>;

const TranslateTechnicalDetailsOutputSchema = z.object({
  customerFriendlyExplanation: z
    .string()
    .describe('The translated explanation in customer-friendly language.'),
});
export type TranslateTechnicalDetailsOutput = z.infer<typeof TranslateTechnicalDetailsOutputSchema>;

export async function translateTechnicalDetails(
  input: TranslateTechnicalDetailsInput
): Promise<TranslateTechnicalDetailsOutput> {
  return translateTechnicalDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTechnicalDetailsPrompt',
  input: {schema: TranslateTechnicalDetailsInputSchema},
  output: {schema: TranslateTechnicalDetailsOutputSchema},
  prompt: `You are an expert at translating technical details into customer-friendly explanations.\n\n  Technical Details: {{{technicalDetails}}}\n\n  Translate the above technical details into a customer-friendly explanation:\n  `,
});

export const translateTechnicalDetailsFlow = ai.defineFlow(
  {
    name: 'translateTechnicalDetailsFlow',
    inputSchema: TranslateTechnicalDetailsInputSchema,
    outputSchema: TranslateTechnicalDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
