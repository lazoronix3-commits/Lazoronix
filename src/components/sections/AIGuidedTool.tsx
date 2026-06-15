"use client"

import { useState } from 'react'
import { aiGuidedRecoveryPreparation, type AIGuidedRecoveryPreparationOutput } from '@/ai/flows/ai-guided-recovery-preparation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Sparkles, Loader2, CheckCircle2, ShieldAlert, ArrowRightCircle, Search } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export function AIGuidedTool() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIGuidedRecoveryPreparationOutput | null>(null)

  const handleAssessment = async () => {
    if (!description.trim()) return
    setLoading(true)
    try {
      const output = await aiGuidedRecoveryPreparation({ initialProblemDescription: description })
      setResult(output)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ai-tool" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            AI Recovery Assistant
          </div>
          <h2 className="text-4xl font-headline font-bold mb-4">Start Your Investigation Preparation</h2>
          <p className="text-muted-foreground text-lg">
            Tell us briefly about the scam or access issue you experienced. Our AI will help you identify the critical evidence needed for a professional recovery assessment.
          </p>
        </div>

        <Card className="glass-card mb-12">
          <CardContent className="p-8">
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground/80">
                What happened? (e.g., "I lost money to a fake forex broker", "I can't access my 2017 hardware wallet")
              </label>
              <Textarea 
                placeholder="Briefly describe the scam or technical issue..."
                className="min-h-[150px] bg-background/50 border-white/5 focus:border-primary/50 transition-colors text-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button 
                onClick={handleAssessment} 
                disabled={loading || !description.trim()}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Situation...
                  </>
                ) : (
                  <>
                    Get My Evidence Checklist
                    <Sparkles className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Search className="w-6 h-6 text-primary" />
                  Situation Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {result.recoveryScenarioSummary}
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  Evidence to Collect
                </h3>
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {result.informationCategoriesToGather.map((cat, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-4 bg-card/40 border-white/5">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <span className="text-left font-medium">{cat.categoryName}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">
                        <p className="mb-4">{cat.description}</p>
                        <ul className="space-y-2">
                          {cat.specificItemsToGather.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                  Important Warnings
                </h3>
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-6 space-y-4">
                    {result.importantConsiderations.map((con, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                        {con}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <ArrowRightCircle className="w-5 h-5 text-primary" />
                  Next Steps
                </h3>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <p className="text-sm leading-relaxed">
                      {result.nextStepsRecommendation}
                    </p>
                    <Button className="w-full mt-6 bg-primary" asChild>
                      <a href="#assessment-form">Submit Formal Assessment</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
