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
      'A detailed description of the user\u0027s digital asset recovery problem, including what happened, what assets are involved, and what they have tried so far.'
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
  informationCategoriesToGather: z
    .array(
      z.object({
        categoryName: z
          .string()
          .describe('The name of the information category (e.g., Wallet Details, Transaction History).'),
        description: z
          .string()
          .describe(
            'A detailed explanation of what kind of information falls under this category and why it is important.'
          ),
        specificItemsToGather: z
          .array(z.string())
          .describe(
            'A list of specific items the user should gather for this category (e.g., \"Wallet brand/model\", \"Transaction IDs\").'
          ),
      })
    )
    .describe(
      'A structured list of categories of information the user needs to gather to prepare their case.'
    ),
  importantConsiderations: z
    .array(z.string())
    .describe(
      'A list of important considerations or warnings for the user during the information gathering process (e.g., \"Do not share private keys\").'
    ),
  nextStepsRecommendation: z
    .string()
    .describe(
      'Overall advice for the user on how to proceed with preparing and submitting their case, based on the AI\u0027s guidance.'
    ),
});
export type AIGuidedRecoveryPreparationOutput = z.infer<
  typeof AIGuidedRecoveryPreparationOutputSchema
>;

const aiGuidedRecoveryPreparationPrompt = ai.definePrompt({
  name: 'aiGuidedRecoveryPreparationPrompt',
  input: {schema: AIGuidedRecoveryPreparationInputSchema},
  output: {schema: AIGuidedRecoveryPreparationOutputSchema},
  prompt: `You are an expert digital asset recovery assistant. Your goal is to help users gather and understand all critical information relevant for their specific digital asset recovery scenario.

Based on the user's initial problem description, you need to identify what information they should gather to accurately prepare their case for submission. Provide structured guidance.

User's initial problem description: {{{initialProblemDescription}}}

Instructions:
1. Provide a concise summary of the user's recovery scenario.
2. Identify key categories of information the user needs to gather. For each category, explain why it's important and list specific items they should look for.
3. Include important considerations or warnings related to sensitive information or security during the gathering process.
4. Offer clear next steps recommendations for preparing their case.

Focus on being comprehensive, clear, and actionable.`,
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
