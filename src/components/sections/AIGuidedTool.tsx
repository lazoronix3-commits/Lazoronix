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
  ClipboardList,
  Target,
  UserCheck,
  Zap,
  Network,
  Database
} from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
      { key: 'issueType', label: 'What is the Issue?', placeholder: 'Lost password, Lost seed phrase, etc.' },
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

const TIMELINE_STEPS = [
  { id: 'intake', label: 'Evidence Received', status: 'completed', icon: CheckCircle2 },
  { id: 'review', label: 'Preliminary Review', status: 'current', icon: Clock },
  { id: 'analysis', label: 'Forensic Analysis', status: 'pending', icon: Database },
  { id: 'assignment', label: 'Investigator Assignment', status: 'pending', icon: UserCheck },
  { id: 'strategy', label: 'Recovery Strategy', status: 'pending', icon: Target },
  { id: 'resolution', label: 'Case Resolution', status: 'pending', icon: ShieldCheck },
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
      
      <div className="container mx-auto px-6 max-w-6xl">
        
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
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
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
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
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
            {/* Investigation Dashboard Header */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
              <div className="flex-grow p-8 glass-card rounded-[2rem] border-primary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                     <Activity className="w-8 h-8 text-white" />
                   </div>
                   <div>
                     <div className="flex items-center gap-3 mb-1">
                       <h2 className="text-2xl font-headline font-bold tracking-tight">Investigation Dashboard</h2>
                       <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Live Assessment</span>
                     </div>
                     <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                       <span className="text-muted-foreground flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Case ID: <span className="text-foreground font-mono font-bold">{caseId}</span></span>
                       <span className="text-muted-foreground flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Status: <span className="text-primary font-bold">Initial Review</span></span>
                       <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Generated: <span className="text-foreground font-bold">{new Date().toLocaleDateString()}</span></span>
                     </div>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 w-full md:w-auto">
                   <Button variant="outline" onClick={() => {
                     setStep('type')
                     setCaseId('')
                     setResult(null)
                   }} className="border-white/10 hover:bg-white/5 font-bold flex-grow md:flex-grow-0">
                     New Assessment
                   </Button>
                   <Button className="bg-primary hover:bg-primary/90 font-bold flex-grow md:flex-grow-0">
                     Download PDF Report
                   </Button>
                 </div>
              </div>

              {/* Specialist Card */}
              <Card className="glass-card border-white/5 p-6 flex flex-row items-center gap-4 min-w-[300px]">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={`https://picsum.photos/seed/${caseId}/100/100`} />
                  <AvatarFallback className="bg-primary text-white font-bold">AN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-foreground">Senior Recovery Analyst</p>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Financial Fraud Division</p>
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-primary w-fit">
                    <UserCheck className="w-3 h-3" />
                    Assigned to LRX-{caseId.split('-')[1]}
                  </div>
                </div>
              </Card>
            </div>

            {/* Investigation Timeline */}
            <Card className="glass-card border-white/5 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                {TIMELINE_STEPS.map((step, idx) => (
                  <div key={step.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-2 flex-1 relative">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all",
                      step.status === 'completed' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : 
                      step.status === 'current' ? "bg-primary text-white shadow-lg shadow-primary/20 ring-4 ring-primary/10" : 
                      "bg-muted text-muted-foreground border border-white/5"
                    )}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left md:text-center">
                      <p className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        step.status === 'completed' ? "text-emerald-500" : step.status === 'current' ? "text-primary" : "text-muted-foreground"
                      )}>{step.status === 'completed' ? 'Verified' : step.status === 'current' ? 'Processing' : 'Pending'}</p>
                      <p className="text-xs font-bold text-foreground whitespace-nowrap">{step.label}</p>
                    </div>
                    {idx < TIMELINE_STEPS.length - 1 && (
                      <div className="hidden md:block absolute top-5 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[1px] bg-white/5 -z-0">
                        <div className={cn(
                          "h-full transition-all duration-1000",
                          step.status === 'completed' ? "bg-emerald-500 w-full" : "bg-transparent w-0"
                        )} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Assessment Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-white/5 p-6 group hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Forensic Risk Factor</span>
                  <ShieldAlert className={cn("w-5 h-5", getRiskColor(result.riskLevel))} />
                </div>
                <div className="text-3xl font-headline font-bold mb-1 tracking-tight">{result.riskLevel}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">Risk factor calculated based on time-lapse and scam complexity.</p>
              </Card>

              <Card className="glass-card border-white/5 p-6 group hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Evidence Integrity Score</span>
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-headline font-bold mb-2 tracking-tight">{result.evidenceCompletenessScore}%</div>
                <Progress value={result.evidenceCompletenessScore} className="h-1.5 mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">Current score based on verified technical data and case logs.</p>
              </Card>

              <Card className="glass-card border-white/5 p-6 group hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recovery Probability</span>
                  <Zap className="text-secondary w-5 h-5" />
                </div>
                <div className="text-3xl font-headline font-bold mb-1 tracking-tight">{result.overallCaseStrength}%</div>
                <p className="text-xs text-muted-foreground leading-relaxed">Forensic calculation of successful asset retrieval probability.</p>
              </Card>
            </div>

            {/* Preliminary Case Findings Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-headline font-semibold flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-primary" />
                </div>
                Preliminary Forensic Findings
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Scam Type", value: result.preliminaryCaseFindings.scamType },
                  { label: "Estimated Loss", value: result.preliminaryCaseFindings.estimatedLoss },
                  { label: "Evidence Strength", value: result.preliminaryCaseFindings.evidenceStrength, color: result.preliminaryCaseFindings.evidenceStrength === 'High' ? 'text-emerald-500' : result.preliminaryCaseFindings.evidenceStrength === 'Moderate' ? 'text-amber-500' : 'text-destructive' },
                  { label: "Transaction Status", value: result.preliminaryCaseFindings.transactionRecordsStatus },
                  { label: "Recovery Complexity", value: result.preliminaryCaseFindings.recoveryComplexity, color: getComplexityColor(result.preliminaryCaseFindings.recoveryComplexity) },
                  { label: "Recommended Action", value: result.preliminaryCaseFindings.recommendedAction }
                ].map((finding, idx) => (
                  <Card key={idx} className="glass-card border-white/5 p-4 flex flex-col justify-center text-center hover:bg-white/5 transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2">{finding.label}</span>
                    <span className={cn("text-xs font-bold leading-tight", finding.color || "text-foreground")}>{finding.value}</span>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Evidence Collection Tracker */}
              <Card className="glass-card border-white/5 p-8 flex flex-col h-full">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Network className="w-5 h-5 text-primary" />
                  </div>
                  Evidence Collection Matrix
                </h3>
                <div className="space-y-8 flex-grow">
                  {result.evidenceTracker.map((tracker, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold mb-1">
                        <span className="text-foreground/80">{tracker.label}</span>
                        <span className="text-primary">{tracker.score}%</span>
                      </div>
                      <Progress value={tracker.score} className="h-2 bg-white/5" />
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-headline font-bold">Overall Case Strength</span>
                    <span className="text-2xl font-black text-secondary">{result.overallCaseStrength}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">This score represents the forensic viability of your case based on current evidence density.</p>
                </div>
              </Card>

              {/* Recovery Scenario Summary */}
              <Card className="border-primary/20 bg-primary/5 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Network className="w-32 h-32" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-headline tracking-tight">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    Investigation Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-lg leading-relaxed text-foreground/90 font-medium italic border-l-2 border-primary/50 pl-6 py-2">
                    "{result.recoveryScenarioSummary}"
                  </p>
                  
                  <div className="mt-8 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recovery Indicators</p>
                    <div className="grid grid-cols-1 gap-3">
                      {result.recoveryIndicators.map((indicator, idx) => (
                        <div key={idx} className={cn("p-4 rounded-xl border-none flex items-center gap-4 transition-all hover:scale-[1.02]", getStatusBg(indicator.status))}>
                          {getStatusIcon(indicator.status)}
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest">{indicator.label}</p>
                            <p className="text-xs font-medium leading-snug">{indicator.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time-Sensitive Notice for Scam Cases */}
            <Card className="border-destructive/20 bg-destructive/5 rounded-[2.5rem] overflow-hidden p-8 md:p-12 relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Clock className="w-32 h-32 text-destructive" />
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center shrink-0">
                     <ShieldAlert className="w-8 h-8 text-destructive" />
                   </div>
                   <div className="space-y-4">
                     <h3 className="text-2xl font-headline font-bold text-destructive tracking-tight">Time-Sensitive Investigative Notice</h3>
                     <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
                       Recovery opportunities can become more difficult as time passes due to the technical nature of digital asset movements. We recommend preserving evidence immediately.
                     </p>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                       {[
                         { label: "Asset Movement", icon: Activity },
                         { label: "Account Closure", icon: XCircle },
                         { label: "Data Loss", icon: FileText },
                         { label: "Evidence Decay", icon: ShieldAlert }
                       ].map((item, i) => (
                         <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-background/40 border border-white/5 text-center">
                           <item.icon className="w-5 h-5 text-destructive mb-2" />
                           <span className="text-[9px] font-black uppercase tracking-widest opacity-80">{item.label}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-secondary" />
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
                        <div key={idx} className="flex items-start gap-4 text-sm leading-relaxed text-foreground/90 font-bold bg-background/40 p-4 rounded-xl border border-destructive/10">
                          <ShieldAlert className="w-5 h-5 text-destructive shrink-0" />
                          {con}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-headline font-semibold flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    Case Eligibility Status
                  </h3>
                  <Card className="border-emerald-500/20 bg-emerald-500/5 rounded-[2rem] overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <ShieldCheck className="w-32 h-32 text-emerald-500" />
                    </div>
                    <CardContent className="p-8">
                      <h4 className="text-2xl font-headline font-bold mb-4 text-emerald-500 tracking-tight">
                        {result.overallCaseStrength > 40 
                          ? "Case Eligible For Professional Review" 
                          : "Preliminary Eligibility Assessment"}
                      </h4>
                      <p className="text-lg leading-relaxed mb-8 opacity-90 font-medium text-foreground/80">
                        Based on the information provided, our senior investigators recommend a detailed assessment of your case to verify recovery paths and initiate the technical roadmap.
                      </p>
                      
                      <div className="space-y-4 mb-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Professional Next Steps</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                          {[
                            "Specialist Audit",
                            "Evidence Chain Verification",
                            "Feasibility Analysis",
                            "Investigation Roadmap"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-bold text-foreground/90">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full h-16 text-xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group font-bold transition-all hover:scale-[1.01]" asChild>
                        <a href="#contact">
                          Continue To Secure Assessment
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
