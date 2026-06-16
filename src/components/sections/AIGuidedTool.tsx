"use client"

import { useState, useEffect, useMemo } from 'react'
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
  Database,
  ChevronRight
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

const SAFETY_PROTOCOLS = [
  "Do NOT pay any 'upfront taxes' or 'activation fees' to unknown recovery services.",
  "Never share your private keys or 12/24-word seed phrase with anyone.",
  "Preserve all transaction logs, chat histories, and platform screenshots immediately.",
  "Ignore unsolicited DMs from people claiming they can hack the blockchain for you."
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
  const [scanStatus, setScanStatus] = useState('Initializing...')

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

  // Local Logic: Evidence Completeness Scoring
  const evidenceMetrics = useMemo(() => {
    if (!selectedType) return { total: 0, items: [] };
    
    const items = [
      { label: "Transaction Records", score: Object.values(formValues).some(v => v.length > 5) ? 80 : 20 },
      { label: "Communication Logs", score: description.length > 50 ? 90 : 30 },
      { label: "Platform Evidence", score: hasAccess ? 70 : 40 },
      { label: "Identity Verification", score: formValues.brokerName || formValues.platformName ? 60 : 20 },
      { label: "Asset Path History", score: formValues.walletAddress || formValues.cryptoWallet ? 85 : 15 }
    ];
    
    const total = Math.round(items.reduce((acc, curr) => acc + curr.score, 0) / items.length);
    return { total, items };
  }, [formValues, description, hasAccess, selectedType]);

  // Local Logic: Risk Level Calculation
  const riskLevel = useMemo(() => {
    const amount = parseInt(formValues.amount || "0");
    if (isBlocked && amount > 20000) return 'Critical';
    if (isBlocked || amount > 5000) return 'High';
    if (amount > 1000) return 'Moderate';
    return 'Low';
  }, [formValues.amount, isBlocked]);

  const handleAssessment = async () => {
    if (!selectedType) return
    setLoading(true)
    
    const statuses = [
      "Connecting to blockchain node...",
      "Analyzing wallet cluster patterns...",
      "Verifying platform credentials...",
      "Compiling forensic report..."
    ]
    
    let i = 0
    const interval = setInterval(() => {
      if (i < statuses.length) {
        setScanStatus(statuses[i])
        i++
      }
    }, 1200)

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
NARRATIVE:
${description}
      `.trim()

      const output = await aiGuidedRecoveryPreparation({ initialProblemDescription: fullPrompt })
      setResult(output)
      clearInterval(interval)
      setStep('result')
    } catch (error) {
      console.error(error)
      clearInterval(interval)
    } finally {
      setLoading(false)
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
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">What Type of Recovery Case <br/> Do You Have?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Our forensic methodology is tailored to the specific nature of your loss. Select a category to begin your guided assessment.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASE_TYPES.map((type) => (
                <Card 
                  key={type.id} 
                  className="glass-card hover:border-primary/50 transition-all cursor-pointer group hover:shadow-2xl active:scale-[0.98]"
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
            <Button variant="ghost" className="mb-8" onClick={() => setStep('type')}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Case Types
            </Button>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="glass-card border-white/5">
                  <CardContent className="p-8 space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {selectedType.fields.map((field) => (
                        <div key={field.key} className="space-y-3">
                          <Label className="text-sm font-bold">{field.label}</Label>
                          <Input 
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            className="h-12 bg-background/50 border-white/10"
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 py-4 border-y border-white/5">
                      <div className="flex items-center justify-between gap-4">
                        <Label className="text-sm font-bold">Withdrawals Blocked?</Label>
                        <Switch checked={isBlocked} onCheckedChange={setIsBlocked} />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <Label className="text-sm font-bold">Account Access?</Label>
                        <Switch checked={hasAccess} onCheckedChange={setHasAccess} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold">Case Narrative (Technical Details)</Label>
                      <Textarea 
                        placeholder="Provide details about entities, communications, and wallet addresses involved."
                        className="min-h-[160px] bg-background/50 border-white/10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAssessment} disabled={loading} className="w-full h-16 text-xl font-bold">
                      {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Generate Preliminary Assessment'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="glass-card border-white/5 p-6">
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-primary"><UploadCloud className="w-5 h-5" /> Evidence Intake</h4>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-white/5 mb-6">
                    <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs font-bold">Drag & Drop Evidence</p>
                  </div>
                  <ul className="space-y-3">
                    {["Receipts", "Chat Logs", "Emails"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground/70"><FileText className="w-3.5 h-3.5 text-primary" /> {item}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Meta */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
              <div className="flex-grow p-8 glass-card rounded-[2rem] border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                     <Activity className="w-8 h-8 text-white" />
                   </div>
                   <div>
                     <h2 className="text-2xl font-headline font-bold mb-1">Investigation Dashboard</h2>
                     <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                       <span className="flex items-center gap-1.5"><Fingerprint className="w-3.5 h-3.5" /> Case ID: <span className="text-foreground font-bold">{caseId}</span></span>
                       <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Status: <span className="text-primary font-bold">Automated Review</span></span>
                     </div>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <Button variant="outline" onClick={() => setStep('type')}>New Intake</Button>
                   <Button className="bg-primary font-bold">Download Report</Button>
                 </div>
              </div>
              <Card className="glass-card border-white/5 p-6 flex items-center gap-4 min-w-[300px]">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={`https://picsum.photos/seed/${caseId}/100/100`} />
                  <AvatarFallback className="bg-primary">SA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">Senior Recovery Analyst</p>
                  <p className="text-xs text-muted-foreground">Financial Fraud Division</p>
                </div>
              </Card>
            </div>

            {/* Timeline */}
            <Card className="glass-card border-white/5 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                {TIMELINE_STEPS.map((step, idx) => (
                  <div key={step.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-2 flex-1 relative">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all", step.status === 'completed' ? "bg-emerald-500 text-white" : step.status === 'current' ? "bg-primary text-white" : "bg-muted text-muted-foreground border border-white/5")}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div className="text-left md:text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{step.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-white/5 p-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Risk Level</span>
                <div className={cn("text-3xl font-headline font-bold", riskLevel === 'Critical' ? 'text-destructive' : riskLevel === 'High' ? 'text-orange-500' : 'text-emerald-500')}>{riskLevel}</div>
                <p className="text-xs text-muted-foreground mt-2">Calculated based on amount and platform status.</p>
              </Card>
              <Card className="glass-card border-white/5 p-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Evidence Score</span>
                <div className="text-3xl font-headline font-bold">{evidenceMetrics.total}%</div>
                <Progress value={evidenceMetrics.total} className="h-1.5 mt-2" />
              </Card>
              <Card className="glass-card border-white/5 p-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Case Readiness</span>
                <div className="text-3xl font-headline font-bold">Qualified</div>
                <p className="text-xs text-muted-foreground mt-2">Eligible for human specialist review.</p>
              </Card>
            </div>

            {/* Findings Dashboard */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card border-white/5 p-8">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3 mb-8"><Search className="w-5 h-5 text-primary" /> Preliminary Case Findings</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Scam Type", value: result.preliminaryCaseFindings.scamType },
                    { label: "Estimated Loss", value: result.preliminaryCaseFindings.estimatedLoss },
                    { label: "Evidence Strength", value: result.preliminaryCaseFindings.evidenceStrength },
                    { label: "Recovery Complexity", value: result.preliminaryCaseFindings.recoveryComplexity },
                    { label: "Transaction Status", value: result.preliminaryCaseFindings.transactionRecordsStatus },
                    { label: "Recommended Action", value: result.preliminaryCaseFindings.recommendedAction }
                  ].map((finding, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">{finding.label}</p>
                      <p className="text-xs font-bold">{finding.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 italic text-sm text-foreground/80 leading-relaxed">
                  "{result.recoveryScenarioSummary}"
                </div>
                <div className="mt-6 flex gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] text-amber-500/80">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <p>This assessment is generated automatically and is not a professional investigation. Final recommendations require review by a recovery specialist.</p>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="glass-card border-white/5 p-8">
                  <h3 className="text-xl font-headline font-bold flex items-center gap-3 mb-8"><Network className="w-5 h-5 text-primary" /> Evidence Collection Matrix</h3>
                  <div className="space-y-6">
                    {evidenceMetrics.items.map((tracker, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-foreground/70">{tracker.label}</span>
                          <span className="text-primary">{tracker.score}%</span>
                        </div>
                        <Progress value={tracker.score} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Static Urgency Notice */}
                <Card className="border-destructive/20 bg-destructive/5 p-6 rounded-2xl">
                  <h4 className="text-sm font-bold text-destructive flex items-center gap-2 mb-4"><ShieldAlert className="w-4 h-4" /> Time-Sensitive Notice</h4>
                  <p className="text-xs text-foreground/80 leading-relaxed mb-4">Recovery opportunities can become more difficult as time passes due to:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Asset Movement", "Account Closure", "Data Loss", "Evidence Decay"].map((item, i) => (
                      <div key={i} className="px-3 py-2 rounded-lg bg-background/40 border border-white/5 text-[9px] font-bold text-center">{item}</div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Static Roadmap & Conversion */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card border-white/5 p-8">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3 mb-8"><Target className="w-5 h-5 text-primary" /> Investigation Roadmap</h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {result.investigativeFocusAreas.map((cat, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-5 bg-card/60 border-white/5">
                      <AccordionTrigger className="hover:no-underline font-bold text-sm">{cat.categoryName}</AccordionTrigger>
                      <AccordionContent className="text-xs space-y-4 text-muted-foreground">
                        <p>{cat.description}</p>
                        <ul className="space-y-2">
                          {cat.specificItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-foreground/80"><ChevronRight className="w-3 h-3 text-primary" /> {item}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>

              <div className="space-y-8">
                <Card className="border-emerald-500/20 bg-emerald-500/5 p-8 rounded-[2rem]">
                  <h4 className="text-2xl font-headline font-bold text-emerald-500 mb-4">Case Eligible For Review</h4>
                  <p className="text-base text-foreground/80 mb-8 leading-relaxed">Our investigators recommend a detailed assessment. Final paths require manual verification by a specialist.</p>
                  <div className="space-y-4 mb-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Next Steps:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Specialist Review", "Evidence Verification", "Feasibility Analysis", "Recovery Roadmap"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}</div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full h-16 text-lg font-bold" asChild>
                    <a href="#contact">Continue To Secure Assessment <ArrowRight className="ml-2 w-5 h-5" /></a>
                  </Button>
                </Card>

                {/* Static Safety Protocols */}
                <Card className="border-destructive/20 bg-destructive/5 p-6 rounded-2xl">
                  <h4 className="text-xs font-black uppercase tracking-widest text-destructive mb-4">Critical Safety Protocols</h4>
                  <div className="space-y-3">
                    {SAFETY_PROTOCOLS.map((con, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed font-bold bg-background/40 p-3 rounded-lg border border-destructive/10">
                        <ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        {con}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
