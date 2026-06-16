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
import { supabase } from '@/lib/supabase'
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
  Shield,
  Trash2,
  Database
} from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const TIMELINE_STEPS = [
  { id: 'intake', label: 'Intake & Preservation', status: 'completed', icon: FileText },
  { id: 'verification', label: 'Evidence Verification', status: 'current', icon: ShieldCheck },
  { id: 'forensic', label: 'Forensic Analysis', status: 'pending', icon: Search },
  { id: 'intelligence', label: 'Intelligence Development', status: 'pending', icon: Database },
  { id: 'strategy', label: 'Recovery Strategy', status: 'pending', icon: Network },
  { id: 'resolution', label: 'Resolution Support', status: 'pending', icon: CheckCircle2 },
]

const SecurityChecklist = ({ active = false }: { active?: boolean }) => (
  <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-white/5">
    <div className={cn(
      "mb-4 md:mb-6 flex items-center gap-3 p-3 md:p-4 transition-all duration-500 border",
      active ? "bg-primary/5 border-primary/30" : "bg-white/5 border-white/5"
    )}>
      <Lock className={cn("w-3.5 h-3.5 md:w-4 md:h-4 transition-all", active ? "text-primary animate-breathing" : "text-muted-foreground")} />
      <div>
        <p className={cn("text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-colors", active ? "text-primary" : "text-muted-foreground")}>
          Secure Encrypted Submission Active
        </p>
        {active && <p className="text-[7px] md:text-[8px] font-bold text-foreground/50 uppercase tracking-widest mt-0.5">AES-256 Institutional Grade Protection</p>}
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {[
        "Encrypted submissions",
        "Secure document uploads",
        "Confidential consultations",
        "Restricted case access"
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-[8px] md:text-[9px] font-bold text-foreground/50 uppercase tracking-widest">
          <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
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
    title: "Financial Trading Fraud Division", 
    description: "Department specializing in brokerage fraud, trading platform manipulation, and offshore fund tracing.",
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
    title: "Institutional Investment Fraud Division", 
    description: "Investigation of fake ICOs, DeFi schemes, and high-yield investment programs (HYIP).",
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
    title: "Social Engineering Fraud Division", 
    description: "Department for online relationship deception, grooming schemes, and identity fraud.",
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
    title: "Employment & Recruitment Fraud Division", 
    description: "Investigation of fake job offers, equipment scams, and recruitment-based identity theft.",
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
    title: "Institutional Loan Fraud Division", 
    description: "Advance-fee lending fraud and fraudulent institutional grant investigations.",
    icon: Banknote,
    fields: [
      { key: 'lenderName', label: 'Lender/Agency Name', placeholder: 'e.g. FastCapital Loans' },
      { key: 'feeReason', label: 'Reason for Upfront Fee', placeholder: 'e.g. Insurance, Tax, Activation' },
      { key: 'amount', label: 'Total Fees Paid', placeholder: 'e.g. 1,200', type: 'number' },
    ]
  },
  { 
    id: "wallet", 
    title: "Digital Asset Access & Recovery Division", 
    description: "Forensic recovery of hardware wallets, lost credentials, and encrypted volume bypass.",
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
    title: "Blockchain Intelligence Division", 
    description: "Custom digital asset tracing and complex jurisdictional investigations.",
    icon: MoreHorizontal,
    fields: [
      { key: 'subject', label: 'Case Subject', placeholder: 'Briefly name the entity involved' },
      { key: 'amount', label: 'Estimated Loss', placeholder: 'e.g. 3,000', type: 'number' },
      { key: 'entityDetails', label: 'Entity Details', placeholder: 'Website, social media, or phone numbers' },
    ]
  },
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
  const [isInputFocused, setIsInputFocused] = useState(false)
  
  // Evidence Upload State
  const [evidenceFiles, setEvidenceFiles] = useState<{name: string, path: string, url: string}[]>([])
  const [uploadingEvidence, setUploadingEvidence] = useState(false)
  const [sessionId] = useState(() => `sess_${Math.random().toString(36).substr(2, 9)}`)

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

  const handleSelectType = (type: CaseType) => {
    setSelectedType(type)
    setStep('details')
    setFormValues({})
  }

  const handleInputChange = (key: string, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploadingEvidence(true)

    const file = e.target.files[0]
    const filePath = `${sessionId}/${Date.now()}_${file.name}`

    try {
      const { error: uploadError } = await supabase.storage
        .from('evidence')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('evidence')
        .getPublicUrl(filePath)

      setEvidenceFiles(prev => [...prev, { name: file.name, path: filePath, url: publicUrl }])
      toast({ title: "Evidence Ingested", description: `${file.name} is now encrypted in the vault.` })
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Upload Failed", 
        description: error.message || "Ensure 'evidence' bucket exists in Supabase." 
      })
    } finally {
      setUploadingEvidence(false)
    }
  }

  const removeEvidence = async (path: string) => {
    const { error } = await supabase.storage.from('evidence').remove([path])
    if (!error) {
      setEvidenceFiles(prev => prev.filter(f => f.path !== path))
    }
  }

  const evidenceMetrics = useMemo(() => {
    if (!selectedType) return { total: 0, items: [], status: 'Incomplete' };
    
    const items = [
      { label: "Transaction Records", score: Object.values(formValues).some(v => v.length > 5) ? 80 : 20 },
      { label: "Communication Logs", score: description.length > 50 ? 90 : 30 },
      { label: "Platform Evidence", score: hasAccess ? 70 : 40 },
      { label: "Identity Verification", score: formValues.brokerName || formValues.platformName ? 60 : 20 },
      { label: "Asset Path History", score: (formValues.walletAddress || formValues.cryptoWallet || evidenceFiles.length > 0) ? 85 : 15 }
    ];
    
    const total = Math.round(items.reduce((acc, curr) => acc + curr.score, 0) / items.length);
    const status = total > 70 ? 'Substantial' : total > 40 ? 'Partial' : 'Incomplete';
    
    return { total, items, status };
  }, [formValues, description, hasAccess, selectedType, evidenceFiles]);

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

    const generatedId = `LRX-${Math.floor(10000 + Math.random() * 90000)}`;
    setCaseId(generatedId);
    
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
EVIDENCE FILES UPLOADED: ${evidenceFiles.length}
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
    
    try {
      const payload = {
        case_id: caseId,
        case_type: selectedType?.title,
        form_values: formValues || {},
        description: description || '',
        is_blocked: !!isBlocked,
        has_access: !!hasAccess,
        result_data: result || {},
        user_name: bookingValues.name,
        user_email: bookingValues.email,
        user_phone: bookingValues.phone || null,
        user_country: bookingValues.country,
        best_contact_time: bookingValues.bestTime,
        preferred_method: bookingValues.method,
        status: 'Review Pending',
        risk_level: riskLevel,
        evidence_integrity: evidenceMetrics.status,
        evidence_files: evidenceFiles
      };

      const { error } = await supabase
        .from('cases')
        .insert([payload]);

      if (error) {
        throw new Error(error.message || 'Database error occurred');
      }
      
      setStep('success')
    } catch (error: any) {
      console.error('Forensic Intake Error:', error.message || error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Could not register your case."
      });
    } finally {
      setBookingValuesLoading(false)
    }
  }

  return (
    <section id="forensic-intake" className="py-16 md:py-24 bg-card/30 relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/[0.03] blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className={cn("w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center font-black text-[10px] md:text-xs border transition-all", step === 'type' ? "bg-primary border-primary text-black" : "bg-transparent border-white/10 text-muted-foreground")}>01</div>
            <div className={cn("w-6 md:w-12 h-px shrink-0 transition-colors", step !== 'type' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center font-black text-[10px] md:text-xs border transition-all", step === 'details' ? "bg-primary border-primary text-black" : step === 'result' || step === 'booking' || step === 'success' ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-white/10 text-muted-foreground")}>02</div>
            <div className={cn("w-6 md:w-12 h-px shrink-0 transition-colors", step === 'result' || step === 'booking' || step === 'success' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center font-black text-[10px] md:text-xs border transition-all", step === 'result' ? "bg-primary border-primary text-black" : step === 'booking' || step === 'success' ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-white/10 text-muted-foreground")}>03</div>
            <div className={cn("w-6 md:w-12 h-px shrink-0 transition-colors", step === 'booking' || step === 'success' ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center font-black text-[10px] md:text-xs border transition-all", step === 'booking' || step === 'success' ? "bg-primary border-primary text-black" : "bg-transparent border-white/10 text-muted-foreground")}>04</div>
          </div>
        </div>

        {step === 'type' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4 md:mb-6 tracking-tighter uppercase">Forensic Case Intake</h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                Select the investigative division to initialize the formal intake process. All data is protected under institutional-grade encryption.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {CASE_TYPES.map((type) => (
                <Card 
                  key={type.id} 
                  className="glass-card hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer group active:scale-[0.98]"
                  onClick={() => handleSelectType(type)}
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/20 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary/5 transition-colors">
                      <type.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-headline font-bold mb-2 md:mb-3 uppercase tracking-tight">{type.title}</h3>
                    <p className="text-muted-foreground text-[11px] md:text-sm leading-relaxed mb-6 md:mb-8">{type.description}</p>
                    <div className="flex items-center text-primary font-black text-[9px] md:text-[10px] uppercase tracking-widest">
                      Initialize Case <ArrowRight className="ml-2 w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'details' && selectedType && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <Button variant="ghost" className="mb-6 md:mb-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-0 md:px-4" onClick={() => setStep('type')}>
              <ArrowLeft className="mr-2 w-3.5 h-3.5" /> Back to Divisions
            </Button>
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <Card className="glass-card border-white/5">
                  <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      {selectedType.fields.map((field) => (
                        <div key={field.key} className="space-y-2 md:space-y-3">
                          <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">{field.label}</Label>
                          <Input 
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            className="h-10 md:h-12 bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors text-xs md:text-sm"
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8 py-4 border-y border-white/5">
                      <div className="flex items-center justify-between gap-4">
                        <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Withdrawals Blocked?</Label>
                        <Switch checked={isBlocked} onCheckedChange={setIsBlocked} />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Account Access?</Label>
                        <Switch checked={hasAccess} onCheckedChange={setHasAccess} />
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Narrative</Label>
                      <Textarea 
                        placeholder="Provide specific technical details about the entities, transaction IDs, and communication methods involved."
                        className="min-h-[120px] md:min-h-[160px] bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors text-xs md:text-sm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                      />
                    </div>
                    <Button onClick={handleAssessment} disabled={loading} className="w-full h-14 md:h-16 text-sm md:text-lg font-black uppercase tracking-[0.2em] bg-primary text-black premium-cta">
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-4 h-4 md:h-5 md:w-5 animate-spin" />
                          <span className="text-xs md:text-base">{scanStatus}</span>
                        </div>
                      ) : 'Generate Intake Summary'}
                    </Button>
                    
                    <SecurityChecklist active={isInputFocused} />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="glass-card border-white/5 p-6 hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                  <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4 text-primary"><UploadCloud className="w-4 h-4" /> Evidence Portal</h4>
                  <div className="relative border border-dashed border-white/10 rounded-none p-6 md:p-8 text-center bg-white/5 mb-6 group cursor-pointer hover:bg-white/[0.08] transition-colors">
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      onChange={handleFileUpload}
                      disabled={uploadingEvidence}
                    />
                    {uploadingEvidence ? (
                      <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 animate-spin" />
                    ) : (
                      <UploadCloud className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    )}
                    <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                      {uploadingEvidence ? 'Encrypting File...' : 'Encrypted Evidence Upload'}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="text-[8px] font-black uppercase tracking-widest text-primary/70">Verified Submissions:</h5>
                    <ul className="space-y-2">
                      {evidenceFiles.length === 0 ? (
                        ["Transaction Hashes", "Chat Histories", "Email Logs"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                            <FileText className="w-3 h-3" /> {item}
                          </li>
                        ))
                      ) : (
                        evidenceFiles.map((file, i) => (
                          <li key={i} className="flex items-center justify-between gap-2 p-2 bg-white/5 border border-white/5 overflow-hidden">
                            <div className="flex items-center gap-2 min-w-0">
                              <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
                              <span className="text-[8px] md:text-[9px] font-bold text-foreground/80 truncate">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-destructive" onClick={() => removeEvidence(file.path)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 active">
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 md:gap-6">
              <div className="flex-grow p-6 md:p-8 glass-card border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                 <svg className="absolute inset-0 pointer-events-none opacity-20" width="100%" height="100%">
                    <path d="M 0 40 L 40 40 L 40 0" className="forensic-trace" />
                    <circle cx="40" cy="40" r="1.5" className="network-node" />
                 </svg>
                 
                 <div className="flex items-center gap-4 md:gap-6 relative z-10 w-full md:w-auto">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary/40 flex items-center justify-center shadow-lg relative shrink-0">
                     <Activity className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                     <div className="absolute inset-0 rounded-full bg-primary/20 animate-breathing -z-10" />
                   </div>
                   <div className="min-w-0">
                     <h2 className="text-xl md:text-2xl font-headline font-bold mb-1 uppercase tracking-tight truncate">Case Dashboard</h2>
                     <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                       <span className="flex items-center gap-1.5"><Fingerprint className="w-3 h-3 md:w-3.5 md:h-3.5" /> ID: <span className="text-foreground font-black">{caseId}</span></span>
                       <span className="flex items-center gap-1.5">
                         <Activity className="w-3 h-3 md:w-3.5 md:h-3.5" /> 
                         <span className="hidden sm:inline">Status:</span> 
                         <span className="flex items-center gap-1.5 text-primary">
                           <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary animate-breathing" />
                           Verification Active
                         </span>
                       </span>
                     </div>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 w-full md:w-auto relative z-10">
                   <Button variant="outline" className="w-full md:w-auto opacity-50 cursor-not-allowed border-white/10 bg-white/5 text-[8px] md:text-[9px] font-black uppercase tracking-widest h-9">Download Brief</Button>
                 </div>
              </div>
              <Card className="glass-card border-white/5 p-4 md:p-6 flex items-center gap-4 min-w-0 md:min-w-[320px]">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-primary/20">
                  <AvatarImage src={`https://picsum.photos/seed/${caseId}/100/100`} />
                  <AvatarFallback className="bg-primary text-black">SA</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-black text-[9px] md:text-[10px] uppercase tracking-widest text-white truncate">Senior Recovery Analyst</p>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-widest truncate">Forensic Hub Assigned</p>
                </div>
              </Card>
            </div>

            <Card className="glass-card border-white/5 p-6 md:p-8 overflow-x-auto hide-scrollbar">
              <div className="flex flex-row md:flex-row justify-between items-center gap-8 md:gap-4 min-w-[700px] md:min-w-0">
                {TIMELINE_STEPS.map((timelineStep, idx) => (
                  <div key={timelineStep.id} className="flex flex-col items-center gap-2 flex-1 relative">
                    <div className={cn(
                      "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 transition-all relative", 
                      timelineStep.status === 'completed' ? "bg-primary text-black" : 
                      timelineStep.status === 'current' ? "border border-primary text-primary" : 
                      "bg-muted text-muted-foreground border border-white/5"
                    )}>
                      {timelineStep.status === 'current' && (
                        <div className="absolute inset-0 rounded-full border border-primary animate-breathing" />
                      )}
                      <timelineStep.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <div className="text-center">
                      <p className={cn(
                        "text-[7px] md:text-[8px] font-black uppercase tracking-[0.25em]",
                        timelineStep.status === 'current' ? "text-primary opacity-100" : "opacity-50"
                      )}>
                        {timelineStep.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card className="glass-card border-white/5 p-6 md:p-8 hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-3 md:mb-4 block">Case Complexity</span>
                <div className={cn("text-2xl md:text-3xl font-headline font-bold uppercase tracking-tighter", riskLevel === 'Critical' ? 'text-destructive' : riskLevel === 'High' ? 'text-primary/70' : 'text-primary')}>{riskLevel}</div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-2 leading-relaxed uppercase tracking-widest">Based on technical loss parameters.</p>
              </Card>
              <Card className="glass-card border-white/5 p-6 md:p-8 hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-3 md:mb-4 block">Evidence Integrity</span>
                <div className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tighter">{evidenceMetrics.status}</div>
                <Progress value={evidenceMetrics.total} className="h-1 mt-2 bg-white/5" />
              </Card>
              <Card className="glass-card border-white/5 p-6 md:p-8 hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-3 md:mb-4 block">System Status</span>
                <div className="text-2xl md:text-3xl font-headline font-bold text-primary uppercase tracking-tighter flex items-center gap-3">
                   <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-primary animate-breathing" />
                   Qualified
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-2 leading-relaxed uppercase tracking-widest">Awaiting verification phase completion.</p>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <Card className="glass-card border-white/5 p-6 md:p-8 relative overflow-hidden">
                <svg className="absolute inset-0 pointer-events-none opacity-10" width="100%" height="100%">
                  <path d="M 0 100 L 100 100 L 100 0" className="forensic-trace" />
                </svg>
                
                <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 mb-6 md:mb-8 text-primary relative z-10"><Search className="w-3.5 h-3.5 md:w-4 md:h-4" /> Forensic Intake Findings</h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
                  {[
                    { label: "Asset Type", value: result.preliminaryCaseFindings.scamType },
                    { label: "Estimated Value", value: result.preliminaryCaseFindings.estimatedLoss },
                    { label: "Evidence Status", value: result.preliminaryCaseFindings.evidenceStatus },
                    { label: "Complexity", value: result.preliminaryCaseFindings.caseComplexity },
                    { label: "Status", value: result.preliminaryCaseFindings.investigationReadiness },
                    { label: "Action", value: result.preliminaryCaseFindings.reviewRecommendation }
                  ].map((finding, idx) => (
                    <div key={idx} className="p-3 md:p-4 bg-white/5 border border-white/5">
                      <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{finding.label}</p>
                      <p className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wider">{finding.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-primary/[0.03] border border-primary/10 italic text-[10px] md:text-[11px] text-foreground/80 leading-relaxed border-l-2 border-l-primary relative z-10">
                  "{result.recoveryScenarioSummary}"
                </div>
              </Card>

              <div className="space-y-4 md:space-y-6">
                <Card className="glass-card border-white/5 p-6 md:p-8 hover:border-primary/50 transition-all duration-300">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 mb-6 md:mb-8 text-primary"><Network className="w-3.5 h-3.5 md:w-4 md:h-4" /> Evidence Lifecycle Status</h3>
                  <div className="space-y-4 md:space-y-6">
                    {evidenceMetrics.items.map((tracker, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                          <span className="text-foreground/70">{tracker.label}</span>
                          <span className={cn(tracker.score > 70 ? 'text-primary' : tracker.score > 40 ? 'text-primary/70' : 'text-muted-foreground')}>
                            {tracker.score > 70 ? 'Verified' : tracker.score > 40 ? 'Sufficient' : 'Pending'}
                          </span>
                        </div>
                        <Progress value={tracker.score} className="h-1 bg-white/5" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <Card className="glass-card border-white/5 p-6 md:p-8">
                <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 mb-6 md:mb-8 text-primary"><Target className="w-3.5 h-3.5 md:w-4 md:h-4" /> Investigation Roadmap</h3>
                <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                  {result.investigativeFocusAreas.map((cat, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/5 px-4 md:px-5 bg-white/5">
                      <AccordionTrigger className="hover:no-underline font-bold text-[10px] md:text-[11px] tracking-[0.1em] uppercase py-3 md:py-4">{cat.categoryName}</AccordionTrigger>
                      <AccordionContent className="text-[9px] md:text-[10px] space-y-3 md:space-y-4 text-muted-foreground leading-relaxed uppercase tracking-widest pb-4">
                        <p>{cat.description}</p>
                        <ul className="space-y-2">
                          {cat.specificItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-foreground/80"><ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" /> {item}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>

              <div className="space-y-6 md:space-y-8">
                <Card className="border-primary/40 bg-primary/[0.03] p-6 md:p-8 shadow-2xl border-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 blur-3xl -mr-12 md:-mr-16 -mt-12 md:-mt-16" />
                  <h4 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-3 md:mb-4 tracking-tighter uppercase">Specialist Briefing Required</h4>
                  <p className="text-base md:text-lg text-foreground/90 mb-6 md:mb-8 leading-relaxed font-medium">
                    Intake parameters indicate a viable investigation lifecycle.
                  </p>
                  
                  <Button onClick={() => setStep('booking')} className="w-full h-16 md:h-20 text-base md:text-lg font-black uppercase tracking-[0.3em] bg-primary text-black hover:bg-primary/90 shadow-xl shadow-primary/20 premium-cta rounded-none">
                    Confirm Consultation 
                    <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {step === 'booking' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto px-4 md:px-0">
            <Card className="glass-card border-primary/20 shadow-2xl overflow-hidden">
              <div className="bg-primary p-6 md:p-10 text-black text-center">
                <Calendar className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-70" />
                <h2 className="text-2xl md:text-3xl font-headline font-bold mb-2 tracking-tighter uppercase">Register Case Lifecycle</h2>
              </div>
              <CardContent className="p-6 md:p-10 space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </Label>
                    <Input 
                      placeholder="e.g. John Doe" 
                      className="bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors h-10 md:h-12 text-xs md:text-sm" 
                      value={bookingValues.name}
                      onChange={(e) => setBookingValues({...bookingValues, name: e.target.value})}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </Label>
                    <Input 
                      type="email" 
                      placeholder="e.g. john@example.com" 
                      className="bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors h-10 md:h-12 text-xs md:text-sm" 
                      value={bookingValues.email}
                      onChange={(e) => setBookingValues({...bookingValues, email: e.target.value})}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Phone className="w-3 h-3" /> Phone Number
                    </Label>
                    <Input 
                      placeholder="+1 (555) 000-0000" 
                      className="bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors h-10 md:h-12 text-xs md:text-sm" 
                      value={bookingValues.phone}
                      onChange={(e) => setBookingValues({...bookingValues, phone: e.target.value})}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Globe className="w-3 h-3" /> Country
                    </Label>
                    <Input 
                      placeholder="e.g. United States" 
                      className="bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors h-10 md:h-12 text-xs md:text-sm" 
                      value={bookingValues.country}
                      onChange={(e) => setBookingValues({...bookingValues, country: e.target.value})}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Best Contact Time
                    </Label>
                    <Select onValueChange={(val) => setBookingValues({...bookingValues, bestTime: val})}>
                      <SelectTrigger className="bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors h-10 md:h-12 text-xs md:text-sm">
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
                    <Label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Preferred Method
                    </Label>
                    <Select onValueChange={(val) => setBookingValues({...bookingValues, method: val})}>
                      <SelectTrigger className="bg-background/50 border-white/10 rounded-none focus:border-primary/50 focus:ring-0 transition-colors h-10 md:h-12 text-xs md:text-sm">
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
                  className="w-full h-16 md:h-20 text-sm md:text-lg font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 bg-primary text-black hover:bg-primary/90 premium-cta rounded-none"
                >
                  {bookingLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-4 h-4 md:h-5 md:w-5 animate-spin" />
                      <span className="text-xs md:text-base">Transmitting Technical Data...</span>
                    </div>
                  ) : (
                    <>
                      Verify Case Registration
                      <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:w-5" />
                    </>
                  )}
                </Button>
                
                <SecurityChecklist active={isInputFocused} />
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-xl mx-auto text-center px-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-primary/40 flex items-center justify-center mx-auto mb-6 md:mb-8 relative">
              <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-breathing" />
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 tracking-tighter uppercase">Intake Registered</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Your forensic lifecycle has been initialized. <br/>
              Reference ID: <span className="text-primary font-black">{caseId}</span>. <br/>
            </p>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 bg-white/5 uppercase font-black tracking-widest h-14 px-12 rounded-none" onClick={() => window.location.reload()}>
              Return
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
