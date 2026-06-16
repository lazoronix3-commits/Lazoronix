'use server';
/**
 * @fileOverview A clinical digital asset recovery intake engine focused on preliminary case findings.
 *
 * - aiGuidedRecoveryPreparation - A function that generates technical findings based on intake data.
 * - AIGuidedRecoveryPreparationInput - The input type for the aiGuidedRecoveryPreparation function.
 * - AIGuidedRecoveryPreparationOutput - The return type for the aiGuidedRecoveryPreparation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIGuidedRecoveryPreparationInputSchema = z.object({
  initialProblemDescription: z
    .string()
    .describe(
      'A detailed description of the case, including structured category data and technical narrative.'
    ),
});
export type AIGuidedRecoveryPreparationInput = z.infer<
  typeof AIGuidedRecoveryPreparationInputSchema
>;

const AIGuidedRecoveryPreparationOutputSchema = z.object({
  preliminaryCaseFindings: z.object({
    scamType: z.string().describe('Identified fraud category.'),
    estimatedLoss: z.string().describe('Total financial loss value.'),
    evidenceStatus: z.enum(['Incomplete', 'Partial', 'Substantial']).describe('Technical status of gathered evidence.'),
    investigationReadiness: z.string().describe('Status of technical data required for investigation (e.g., Requires Additional Information).'),
    caseComplexity: z.enum(['Moderate', 'High', 'Extremely High']).describe('Technical difficulty level.'),
    reviewRecommendation: z.string().describe('The definitive professional next step (e.g., Professional Assessment Recommended).'),
  }).describe('Structured findings for clinical dashboard scanning.'),
  recoveryScenarioSummary: z
    .string()
    .describe(
      "A clinical forensic summary of the case scenario (max one sentence)."
    ),
  investigativeFocusAreas: z.array(z.object({
    categoryName: z.string().describe('Technical focus area.'),
    description: z.string().describe('Technical reason why this area is critical.'),
    specificItems: z.array(z.string()).describe('Specific items to gather.')
  })).describe('Category-specific investigation requirements.')
});
export type AIGuidedRecoveryPreparationOutput = z.infer<
  typeof AIGuidedRecoveryPreparationOutputSchema
>;

const aiGuidedRecoveryPreparationPrompt = ai.definePrompt({
  name: 'aiGuidedRecoveryPreparationPrompt',
  input: {schema: AIGuidedRecoveryPreparationInputSchema},
  output: {schema: AIGuidedRecoveryPreparationOutputSchema},
  prompt: `You are an enterprise-grade digital forensic scanner for Lazoronix. 

Your task is to conduct an "Automated Case Intake Assessment" based on the user's data.

Tone: Clinical, authoritative, technical, and objective. Avoid all conversational filler, empathy, or promises of success.

Analysis Goals:
1. **Findings Dashboard**: Provide structured data for Scam Type, Loss, Evidence Status, Investigation Readiness, Complexity, and Review Recommendation.
2. **Scenario Summary**: A one-sentence technical summary of the incident.
3. **Investigative Focus**: Identify 3-4 specific technical areas that require focus based on the scam type provided.

Input Data:
{{{initialProblemDescription}}}

Be Technical. Use terms like "Fund Obfuscation", "Blockchain Analysis", "Asset Tracing", and "Evidence Integrity". 
Do NOT use percentages or numeric probabilities for recovery outcomes. Use qualitative labels like "Moderate", "High", "Professional Assessment Recommended".`,
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
