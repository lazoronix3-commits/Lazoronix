"use client"

import { useState, useEffect } from 'react'
import { aiGuidedRecoveryPreparation, type AIGuidedRecoveryPreparationOutput } from '@/ai/flows/ai-guided-recovery-preparation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
  ArrowRight,
  UploadCloud,
  FileText,
  ShieldCheck,
  AlertCircle,
  Activity,
  XCircle,
  MinusCircle,
  Fingerprint,
  Info,
  Clock,
  ClipboardList
} from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type CaseType = {
  id: string;
  title: string;
  description: string;
  icon: any;
  fields: {
    label: string;
    placeholder: string;
    key: string;
    type?: string;
    options?: string[];
  }[];
}

const CASE_TYPES: CaseType[] = [
  { 
    id: "forex", 
    title: "Forex Scam Recovery", 
    description: "Lost money to a broker, trading platform, or investment advisor.",
    icon: TrendingUp,
    fields: [
      { key: 'brokerName', label: 'Broker/Platform Name', placeholder: 'e.g. Global Trade FX' },
      { key: 'website', label: 'Website URL', placeholder: 'e.g. www.fakebroker.com' },
      { key: 'amount', label: 'Approximate Amount Lost', placeholder: 'e.g. 5,000', type: 'number' },
      { key: 'withdrawalAttempts', label: 'Withdrawal Attempts', placeholder: 'e.g. 3 attempts denied' },
      { key: 'paymentMethods', label: 'Payment Methods Used', placeholder: 'e.g. Bank transfer, USDT' },
      { key: 'walletAddress', label: 'Destination Wallet (if known)', placeholder: 'Address you sent funds to' },
    ]
  },
  { 
    id: "investment", 
    title: "Investment Scam Recovery", 
    description: "Fake investment opportunities, crypto investments, Ponzi schemes.",
    icon: BarChart,
    fields: [
      { key: 'platformName', label: 'Investment Platform', placeholder: 'e.g. CryptoGrowth Pro' },
      { key: 'website', label: 'Website URL', placeholder: 'e.g. www.cryptogrowth.io' },
      { key: 'amount', label: 'Amount Invested', placeholder: 'e.g. 10,000', type: 'number' },
      { key: 'referralSource', label: 'Referral Source', placeholder: 'e.g. Telegram group, Facebook ad' },
      { key: 'cryptoWallet', label: 'Recipient Wallet Address', placeholder: 'Address you sent funds to' },
    ]
  },
  { 
    id: "romance", 
    title: "Romance Scam Recovery", 
    description: "Funds sent to someone met online.",
    icon: Heart,
    fields: [
      { key: 'platformMet', label: 'Platform Where You Met', placeholder: 'e.g. Tinder, Hinge, Facebook' },
      { key: 'communicationDuration', label: 'Duration of Communication', placeholder: 'e.g. 3 months' },
      { key: 'amount', label: 'Total Funds Sent', placeholder: 'e.g. 2,500', type: 'number' },
      { key: 'transferMethod', label: 'Payment Method(s)', placeholder: 'e.g. Wire, USDT, Gift Cards' },
      { key: 'cryptoInvolvement', label: 'Crypto Involved?', placeholder: 'Yes/No (which coins?)' },
    ]
  },
  { 
    id: "job", 
    title: "Job Scam Recovery", 
    description: "Fake employment opportunities and recruitment fraud.",
    icon: Briefcase,
    fields: [
      { key: 'companyName', label: 'Company Name Used', placeholder: 'e.g. Remote Solutions Inc' },
      { key: 'jobTitle', label: 'Job Title Offered', placeholder: 'e.g. Data Entry Specialist' },
      { key: 'amount', label: 'Fees Paid', placeholder: 'e.g. 500', type: 'number' },
      { key: 'contactPlatform', label: 'Contact Platform', placeholder: 'e.g. WhatsApp, LinkedIn' },
    ]
  },
  { 
    id: "loan", 
    title: "Loan Scam Recovery", 
    description: "Advance-fee loan scams and lending fraud.",
    icon: Banknote,
    fields: [
      { key: 'lenderName', label: 'Lender/Agency Name', placeholder: 'e.g. FastCapital Loans' },
      { key: 'feeReason', label: 'Reason for Upfront Fee', placeholder: 'e.g. Insurance, Tax, Activation' },
      { key: 'amount', label: 'Total Fees Paid', placeholder: 'e.g. 1,200', type: 'number' },
    ]
  },
  { 
    id: "wallet", 
    title: "Wallet Recovery", 
    description: "Lost access to crypto wallets or digital assets.",
    icon: Wallet,
    fields: [
      { key: 'walletType', label: 'Wallet Type', placeholder: 'Ledger, Metamask, Trust Wallet, etc.' },
      { key: 'issueType', label: 'What is the Issue?', placeholder: 'Lost password, Lost seed, Damaged, etc.' },
      { key: 'walletValue', label: 'Estimated Wallet Value', placeholder: 'e.g. 0.5 BTC / $25,000', type: 'text' },
      { key: 'lastAccess', label: 'Last Successful Access', placeholder: 'e.g. 2023-12-01' },
    ]
  },
  { 
    id: "other", 
    title: "Other Asset Recovery", 
    description: "Custom investigation case.",
    icon: MoreHorizontal,
    fields: [
      { key: 'subject', label: 'Case Subject', placeholder: 'Briefly name the entity involved' },
      { key: 'amount', label: 'Estimated Loss', placeholder: 'e.g. 3,000', type: 'number' },
      { key: 'entityDetails', label: 'Entity Details', placeholder: 'Website, social media, or phone numbers' },
    ]
  },
]

