"use client"

import { useState, useEffect, useMemo } from 'react'
import { aiGuidedRecoveryPreparation, type AIGuidedRecoveryPreparationOutput } from '@/ai/flows/ai-guided-recovery-preparation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { 
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
  Activity,
  Fingerprint,
  Info,
  Clock,
  Target,
  Network,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  Globe,
  User,
  MessageSquare,
  Lock,
  Shield
} from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const UserCheck = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
)

const Database = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
)

const TIMELINE_STEPS = [
  { id: 'intake', label: 'Evidence Received', status: 'completed', icon: CheckCircle2 },
  { id: 'review', label: 'Preliminary Review', status: 'current', icon: Clock },
  { id: 'analysis', label: 'Forensic Analysis', status: 'pending', icon: Database },
  { id: 'assignment', label: 'Investigator Assignment', status: 'pending', icon: UserCheck },
  { id: 'strategy', label: 'Recovery Strategy', status: 'pending', icon: Target },
  { id: 'resolution', label: 'Case Resolution', status: 'pending', icon: ShieldCheck },
]

const SecurityChecklist = () => (
  <div className="pt-8 mt-8 border-t border-white/5">
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
      <Lock className="w-3.5 h-3.5 text-primary" /> Your Information Is Protected
    </p>
    <div className="grid grid-cols-2 gap-4">
      {[
        "Encrypted submissions",
        "Secure document uploads",
        "Confidential consultations",
        "Restricted case access"
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-foreground/50 uppercase tracking-widest">
          <CheckCircle2 className="w-3 h-3 text-primary" />
          {item}
        </div>
      ))}
    </div>
  </div>
)

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

const SAFETY_PROTOCOLS = [
  "Do NOT pay any 'upfront taxes' or 'activation fees' to unknown recovery services.",
  "Never share your private keys or 12/24-word seed phrase with anyone.",
  "Preserve all transaction logs, chat histories, and platform screenshots immediately.",
  "Ignore unsolicited DMs from people claiming they can hack the blockchain for you."
]

