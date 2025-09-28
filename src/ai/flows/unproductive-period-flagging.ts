 'use server';
/**
 * @fileOverview Identifies periods of low productivity from activity logs.
 *
 * - unproductivePeriodFlagging - Flags unproductive periods in user activity.
 * - UnproductivePeriodFlaggingInput - The input type for the unproductivePeriodFlagging function.
 * - UnproductivePeriodFlaggingOutput - The return type for the unproductivePeriodFlagging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UnproductivePeriodFlaggingInputSchema = z.object({
  activityLogs: z.string().describe('A list of activity logs, each log should contain a timestamp, category, notes, and duration.'),
});
export type UnproductivePeriodFlaggingInput = z.infer<typeof UnproductivePeriodFlaggingInputSchema>;

const UnproductivePeriodFlaggingOutputSchema = z.object({
  unproductivePeriods: z
    .string()
    .describe(
      'A description of the periods identified as unproductive, including the start and end times, and the reasons why they are considered unproductive.'
    ),
});
export type UnproductivePeriodFlaggingOutput = z.infer<typeof UnproductivePeriodFlaggingOutputSchema>;

export async function unproductivePeriodFlagging(input: UnproductivePeriodFlaggingInput): Promise<UnproductivePeriodFlaggingOutput> {
  return unproductivePeriodFlaggingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'unproductivePeriodFlaggingPrompt',
  input: {schema: UnproductivePeriodFlaggingInputSchema},
  output: {schema: UnproductivePeriodFlaggingOutputSchema},
  prompt: `You are an AI assistant that analyzes user activity logs to identify periods of low productivity.

  Analyze the following activity logs and identify any periods where the user was not using their time effectively. Consider factors such as the duration of activities, the categories of activities, and any notes provided by the user.

  Activity Logs:
  {{activityLogs}}

  Respond with a description of the unproductive periods, including the start and end times, and the reasons why they are considered unproductive.
`,
});

const unproductivePeriodFlaggingFlow = ai.defineFlow(
  {
    name: 'unproductivePeriodFlaggingFlow',
    inputSchema: UnproductivePeriodFlaggingInputSchema,
    outputSchema: UnproductivePeriodFlaggingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
