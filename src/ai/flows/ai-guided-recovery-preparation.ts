'use server';
/**
 * @fileOverview An AI-powered tool that guides users through gathering critical information for digital asset recovery.
 *
 * - aiGuidedRecoveryPreparation - A function that handles the AI-guided recovery preparation process.
 * - AIGuidedRecoveryPreparationInput - The input type for the aiGuidedRecoveryPreparation function.
 * - AIGuidedRecoveryPreparationOutput - The return type for the aiGuidedRecoveryPreparation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIGuidedRecoveryPreparationInputSchema = z.object({
  initialProblemDescription: z
    .string()
    .describe(
      'A detailed description of the user\'s digital asset recovery problem, including category-specific structured data and narrative.'
    ),
});
export type AIGuidedRecoveryPreparationInput = z.infer<
  typeof AIGuidedRecoveryPreparationInputSchema
>;

const AIGuidedRecoveryPreparationOutputSchema = z.object({
  recoveryScenarioSummary: z
    .string()
    .describe(
      "A summary of the user's recovery scenario based on their initial description."
    ),
  recoveryIndicators: z
    .array(
      z.object({
        label: z.string().describe('The name of the indicator (e.g., Identity Verification, Transaction Trail).'),
        status: z.enum(['positive', 'neutral', 'negative']).describe('The status of this recovery factor.'),
        description: z.string().describe('Short explanation of why this status was assigned.'),
      })
    )
    .describe('Forensic indicators that determine the probability and difficulty of recovery.'),
  informationCategoriesToGather: z
    .array(
      z.object({
        categoryName: z
          .string()
          .describe('The name of the investigation focus (e.g., Identity Verification, Fund Movement Analysis).'),
        description: z
          .string()
          .describe(
            'A detailed explanation of why this focus area is critical for this specific case.'
          ),
        specificItemsToGather: z
          .array(z.string())
          .describe(
            'A list of specific forensic items or evidence the user should gather for this focus area.'
          ),
      })
    )
    .describe(
      'A structured list of forensic investigation focus areas the user needs to address.'
    ),
  importantConsiderations: z
    .array(z.string())
    .describe(
      'A list of important considerations or warnings for the user during the information gathering process.'
    ),
  nextStepsRecommendation: z
    .string()
    .describe(
      'Overall advice for the user on how to proceed with preparing and submitting their case.'
    ),
});
export type AIGuidedRecoveryPreparationOutput = z.infer<
  typeof AIGuidedRecoveryPreparationOutputSchema
>;

const aiGuidedRecoveryPreparationPrompt = ai.definePrompt({
  name: 'aiGuidedRecoveryPreparationPrompt',
  input: {schema: AIGuidedRecoveryPreparationInputSchema},
  output: {schema: AIGuidedRecoveryPreparationOutputSchema},
  prompt: `You are an expert digital asset recovery forensic specialist. Your goal is to analyze a user's recovery case and provide a structured "Forensic Assessment".

Based on the provided case data, identify:
1. **Recovery Indicators**: Evaluate factors like evidence availability, transaction traceability, and entity identification. Assign a status (positive/neutral/negative) for each.
2. **Investigation Focus**: Instead of generic categories, use forensic terms such as:
   - Identity Verification (especially for romance/job scams)
   - Transaction Tracing (especially for crypto/broker scams)
   - Fund Movement Analysis
   - Communication Evidence Review
3. **Scenario Summary**: A professional summary of what happened.
4. **Security Warnings**: Critical safety advice.
5. **Forensic Path**: Clear next steps.

User's Case Data:
{{{initialProblemDescription}}}

Be precise, authoritative, and focused on technical feasibility. Avoid generic platitudes; focus on digital forensics and technical trail analysis.`,
});

const aiGuidedRecoveryPreparationFlow = ai.defineFlow(
  {
    name: 'aiGuidedRecoveryPreparationFlow',
    inputSchema: AIGuidedRecoveryPreparationInputSchema,
    outputSchema: AIGuidedRecoveryPreparationOutputSchema,
  },
  async input => {
    const {output} = await aiGuidedRecoveryPreparationPrompt(input);
    return output!;
  }
);

export async function aiGuidedRecoveryPreparation(
  input: AIGuidedRecoveryPreparationInput
): Promise<AIGuidedRecoveryPreparationOutput> {
  return aiGuidedRecoveryPreparationFlow(input);
}