export function AIGuidedTool() {
  const [step, setStep] = useState<'type' | 'details' | 'result' | 'booking' | 'success'>('type')
  const [selectedType, setSelectedType] = useState<CaseType | null>(null)
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [description, setDescription] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [hasAccess, setHasAccess] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIGuidedRecoveryPreparationOutput | null>(null)
  const [caseId, setCaseId] = useState('')
  const [scanStatus, setScanStatus] = useState('Initializing...')
  
  const [bookingValues, setBookingValues] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    bestTime: '',
    method: ''
  })
  const [bookingLoading, setBookingValuesLoading] = useState(false)
  
  const { toast } = useToast()

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

  const evidenceMetrics = useMemo(() => {
    if (!selectedType) return { total: 0, items: [], status: 'Incomplete' };
    
    const items = [
      { label: "Transaction Records", score: Object.values(formValues).some(v => v.length > 5) ? 80 : 20 },
      { label: "Communication Logs", score: description.length > 50 ? 90 : 30 },
      { label: "Platform Evidence", score: hasAccess ? 70 : 40 },
      { label: "Identity Verification", score: formValues.brokerName || formValues.platformName ? 60 : 20 },
      { label: "Asset Path History", score: formValues.walletAddress || formValues.cryptoWallet ? 85 : 15 }
    ];
    
    const total = Math.round(items.reduce((acc, curr) => acc + curr.score, 0) / items.length);
    const status = total > 70 ? 'Substantial' : total > 40 ? 'Partial' : 'Incomplete';
    
    return { total, items, status };
  }, [formValues, description, hasAccess, selectedType]);

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
      "Accessing blockchain ledger...",
      "Analyzing fund obfuscation paths...",
      "Verifying platform entities...",
      "Compiling investigative intake..."
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
      setStep('result')
    } catch (error: any) {
      const fallbackResult: AIGuidedRecoveryPreparationOutput = {
        preliminaryCaseFindings: {
          scamType: selectedType.title,
          estimatedLoss: formValues.amount || "Pending Verification",
          evidenceStatus: evidenceMetrics.status as any,
          investigationReadiness: "Qualified for Specialist Review",
          caseComplexity: riskLevel === 'Critical' ? 'Extremely High' : riskLevel === 'High' ? 'High' : 'Moderate',
          reviewRecommendation: "Professional Assessment Recommended"
        },
        recoveryScenarioSummary: "Forensic intake complete. Specialist review is required to verify the technical parameters of the digital asset movement.",
        investigativeFocusAreas: [
          {
            categoryName: "Manual Forensic Review",
            description: "A Senior Recovery Analyst must manually verify the transaction logs and platform details provided due to high system load.",
            specificItems: ["Verification of Wallet Addresses", "Platform Credential Audit", "Jurisdictional Analysis"]
          }
        ]
      }
      setResult(fallbackResult)
      setStep('result')
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    setBookingValuesLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setBookingValuesLoading(false)
    setStep('success')
  }

  return (
    <section id="forensic-intake" className="py-24 bg-card/30 relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/[0.03] blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border transition-all", step === 'type' ? "bg-primary border-primary text-black" : "bg-transparent border-white/10 text-muted-foreground")}>01</div>
            <div className={cn("w-12 h-px transition-colors", step !== 'type' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border transition-all", step === 'details' ? "bg-primary border-primary text-black" : step === 'result' || step === 'booking' || step === 'success' ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-white/10 text-muted-foreground")}>02</div>
            <div className={cn("w-12 h-px transition-colors", step === 'result' || step === 'booking' || step === 'success' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border transition-all", step === 'result' ? "bg-primary border-primary text-black" : step === 'booking' || step === 'success' ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-white/10 text-muted-foreground")}>03</div>
            <div className={cn("w-12 h-px transition-colors", step === 'booking' || step === 'success' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border transition-all", step === 'booking' || step === 'success' ? "bg-primary border-primary text-black" : "bg-transparent border-white/10 text-muted-foreground")}>04</div>
          </div>
        </div>

        {step === 'type' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tighter uppercase">Forensic Case Intake</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Select your recovery category to initialize the formal intake process. All data is protected under institutional-grade encryption.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASE_TYPES.map((type) => (
                <Card 
                  key={type.id} 
                  className="glass-card hover:border-primary/50 transition-all cursor-pointer group active:scale-[0.98]"
                  onClick={() => handleSelectType(type)}
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors">
                      <type.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-bold mb-3 uppercase tracking-tight">{type.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">{type.description}</p>
                    <div className="flex items-center text-primary font-black text-[10px] uppercase tracking-widest">
                      Initialize Case <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'details' && selectedType && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <Button variant="ghost" className="mb-8 text-[10px] font-black uppercase tracking-widest" onClick={() => setStep('type')}>
              <ArrowLeft className="mr-2 w-3.5 h-3.5" /> Back to Categories
            </Button>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="glass-card border-white/5">
                  <CardContent className="p-8 space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {selectedType.fields.map((field) => (
                        <div key={field.key} className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{field.label}</Label>
                          <Input 
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            className="h-12 bg-background/50 border-white/10 rounded-none"
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 py-4 border-y border-white/5">
                      <div className="flex items-center justify-between gap-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Withdrawals Blocked?</Label>
                        <Switch checked={isBlocked} onCheckedChange={setIsBlocked} />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Account Access?</Label>
                        <Switch checked={hasAccess} onCheckedChange={setHasAccess} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Narrative</Label>
                      <Textarea 
                        placeholder="Provide specific technical details about the entities, transaction IDs, and communication methods involved."
                        className="min-h-[160px] bg-background/50 border-white/10 rounded-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAssessment} disabled={loading} className="w-full h-16 text-lg font-black uppercase tracking-[0.2em] bg-primary text-black">
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>{scanStatus}</span>
                        </div>
                      ) : 'Generate Intake Summary'}
                    </Button>
                    
                    <SecurityChecklist />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="glass-card border-white/5 p-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4 text-primary"><UploadCloud className="w-4 h-4" /> Evidence Portal</h4>
                  <div className="border border-dashed border-white/10 rounded-none p-8 text-center bg-white/5 mb-6">
                    <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Encrypted Evidence Upload</p>
                  </div>
                  <ul className="space-y-3">
                    {["Transaction Hashes", "Chat Histories", "Email Logs"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-foreground/50 uppercase tracking-widest"><FileText className="w-3 h-3 text-primary" /> {item}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
              <div className="flex-grow p-8 glass-card border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center shadow-lg">
                     <Activity className="w-8 h-8 text-primary" />
                   </div>
                   <div>
                     <h2 className="text-2xl font-headline font-bold mb-1 uppercase tracking-tight">Case Dashboard</h2>
                     <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                       <span className="flex items-center gap-1.5"><Fingerprint className="w-3.5 h-3.5" /> ID: <span className="text-foreground font-black">{caseId}</span></span>
                       <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Status: <span className="text-primary">Review Pending</span></span>
                     </div>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <Button variant="outline" className="opacity-50 cursor-not-allowed border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest">Download Report</Button>
                 </div>
              </div>
              <Card className="glass-card border-white/5 p-6 flex items-center gap-4 min-w-[320px]">
                <Avatar className="h-12 w-12 border border-primary/20">
                  <AvatarImage src={`https://picsum.photos/seed/${caseId}/100/100`} />
                  <AvatarFallback className="bg-primary text-black">SA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black text-[10px] uppercase tracking-widest text-white">Senior Recovery Analyst</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Financial Fraud Division</p>
                </div>
              </Card>
            </div>

            <Card className="glass-card border-white/5 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                {TIMELINE_STEPS.map((timelineStep, idx) => (
                  <div key={timelineStep.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-2 flex-1 relative">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all", timelineStep.status === 'completed' ? "bg-primary text-black" : timelineStep.status === 'current' ? "border border-primary text-primary" : "bg-muted text-muted-foreground border border-white/5")}>
                      <timelineStep.icon className="w-4 h-4" />
                    </div>
                    <div className="text-left md:text-center">
                      <p className="text-[8px] font-black uppercase tracking-[0.25em] opacity-50">{timelineStep.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-white/5 p-8">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Case Complexity</span>
                <div className={cn("text-3xl font-headline font-bold uppercase tracking-tighter", riskLevel === 'Critical' ? 'text-destructive' : riskLevel === 'High' ? 'text-primary/70' : 'text-primary')}>{riskLevel}</div>
                <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed uppercase tracking-widest">Based on technical loss parameters.</p>
              </Card>
              <Card className="glass-card border-white/5 p-8">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Evidence Integrity</span>
                <div className="text-3xl font-headline font-bold uppercase tracking-tighter">{evidenceMetrics.status}</div>
                <Progress value={evidenceMetrics.total} className="h-1 mt-2 bg-white/5" />
              </Card>
              <Card className="glass-card border-white/5 p-8">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">System Status</span>
                <div className="text-3xl font-headline font-bold text-primary uppercase tracking-tighter">Qualified</div>
                <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed uppercase tracking-widest">Awaiting specialist verification.</p>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card border-white/5 p-8">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 mb-8 text-primary"><Search className="w-4 h-4" /> Forensic Intake Findings</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Asset Type", value: result.preliminaryCaseFindings.scamType },
                    { label: "Estimated Value", value: result.preliminaryCaseFindings.estimatedLoss },
                    { label: "Evidence Status", value: result.preliminaryCaseFindings.evidenceStatus },
                    { label: "Complexity", value: result.preliminaryCaseFindings.caseComplexity },
                    { label: "Status", value: result.preliminaryCaseFindings.investigationReadiness },
                    { label: "Action", value: result.preliminaryCaseFindings.reviewRecommendation }
                  ].map((finding, idx) => (
                    <div key={idx} className="p-4 bg-white/5 border border-white/5">
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{finding.label}</p>
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider">{finding.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-primary/[0.03] border border-primary/10 italic text-[11px] text-foreground/80 leading-relaxed border-l-2 border-l-primary">
                  "{result.recoveryScenarioSummary}"
                </div>
                <div className="mt-6 flex gap-2 p-3 bg-secondary/5 border border-secondary/20 text-[9px] text-secondary/80 uppercase tracking-widest">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <p>System Assessment Complete. Final qualification requires specialist manual audit.</p>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="glass-card border-white/5 p-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 mb-8 text-primary"><Network className="w-4 h-4" /> Evidence Tracker</h3>
                  <div className="space-y-6">
                    {evidenceMetrics.items.map((tracker, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-foreground/70">{tracker.label}</span>
                          <span className={cn(tracker.score > 70 ? 'text-primary' : tracker.score > 40 ? 'text-primary/70' : 'text-muted-foreground')}>{tracker.score > 70 ? 'Optimal' : tracker.score > 40 ? 'Sufficient' : 'Required'}</span>
                        </div>
                        <Progress value={tracker.score} className="h-1 bg-white/5" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="border-destructive/20 bg-destructive/5 p-6">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-destructive flex items-center gap-2 mb-4"><ShieldAlert className="w-4 h-4" /> Critical Notice</h4>
                  <p className="text-[10px] text-foreground/80 leading-relaxed mb-4 uppercase font-bold tracking-widest">Asset movement detected within target networks. Immediate specialist engagement recommended.</p>
                </Card>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card border-white/5 p-8">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 mb-8 text-primary"><Target className="w-4 h-4" /> Recovery Roadmap</h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {result.investigativeFocusAreas.map((cat, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/5 px-5 bg-white/5">
                      <AccordionTrigger className="hover:no-underline font-bold text-[11px] tracking-[0.1em] uppercase">{cat.categoryName}</AccordionTrigger>
                      <AccordionContent className="text-[10px] space-y-4 text-muted-foreground leading-relaxed uppercase tracking-widest">
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
                <Card className="border-primary/40 bg-primary/[0.03] p-8 shadow-2xl border-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />
                  <h4 className="text-3xl font-headline font-bold text-primary mb-4 tracking-tighter uppercase">Specialist Review Required</h4>
                  <p className="text-lg text-foreground/90 mb-8 leading-relaxed font-medium">
                    Intake parameters indicate a viable recovery scenario. <br/>
                    <span className="text-muted-foreground text-sm uppercase tracking-widest">Formal verification must be completed by a Senior Investigator.</span>
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Specialist Verification", 
                        "Blockchain Path Audit", 
                        "Feasibility Study", 
                        "Strategy Briefing"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-black/40 p-4 border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> 
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => setStep('booking')} className="w-full h-20 text-lg font-black uppercase tracking-[0.3em] bg-primary text-black hover:bg-primary/90 shadow-xl shadow-primary/20">
                    Confirm Consultation 
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {step === 'booking' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto">
            <Card className="glass-card border-primary/20 shadow-2xl overflow-hidden">
              <div className="bg-primary p-10 text-black text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-70" />
                <h2 className="text-3xl font-headline font-bold mb-2 tracking-tighter uppercase">Initialize Specialist Review</h2>
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 leading-relaxed">Secure your formal investigation slot with a Senior Recovery Specialist.</p>
              </div>
              <CardContent className="p-10 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </Label>
                    <Input 
                      placeholder="e.g. John Doe" 
                      className="bg-background/50 border-white/10 rounded-none" 
                      value={bookingValues.name}
                      onChange={(e) => setBookingValues({...bookingValues, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </Label>
                    <Input 
                      type="email" 
                      placeholder="e.g. john@example.com" 
                      className="bg-background/50 border-white/10 rounded-none" 
                      value={bookingValues.email}
                      onChange={(e) => setBookingValues({...bookingValues, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Phone className="w-3 h-3" /> Phone Number
                    </Label>
                    <Input 
                      placeholder="+1 (555) 000-0000" 
                      className="bg-background/50 border-white/10 rounded-none" 
                      value={bookingValues.phone}
                      onChange={(e) => setBookingValues({...bookingValues, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Globe className="w-3 h-3" /> Country
                    </Label>
                    <Input 
                      placeholder="e.g. United States" 
                      className="bg-background/50 border-white/10 rounded-none" 
                      value={bookingValues.country}
                      onChange={(e) => setBookingValues({...bookingValues, country: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Best Contact Time
                    </Label>
                    <Select onValueChange={(val) => setBookingValues({...bookingValues, bestTime: val})}>
                      <SelectTrigger className="bg-background/50 border-white/10 rounded-none">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                        <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Preferred Method
                    </Label>
                    <Select onValueChange={(val) => setBookingValues({...bookingValues, method: val})}>
                      <SelectTrigger className="bg-background/50 border-white/10 rounded-none">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleBooking} 
                  disabled={bookingLoading || !bookingValues.email || !bookingValues.name} 
                  className="w-full h-20 text-lg font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 bg-primary text-black hover:bg-primary/90"
                >
                  {bookingLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Transmitting Case Data...</span>
                    </div>
                  ) : (
                    <>
                      Verify Case Registration
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
                
                <SecurityChecklist />
                
                <p className="text-[8px] text-center text-muted-foreground uppercase tracking-[0.4em] mt-4">
                  Encrypted SSL Submission | Professional Registry
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold mb-4 tracking-tighter uppercase">Intake Registered</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your forensic intake has been confirmed. <br/>
              Reference ID: <span className="text-primary font-black">{caseId}</span>. <br/>
              A Senior Recovery Analyst will contact you within 24-48 business hours.
            </p>
            <Card className="glass-card p-10 border-white/5 mb-10 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] blur-3xl -mr-16 -mt-16" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2 mb-8">
                <Target className="w-4 h-4 text-primary" /> Investigative Protocol:
              </h4>
              <ul className="space-y-6">
                {[
                  "Manual Evidence Audit",
                  "Blockchain Path Finalization",
                  "Jurisdictional Feasibility Study",
                  "Strategy Briefing"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4 text-[11px] font-black uppercase tracking-widest text-foreground/80">
                    <div className="w-1 h-1 bg-primary shrink-0 mt-1.5" />
                    {step}
                  </li>
                ))}
              </ul>
            </Card>
            <Button size="lg" variant="outline" className="border-white/10 bg-white/5 uppercase font-black tracking-widest h-14 px-12" onClick={() => window.location.reload()}>
              Return
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
