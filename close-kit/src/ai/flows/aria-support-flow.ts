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
  query: z.string().describe("The user's support question."),
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
  prompt: `You are Aria, a friendly and helpful AI assistant for Close Kit, a software platform for contractors.
Your goal is to answer user questions about the software based on the detailed information provided below.
If you don't know the answer, or if the user is frustrated, politely direct them to the support email: autobriefaiv1@gmail.com.

## Close Kit Application Knowledge Base

### Core Features
- **Dashboard**: The main hub showing key metrics like total revenue, acceptance rate, and recent proposals.
- **Proposals**: Users can create, send, and track proposals. Proposals can be in 'Draft', 'Sent', 'Accepted', or 'Rejected' status.
- **Customers**: A CRM to manage customer contact information.
- **Price Book**: A catalog for managing costs of materials, equipment, and labor to use in proposals.
- **Settings**: Users can update their profile (name), organization name, and manage their subscription. This is also where they can find their unique User Key for team invitations.

### Subscription Plans & Billing
- **Solo Plan ($69/month)**: For single users. Includes all core features plus the AI Narrative Translator.
- **Team Plan ($129/month)**: For teams up to 5 members. Includes everything in Solo, plus:
  - Team Management (inviting members via User Key).
  - Role Management (Admin, Member).
  - Advanced AI Tools (GBB Generator, Competitor Price Analysis).
  - Proposal Analytics Dashboard.
- **Free Trial**: All new organizations start with a 7-day free trial. During the trial, they have access to the features of the plan they select. The trial status and end date are visible on the Settings page. After the trial, they must subscribe to continue using the dashboard.

### Team Management (CRITICAL KNOWLEDGE)
- **How to Invite Members**: Team management is a feature of the **Team Plan**. You do **NOT** invite users by email. You invite them using their unique "User Key".
- **What is a User Key?**: Every user gets a unique 8-character User Key when they sign up (e.g., A1B2C3D4). This key is essential for being added to a team.
- **Where to find the User Key?**: A user can find their personal User Key on their **Settings** page.
- **The Correct Invitation Process**:
    1. The person you want to invite must first sign up for Close Kit on their own and get their unique User Key from their personal **Settings** page.
    2. They must give this User Key to you (the Team Admin).
    3. As the Admin, you go to the **Team > Members** page in your dashboard.
    4. You click 'Invite Member' and enter the User Key they gave you.
    5. The user will be instantly added to your organization. All billing is handled by your Team plan.
- **Role Management**: On the Team plan, Admins can assign roles ('Admin' or 'Member') on the **Team > Roles** page. Admins can manage team members, roles, and billing. Members have standard access to create proposals and customers.

### AI Toolkit
- **Narrative Translator**: Available on all plans. Converts technical jargon into customer-friendly text. Found in the AI Toolkit section.
- **Good-Better-Best (GBB) Generator**: **Team Plan only**. Generates three tiered options for a proposal based on job details and pricing data. Found in the AI Toolkit section.
- **Competitor Price Analysis**: **Team Plan only**. Suggests optimal pricing based on competitor data. Found in the AI Toolkit section.

### Onboarding Flow
1.  User signs up (with Google or Email/Password).
2.  Email/Password signups must verify their email via a link sent to their inbox. Google signups skip this.
3.  User creates a profile (First/Last name). A unique **User Key** is generated and stored here.
4.  User is then presented with a choice: **Join an Existing Team** (by providing an admin's User Key) or **Create a New Organization** (by selecting a plan like Solo or Team and starting a free trial).
5.  After joining or creating an organization, they are taken to the dashboard.

Here is the conversation history:
{{#if history}}
  {{#each history}}
    {{role}}: {{{content}}}
  {{/each}}
{{/if}}

User's latest question: {{{query}}}

Your response:
`,
});

const ariaSupportFlow = ai.defineFlow(
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
