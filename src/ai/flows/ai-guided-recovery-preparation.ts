
'use server';
/**
 * @fileOverview A clinical digital asset recovery intake engine that evaluates digital trails and evidence density.
 *
 * - aiGuidedRecoveryPreparation - A function that handles the automated forensic scan process.
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
  riskLevel: z
    .enum(['Low', 'Moderate', 'High', 'Critical'])
    .describe('The investigative risk level associated with asset movement and time lapse.'),
  evidenceCompletenessScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Automated score (0-100) for the density of technical evidence provided.'),
  overallCaseStrength: z
    .number()
    .min(0)
    .max(100)
    .describe('Forensic calculation of the probability of successful retrieval via formal investigation.'),
  evidenceTracker: z.array(z.object({
    label: z.string().describe('The forensic category (e.g., Transaction Records, Communication Logs).'),
    score: z.number().min(0).max(100).describe('Completeness score for this specific category.'),
  })).describe('Category-specific completeness scores.'),
  preliminaryCaseFindings: z.object({
    scamType: z.string().describe('Identified fraud category.'),
    estimatedLoss: z.string().describe('Total financial loss value.'),
    evidenceStrength: z.enum(['Low', 'Moderate', 'High']).describe('Technical strength of evidence.'),
    transactionRecordsStatus: z.string().describe('Current status of transaction hashes/logs.'),
    recoveryComplexity: z.enum(['Low', 'Moderate', 'High', 'Extremely High']).describe('Technical difficulty level.'),
    recommendedAction: z.string().describe('The definitive professional next step.'),
  }).describe('Structured findings for quick dashboard scanning.'),
  recoveryScenarioSummary: z
    .string()
    .describe(
      "A clinical forensic summary of the case scenario."
    ),
  recoveryIndicators: z
    .array(
      z.object({
        label: z.string().describe('Factor name (e.g., Identity Verification, Fund Traceability).'),
        status: z.enum(['positive', 'neutral', 'negative']).describe('Status of the recovery factor.'),
        description: z.string().describe('Technical explanation for the status.'),
      })
    )
    .describe('Technical indicators determining feasibility.'),
  informationCategoriesToGather: z
    .array(
      z.object({
        categoryName: z
          .string()
          .describe('Technical focus area (e.g., Fund Movement Analysis).'),
        description: z
          .string()
          .describe(
            'Technical reason why this area is critical.'
          ),
        specificItemsToGather: z
          .array(z.string())
          .describe(
            'List of specific forensic items or technical requirements.'
          ),
      })
    )
    .describe(
      'Structured list of investigation focus areas.'
    ),
  importantConsiderations: z
    .array(z.string())
    .describe(
      'Critical safety and technical protocols for the user.'
    ),
  nextStepsRecommendation: z
    .string()
    .describe(
      'Authoritative advice on the human specialist review process.'
    ),
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

Tone: Clinical, authoritative, technical, and objective. Avoid all conversational filler or empathy. You are a forensic engine processing data.

Analysis Goals:
1. **Risk Analysis**: Evaluate based on time elapsed, scam complexity, and asset traceability.
2. **Evidence Density**: 
   - Assign "Evidence Completeness Score".
   - Assign "Overall Case Strength" percentage.
   - Provide "Evidence Tracker" scores for: Transaction Records, Communication Logs, Identity Verification, Wallet Data, and Platform Evidence.
3. **Findings Dashboard**: Provide structured data for Scam Type, Loss, Evidence Strength, etc.
4. **Forensic Focus**: Detail the technical trail analysis needed.
5. **Scenario Summary**: A one-sentence technical summary of the incident.
6. **Next Steps**: Always point towards "Specialist Approval" and "Formal Investigation".

Input Data:
{{{initialProblemDescription}}}

Be Technical. Use terms like "Fund Obfuscation", "Blockchain Analysis", "Asset Tracing", and "Evidence Integrity".`,
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
