'use server';
/**
 * @fileOverview An AI agent for providing customer support.
 *
 * - askAria - A function that handles a user's support query.
 * - AskAriaInput - The input type for the askAria function.
 * - AskAriaOutput - The return type for the askAria function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAriaInputSchema = z.object({
  query: z.string().describe('The user\'s support question.'),
  history: z
    .array(z.object({role: z.enum(['user', 'model']), content: z.string()}))
    .optional()
    .describe('The conversation history.'),
});
export type AskAriaInput = z.infer<typeof AskAriaInputSchema>;

const AskAriaOutputSchema = z.object({
  response: z.string().describe("Aria's response to the user's query."),
});
export type AskAriaOutput = z.infer<typeof AskAriaOutputSchema>;

export async function askAria(input: AskAriaInput): Promise<AskAriaOutput> {
  return ariaSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ariaSupportPrompt',
  input: {schema: AskAriaInputSchema},
  output: {schema: AskAriaOutputSchema},
  prompt: `You are Aria, a friendly and helpful AI assistant for Close Kit, a software platform for contractors.\nYour goal is to answer user questions about the software.\nIf you don't know the answer, or if the user is frustrated, politely direct them to the support email: autobriefaiv1@gmail.com.\n\nHere is the conversation history:\n{{#if history}}\n  {{#each history}}\n    {{role}}: {{{content}}}\n  {{/each}}\n{{/if}}\n\nUser\'s latest question: {{{query}}}\n\nYour response:\n`,
});

export const ariaSupportFlow = ai.defineFlow(
  {
    name: 'ariaSupportFlow',
    inputSchema: AskAriaInputSchema,
    outputSchema: AskAriaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
