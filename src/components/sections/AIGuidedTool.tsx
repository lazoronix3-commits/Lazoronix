"use client"

import { useState } from 'react'
import { aiGuidedRecoveryPreparation, type AIGuidedRecoveryPreparationOutput } from '@/ai/flows/ai-guided-recovery-preparation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRightCircle, 
  Search,
  TrendingUp,
  BarChart,
  Heart,
  Briefcase,
  Banknote,
  Wallet,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type CaseType = {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const CASE_TYPES: CaseType[] = [
  { 
    id: "forex", 
    title: "Forex Scam Recovery", 
    description: "Lost money to a broker, trading platform, or investment advisor.",
    icon: TrendingUp 
  },
  { 
    id: "investment", 
    title: "Investment Scam Recovery", 
    description: "Fake investment opportunities, crypto investments, Ponzi schemes.",
    icon: BarChart 
  },
  { 
    id: "romance", 
    title: "Romance Scam Recovery", 
    description: "Funds sent to someone met online.",
    icon: Heart 
  },
  { 
    id: "job", 
    title: "Job Scam Recovery", 
    description: "Fake employment opportunities and recruitment fraud.",
    icon: Briefcase 
  },
  { 
    id: "loan", 
    title: "Loan Scam Recovery", 
    description: "Advance-fee loan scams and lending fraud.",
    icon: Banknote 
  },
  { 
    id: "wallet", 
    title: "Wallet Recovery", 
    description: "Lost access to crypto wallets or digital assets.",
    icon: Wallet 
  },
  { 
    id: "other", 
    title: "Other Asset Recovery", 
    description: "Custom investigation case.",
    icon: MoreHorizontal 
  },
]

export function AIGuidedTool() {
  const [step, setStep] = useState<'type' | 'details' | 'result'>('type')
  const [selectedType, setSelectedType] = useState<CaseType | null>(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIGuidedRecoveryPreparationOutput | null>(null)

  const handleSelectType = (type: CaseType) => {
    setSelectedType(type)
    setStep('details')
  }

  const handleAssessment = async () => {
    if (!description.trim() || !selectedType) return
    setLoading(true)
    try {
      // Combine type and description for the AI
      const fullPrompt = `Case Type: ${selectedType.title}\nDescription: ${description}`
      const output = await aiGuidedRecoveryPreparation({ initialProblemDescription: fullPrompt })
      setResult(output)
      setStep('result')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ai-tool" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors", step === 'type' ? "bg-primary text-white" : "bg-primary/20 text-primary")}>1</div>
            <div className="w-12 h-px bg-white/10" />
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors", step === 'details' ? "bg-primary text-white" : "bg-primary/20 text-primary")}>2</div>
            <div className="w-12 h-px bg-white/10" />
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors", step === 'result' ? "bg-primary text-white" : "bg-primary/20 text-primary")}>3</div>
          </div>
        </div>

        {step === 'type' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                <Sparkles className="w-3 h-3" />
                Case Intake System
              </div>
              <h2 className="text-4xl font-headline font-bold mb-4">What Type of Recovery Case Do You Have?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Select the category that best matches your situation to begin your forensic evaluation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASE_TYPES.map((type) => (
                <Card 
                  key={type.id} 
                  className="glass-card hover:border-primary/50 transition-all cursor-pointer group"
                  onClick={() => handleSelectType(type)}
                >
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <type.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-bold mb-3">{type.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{type.description}</p>
                    <div className="flex items-center text-primary font-bold text-sm">
                      Select Case Type <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'details' && selectedType && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-8 hover:bg-white/5"
              onClick={() => setStep('type')}
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Case Types
            </Button>
            
            <div className="mb-12">
              <h2 className="text-3xl font-headline font-bold mb-4">Provide Case Details</h2>
              <p className="text-muted-foreground">
                You've selected <span className="text-foreground font-bold">{selectedType.title}</span>. Briefly describe what happened, including the platform name and when it occurred.
              </p>
            </div>

            <Card className="glass-card mb-12">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Incident Description
                    </label>
                    <Textarea 
                      placeholder="e.g. 'I invested $5,000 into a broker called [Name] and now they are demanding a 20% tax before I can withdraw my balance...'"
                      className="min-h-[200px] bg-background/50 border-white/5 focus:border-primary/50 transition-colors text-lg p-4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleAssessment} 
                    disabled={loading || !description.trim()}
                    className="w-full h-14 text-lg bg-primary hover:bg-primary/90 font-bold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Forensic Evidence...
                      </>
                    ) : (
                      <>
                        Generate Recovery Roadmap
                        <Sparkles className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-headline font-bold">Preliminary Case Assessment</h2>
               <Button variant="outline" onClick={() => setStep('type')} className="border-white/10 hover:bg-white/5">
                 New Assessment
               </Button>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Search className="w-6 h-6 text-primary" />
                  Forensic Scenario Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {result.recoveryScenarioSummary}
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  Evidence Intake Checklist
                </h3>
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {result.informationCategoriesToGather.map((cat, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-4 bg-card/40 border-white/5 overflow-hidden">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <span className="text-left font-bold">{cat.categoryName}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">
                        <p className="mb-4 text-sm">{cat.description}</p>
                        <ul className="space-y-3">
                          {cat.specificItemsToGather.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                              <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-headline font-semibold flex items-center gap-2 mb-6">
                    <ShieldAlert className="w-5 h-5 text-destructive" />
                    Security Protocol & Warnings
                  </h3>
                  <Card className="border-destructive/20 bg-destructive/5 rounded-2xl">
                    <CardContent className="p-6 space-y-4">
                      {result.importantConsiderations.map((con, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-foreground/90 font-medium">
                          <ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          {con}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-headline font-semibold flex items-center gap-2 mb-6">
                    <ArrowRightCircle className="w-5 h-5 text-primary" />
                    Recommended Recovery Path
                  </h3>
                  <Card className="border-primary/20 bg-primary/5 rounded-2xl">
                    <CardContent className="p-6">
                      <p className="text-sm leading-relaxed mb-8 opacity-90">
                        {result.nextStepsRecommendation}
                      </p>
                      <Button className="w-full h-12 bg-primary group" asChild>
                        <a href="#assessment-form">
                          Submit Case for Professional Forensic Review
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