export function AIGuidedTool() {
  const [step, setStep] = useState<'type' | 'details' | 'result'>('type')
  const [selectedType, setSelectedType] = useState<CaseType | null>(null)
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [description, setDescription] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [hasAccess, setHasAccess] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIGuidedRecoveryPreparationOutput | null>(null)
  const [caseId, setCaseId] = useState('')

  useEffect(() => {
    if (step === 'result' && !caseId) {
      setCaseId(`LRX-${Math.floor(10000 + Math.random() * 90000)}`)
    }
  }, [step, caseId])

  const handleSelectType = (type: CaseType) => {
    setSelectedType(type)
    setStep('details')
    setFormValues({})
  }

  const handleInputChange = (key: string, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }))
  }

  const handleAssessment = async () => {
    if (!selectedType) return
    setLoading(true)
    try {
      const structuredDetails = Object.entries(formValues)
        .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${v}`)
        .join('\n')
      
      const fullPrompt = `
CASE CATEGORY: ${selectedType.title}
STRUCTURED DATA:
${structuredDetails}
WITHDRAWALS BLOCKED: ${isBlocked ? 'YES' : 'NO'}
STILL HAVE ACCESS: ${hasAccess ? 'YES' : 'NO'}

DETAILED NARRATIVE:
${description}
      `.trim()

      const output = await aiGuidedRecoveryPreparation({ initialProblemDescription: fullPrompt })
      setResult(output)
      setStep('result')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'positive': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      case 'negative': return <XCircle className="w-5 h-5 text-destructive" />
      default: return <MinusCircle className="w-5 h-5 text-amber-500" />
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'positive': return 'bg-emerald-500/10 border-emerald-500/20'
      case 'negative': return 'bg-destructive/10 border-destructive/20'
      default: return 'bg-amber-500/10 border-amber-500/20'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-destructive'
      case 'High': return 'text-orange-500'
      case 'Moderate': return 'text-amber-500'
      default: return 'text-emerald-500'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Extremely High': return 'text-destructive'
      case 'High': return 'text-orange-500'
      case 'Moderate': return 'text-amber-500'
      default: return 'text-emerald-500'
    }
  }

  return (
    <section id="ai-tool" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Step Indicator */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all", step === 'type' ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-transparent border-white/10 text-muted-foreground")}>1</div>
            <div className={cn("w-12 h-0.5 transition-colors", step !== 'type' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all", step === 'details' ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : step === 'result' ? "bg-primary/20 border-primary text-primary" : "bg-transparent border-white/10 text-muted-foreground")}>2</div>
            <div className={cn("w-12 h-0.5 transition-colors", step === 'result' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all", step === 'result' ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-transparent border-white/10 text-muted-foreground")}>3</div>
          </div>
        </div>

        {step === 'type' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Case Intake System
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">What Type of Recovery Case <br/> Do You Have?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Our forensic methodology is tailored to the specific nature of your loss. Select a category to begin your guided assessment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASE_TYPES.map((type) => (
                <Card 
                  key={type.id} 
                  className="glass-card hover:border-primary/50 transition-all cursor-pointer group hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.98]"
                  onClick={() => handleSelectType(type)}
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                      <type.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-bold mb-3">{type.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">{type.description}</p>
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
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-8 hover:bg-white/5 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setStep('type')
                setFormValues({})
                setDescription('')
              }}
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Case Types
            </Button>
            
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Forensic Intake: {selectedType.title}</h2>
              <p className="text-muted-foreground text-lg">
                Please provide specific details to help our system map the digital trail of your assets.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="glass-card border-white/5 overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-primary/20 to-transparent" />
                  <CardContent className="p-8 space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {selectedType.fields.map((field) => (
                        <div key={field.key} className="space-y-3">
                          <Label className="text-sm font-bold text-foreground/80">{field.label}</Label>
                          <Input 
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            className="h-12 bg-background/50 border-white/10 focus:border-primary/50"
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 py-4 border-y border-white/5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-bold">Withdrawals Blocked?</Label>
                          <p className="text-xs text-muted-foreground">Is the platform refusing payouts?</p>
                        </div>
                        <Switch checked={isBlocked} onCheckedChange={setIsBlocked} />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-bold">Account Access?</Label>
                          <p className="text-xs text-muted-foreground">Do you still have portal access?</p>
                        </div>
                        <Switch checked={hasAccess} onCheckedChange={setHasAccess} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-foreground/80">Additional Narrative (What happened?)</Label>
                      <Textarea 
                        placeholder="Briefly describe the timeline of events, communications with 'managers', and any specific wallet addresses provided to you..."
                        className="min-h-[160px] bg-background/50 border-white/10 focus:border-primary/50 text-base"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <Button 
                      onClick={handleAssessment} 
                      disabled={loading}
                      className="w-full h-16 text-xl bg-primary hover:bg-primary/90 font-bold shadow-xl shadow-primary/20"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                          Analyzing Forensic Data...
                        </>
                      ) : (
                        <>
                          Initiate Technical Assessment
                          <Sparkles className="ml-2 h-6 w-6" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="glass-card border-white/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                      <UploadCloud className="w-5 h-5 text-primary" />
                      Evidence Intake
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group bg-white/5">
                      <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                      <p className="text-sm font-bold mb-1">Drag & Drop Evidence</p>
                      <p className="text-xs text-muted-foreground">Screenshots, Statements, or Logs</p>
                    </div>
                    <div className="space-y-3 pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Critical Assets:</p>
                      <ul className="space-y-2">
                        {[
                          "Transaction Receipts",
                          "Broker Chat Logs",
                          "Email Correspondence",
                          "Account Statements"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-foreground/70">
                            <FileText className="w-3.5 h-3.5 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10 flex gap-4">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-destructive uppercase mb-1">Security Protocol</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      Do NOT upload private keys or seed phrases. Lazoronix will never ask for your wallet credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Professional Assessment Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 p-8 glass-card rounded-[2rem] border-primary/20">
               <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                   <Fingerprint className="w-8 h-8 text-white" />
                 </div>
                 <div>
                   <div className="flex items-center gap-3 mb-1">
                     <h2 className="text-2xl font-headline font-bold">Recovery Case Assessment</h2>
                     <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Official Report</span>
                   </div>
                   <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                     <span className="text-muted-foreground flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Case ID: <span className="text-foreground font-mono font-bold">{caseId}</span></span>
                     <span className="text-muted-foreground flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Status: <span className="text-primary font-bold">Initial Forensic Review</span></span>
                     <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Generated: <span className="text-foreground font-bold">{new Date().toLocaleDateString()}</span></span>
                   </div>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Button variant="outline" onClick={() => {
                   setStep('type')
                   setCaseId('')
                   setResult(null)
                 }} className="border-white/10 hover:bg-white/5 font-bold">
                   New Assessment
                 </Button>
                 <Button className="bg-primary hover:bg-primary/90 font-bold">
                   Download Report PDF
                 </Button>
               </div>
            </div>

            {/* Assessment Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Investigative Risk</span>
                  <ShieldAlert className={cn("w-5 h-5", getRiskColor(result.riskLevel))} />
                </div>
                <div className="text-3xl font-headline font-bold mb-1">{result.riskLevel}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">Risk factor calculated based on time-lapse and scam complexity.</p>
              </Card>

              <Card className="glass-card border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Evidence Completeness</span>
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-headline font-bold mb-2">{result.evidenceCompletenessScore}%</div>
                <Progress value={result.evidenceCompletenessScore} className="h-1.5 mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">Current score based on provided technical data and narrative.</p>
              </Card>

              <Card className="glass-card border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recovery Path</span>
                  <Activity className="text-secondary w-5 h-5" />
                </div>
                <div className="text-3xl font-headline font-bold mb-1">Evaluating</div>
                <p className="text-xs text-muted-foreground leading-relaxed">System is currently mapping forensic pathways to known assets.</p>
              </Card>
            </div>

            {/* Preliminary Case Findings Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-headline font-semibold flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-primary" />
                </div>
                Preliminary Case Findings
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Scam Type", value: result.preliminaryCaseFindings.scamType },
                  { label: "Estimated Loss", value: result.preliminaryCaseFindings.estimatedLoss },
                  { label: "Evidence Strength", value: result.preliminaryCaseFindings.evidenceStrength, color: result.preliminaryCaseFindings.evidenceStrength === 'High' ? 'text-emerald-500' : result.preliminaryCaseFindings.evidenceStrength === 'Moderate' ? 'text-amber-500' : 'text-destructive' },
                  { label: "Transaction Records", value: result.preliminaryCaseFindings.transactionRecordsStatus },
                  { label: "Recovery Complexity", value: result.preliminaryCaseFindings.recoveryComplexity, color: getComplexityColor(result.preliminaryCaseFindings.recoveryComplexity) },
                  { label: "Recommended Action", value: result.preliminaryCaseFindings.recommendedAction }
                ].map((finding, idx) => (
                  <Card key={idx} className="glass-card border-white/5 p-4 flex flex-col justify-center text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{finding.label}</span>
                    <span className={cn("text-sm font-bold leading-tight", finding.color || "text-foreground")}>{finding.value}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Probability Indicators */}
            <div className="grid md:grid-cols-4 gap-4">
              {result.recoveryIndicators.map((indicator, idx) => (
                <Card key={idx} className={cn("border-none shadow-none", getStatusBg(indicator.status))}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(indicator.status)}
                      <span className="text-xs font-bold uppercase tracking-wider">{indicator.label}</span>
                    </div>
                    <p className="text-sm font-medium leading-snug">{indicator.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Activity className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  Forensic Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground/90 font-medium italic">
                  "{result.recoveryScenarioSummary}"
                </p>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  {selectedType?.id === 'wallet' ? 'Technical Recovery Path' : 'Forensic Investigation Focus'}
                </h3>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {result.informationCategoriesToGather.map((cat, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-2xl px-5 bg-card/60 border-white/5 overflow-hidden hover:border-white/10 transition-colors">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <span className="text-left font-bold text-lg">{cat.categoryName}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <p className="mb-6 text-muted-foreground leading-relaxed">{cat.description}</p>
                        <ul className="grid gap-3">
                          {cat.specificItemsToGather.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 text-sm font-medium">
                              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span className="text-foreground/90">{item}</span>
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
                  <h3 className="text-xl font-headline font-semibold flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5 text-destructive" />
                    </div>
                    Critical Safety Protocols
                  </h3>
                  <Card className="border-destructive/20 bg-destructive/5 rounded-[2rem] overflow-hidden">
                    <CardContent className="p-8 space-y-5">
                      {result.importantConsiderations.map((con, idx) => (
                        <div key={idx} className="flex items-start gap-4 text-sm leading-relaxed text-foreground/90 font-bold bg-background/40 p-4 rounded-xl">
                          <ShieldAlert className="w-5 h-5 text-destructive shrink-0" />
                          {con}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-headline font-semibold flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <ArrowRightCircle className="w-5 h-5 text-primary" />
                    </div>
                    {selectedType?.id === 'wallet' ? 'Technical Roadmap' : 'Recommended Forensic Path'}
                  </h3>
                  <Card className="border-primary/20 bg-primary/10 rounded-[2rem] overflow-hidden">
                    <CardContent className="p-8">
                      <p className="text-lg leading-relaxed mb-8 opacity-90 font-medium">
                        {result.nextStepsRecommendation}
                      </p>
                      <Button className="w-full h-16 text-xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group font-bold" asChild>
                        <a href="#assessment-form">
                          {selectedType?.id === 'wallet' ? 'Initiate Full Technical Review' : 'Initiate Full Forensic Review'}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
