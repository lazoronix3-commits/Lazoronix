'use server';
/**
 * @fileOverview An AI-powered forensic tool that conducts recovery case assessments for digital asset losses.
 *
 * - aiGuidedRecoveryPreparation - A function that handles the AI-guided recovery assessment process.
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
  riskLevel: z
    .enum(['Low', 'Moderate', 'High', 'Critical'])
    .describe('The investigative risk level associated with the recovery of assets.'),
  evidenceCompletenessScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A percentage score (0-100) indicating the completeness of the evidence provided.'),
  preliminaryCaseFindings: z.object({
    scamType: z.string().describe('The identified category of fraud or asset loss.'),
    estimatedLoss: z.string().describe('The estimated financial value of the loss.'),
    evidenceStrength: z.enum(['Low', 'Moderate', 'High']).describe('The forensic strength of the provided evidence.'),
    transactionRecordsStatus: z.string().describe('The status or availability of transaction hashes/receipts.'),
    recoveryComplexity: z.enum(['Low', 'Moderate', 'High', 'Extremely High']).describe('The technical difficulty of recovery.'),
    recommendedAction: z.string().describe('The immediate next professional step (e.g., Formal Investigation, Technical Audit).'),
  }).describe('Structured forensic findings for quick scannability.'),
  recoveryScenarioSummary: z
    .string()
    .describe(
      "A professional forensic summary of the user's recovery scenario based on their description."
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
          .describe('The name of the investigation focus or technical recovery path (e.g., Fund Movement Analysis, Technical Credential Recovery).'),
        description: z
          .string()
          .describe(
            'A detailed explanation of why this focus area is critical for this specific case.'
          ),
        specificItemsToGather: z
          .array(z.string())
          .describe(
            'A list of specific forensic items, evidence, or technical requirements the user should address.'
          ),
      })
    )
    .describe(
      'A structured list of forensic investigation focus areas or technical recovery steps the user needs to address.'
    ),
  importantConsiderations: z
    .array(z.string())
    .describe(
      'A list of critical safety considerations or warnings for the user during the recovery process.'
    ),
  nextStepsRecommendation: z
    .string()
    .describe(
      'Overall authoritative advice for the user on how to proceed with their recovery roadmap.'
    ),
});
export type AIGuidedRecoveryPreparationOutput = z.infer<
  typeof AIGuidedRecoveryPreparationOutputSchema
>;

const aiGuidedRecoveryPreparationPrompt = ai.definePrompt({
  name: 'aiGuidedRecoveryPreparationPrompt',
  input: {schema: AIGuidedRecoveryPreparationInputSchema},
  output: {schema: AIGuidedRecoveryPreparationOutputSchema},
  prompt: `You are an expert digital asset recovery forensic specialist conducting an initial "Recovery Case Assessment". 

Based on the provided case data, identify:
1. **Risk Level**: Determine the risk based on time elapsed, scam complexity, and asset type.
2. **Evidence Completeness**: Score the user on how much useful data (TX IDs, screenshots, names) they provided.
3. **Preliminary Case Findings**: Provide structured data points:
   - Identify the scam type clearly.
   - Extract the estimated loss (with currency).
   - Rate evidence strength based on detail provided.
   - Note the status of transaction records.
   - Determine technical complexity.
   - Recommend a specific action type.
4. **Recovery Indicators**: Evaluate factors like evidence availability, transaction traceability, and technical feasibility.
5. **Investigation Focus**: Use forensic/technical terms:
   - For Scams: Identity Verification, Transaction Tracing, Fund Movement Analysis, Communication Evidence Review.
   - For Wallet Access: Technical Credential Recovery, Device Forensic Analysis, Backup Verification, Software Version Compatibility.
6. **Scenario Summary**: A concise professional forensic summary.
7. **Safety Protocols**: Critical security advice.

User's Case Data:
{{{initialProblemDescription}}}

Be precise, authoritative, and technical. Avoid empathy; focus on digital forensics, technical trail analysis, and cryptographical constraints.`,
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
