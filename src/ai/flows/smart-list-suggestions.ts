'use server';

/**
 * @fileOverview Provides AI-powered smart list suggestions for task organization.
 *
 * - suggestSmartLists - A function that suggests smart lists based on user tasks.
 * - SuggestSmartListsInput - The input type for the suggestSmartLists function.
 * - SuggestSmartListsOutput - The return type for the suggestSmartLists function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSmartListsInputSchema = z.object({
  tasks: z
    .array(z.string())
    .describe('An array of tasks to be organized into smart lists.'),
});
export type SuggestSmartListsInput = z.infer<typeof SuggestSmartListsInputSchema>;

const SuggestSmartListsOutputSchema = z.object({
  suggestedLists: z
    .array(z.string())
    .describe('An array of suggested smart lists based on the input tasks.'),
});
export type SuggestSmartListsOutput = z.infer<typeof SuggestSmartListsOutputSchema>;

export async function suggestSmartLists(input: SuggestSmartListsInput): Promise<SuggestSmartListsOutput> {
  return suggestSmartListsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSmartListsPrompt',
  input: {schema: SuggestSmartListsInputSchema},
  output: {schema: SuggestSmartListsOutputSchema},
  prompt: `Given the following list of tasks, suggest a few smart lists that would help the user organize them efficiently. The smart lists should be concise and relevant to the tasks.

Tasks:
{{#each tasks}}- {{{this}}}
{{/each}}

Suggested Lists:`,
});

const suggestSmartListsFlow = ai.defineFlow(
  {
    name: 'suggestSmartListsFlow',
    inputSchema: SuggestSmartListsInputSchema,
    outputSchema: SuggestSmartListsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
