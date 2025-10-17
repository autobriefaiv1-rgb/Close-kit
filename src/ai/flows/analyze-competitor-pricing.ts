'use server';

/**
 * @fileOverview An AI agent for analyzing competitor pricing and suggesting optimal pricing strategies.
 *
 * - analyzeCompetitorPricing - A function that handles the competitor price analysis process.
 * - AnalyzeCompetitorPricingInput - The input type for the analyzeCompetitorPricing function.
 * - AnalyzeCompetitorPricingOutput - The return type for the analyzeCompetitorPricing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCompetitorPricingInputSchema = z.object({
  competitorData: z
    .string()
    .describe('The pricing data of competitors, including products/services and prices.'),
  jobDetails: z
    .string()
    .describe('Details about the specific job, including materials, labor, and complexity.'),
  desiredProfitMargin: z
    .number()
    .describe('The desired profit margin for the job, as a percentage.'),
});
export type AnalyzeCompetitorPricingInput = z.infer<typeof AnalyzeCompetitorPricingInputSchema>;

const AnalyzeCompetitorPricingOutputSchema = z.object({
  suggestedPricingStrategy: z.string().describe('The suggested pricing strategy based on the analysis.'),
  priceJustification: z.string().describe('The justification for the suggested pricing strategy.'),
});
export type AnalyzeCompetitorPricingOutput = z.infer<typeof AnalyzeCompetitorPricingOutputSchema>;

export async function analyzeCompetitorPricing(
  input: AnalyzeCompetitorPricingInput
): Promise<AnalyzeCompetitorPricingOutput> {
  return analyzeCompetitorPricingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCompetitorPricingPrompt',
  input: {schema: AnalyzeCompetitorPricingInputSchema},
  output: {schema: AnalyzeCompetitorPricingOutputSchema},
  prompt: `You are a pricing strategy expert for contractors.\n\nAnalyze the competitor pricing data and job details provided, and suggest an optimal pricing strategy to remain competitive and maximize profitability.\nConsider the desired profit margin when formulating the strategy.\n\nCompetitor Pricing Data: {{{competitorData}}}\nJob Details: {{{jobDetails}}}\nDesired Profit Margin: {{{desiredProfitMargin}}}%\n\nBased on this information, provide a suggested pricing strategy and a justification for the strategy.\n\nFormat your response as:\nSuggested Pricing Strategy: [Suggested pricing strategy]\nPrice Justification: [Justification for the suggested pricing strategy]`,
});

export const analyzeCompetitorPricingFlow = ai.defineFlow(
  {
    name: 'analyzeCompetitorPricingFlow',
    inputSchema: AnalyzeCompetitorPricingInputSchema,
    outputSchema: AnalyzeCompetitorPricingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
