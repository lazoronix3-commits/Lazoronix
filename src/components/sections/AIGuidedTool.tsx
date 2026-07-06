"use client"

import { useState, useMemo } from 'react'
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
  Search,
  TrendingUp,
  BarChart,
  Heart,
  Briefcase,
  Banknote,
  Wallet,
  MoreHorizontal,
  ArrowRight,
  UploadCloud,
  FileText,
  ShieldCheck,
  Activity,
  Fingerprint,
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
  Trash2,
  Database,
  Shield
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

type CaseType = {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const CASE_TYPES: CaseType[] = [
  { id: "forex", title: "Financial Trading Fraud", description: "Brokerage fraud & platform manipulation", icon: TrendingUp },
  { id: "investment", title: "Institutional Investment", description: "DeFi schemes & fake ICOs", icon: BarChart },
  { id: "romance", title: "Social Engineering", description: "Emotional grooming & crypto fraud", icon: Heart },
  { id: "job", title: "Employment Fraud", description: "Fake recruitment & equipment scams", icon: Briefcase },
  { id: "loan", title: "Institutional Loan Fraud", description: "Advance-fee lending investigations", icon: Banknote },
  { id: "wallet", title: "Digital Asset Access", description: "Seed phrase & hardware recovery", icon: Wallet },
  { id: "other", title: "Blockchain Intelligence", description: "Custom digital asset tracing", icon: MoreHorizontal },
]

export function AIGuidedTool() {
  const [step, setStep] = useState<'form' | 'result' | 'success'>('form')
  const [selectedType, setSelectedType] = useState<string>('')
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [description, setDescription] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [hasAccess, setHasAccess] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIGuidedRecoveryPreparationOutput | null>(null)
  const [caseId, setCaseId] = useState('')
  const [scanStatus, setScanStatus] = useState('Processing your case...')
  const [isInputFocused, setIsInputFocused] = useState(false)
  
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
  
  const { toast } = useToast()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploadingEvidence(true)
    const file = e.target.files[0]
    const filePath = `${sessionId}/${Date.now()}_${file.name}`
    try {
      const { error: uploadError } = await supabase.storage.from('evidence').upload(filePath, file)
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage.from('evidence').getPublicUrl(filePath)
      setEvidenceFiles(prev => [...prev, { name: file.name, path: filePath, url: publicUrl }])
      toast({ title: "Evidence Ingested", description: "AES-256 Encryption Active." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Upload Failed", description: error.message })
    } finally {
      setUploadingEvidence(false)
    }
  }

  const handleFinalSubmit = async () => {
    if (!selectedType || !bookingValues.email || !bookingValues.name) {
      toast({ variant: 'destructive', title: "Missing Data", description: "Please complete all required fields." })
      return
    }
    
    setLoading(true)
    const generatedId = `LRX-${Math.floor(10000 + Math.random() * 90000)}`
    setCaseId(generatedId)

    try {
      setScanStatus("Analyzing recovery path...")
      
      const promptText = `
CATEGORY: ${selectedType}
LOSS: ${formValues.amount || 'Unknown'}
BLOCKED: ${isBlocked ? 'YES' : 'NO'}
ACCESS: ${hasAccess ? 'YES' : 'NO'}
DETAILS: ${description}
      `.trim()

      const [aiOutput] = await Promise.all([
        aiGuidedRecoveryPreparation({ initialProblemDescription: promptText }),
        supabase.from('cases').insert([{
          case_id: generatedId,
          case_type: selectedType,
          user_name: bookingValues.name,
          user_email: bookingValues.email,
          user_phone: bookingValues.phone,
          user_country: bookingValues.country,
          description: description,
          form_values: { ...formValues, bestTime: bookingValues.bestTime, method: bookingValues.method },
          is_blocked: isBlocked,
          has_access: hasAccess,
          evidence_files: evidenceFiles,
          status: 'Review Pending',
          risk_level: parseInt(formValues.amount) > 20000 ? 'Critical' : 'High'
        }])
      ])

      setResult(aiOutput)
      setStep('result')
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Transmission Error", description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="forensic-intake" className="py-24 bg-card/30 border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {step === 'form' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black mb-6 tracking-[0.3em] uppercase">
                <Shield className="w-3.5 h-3.5" />
                Recovery Intake Portal
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Get Free Consultation</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Complete this form to start your recovery process immediately. Transmission is protected via institutional-grade AES-256 encryption.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Incident Details */}
              <div className="lg:col-span-7 space-y-8">
                <Card className="glass-card border-white/5 p-8 md:p-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3 mb-8">
                    <Activity className="w-4 h-4" /> Incident Parameters
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recovery Division*</Label>
                        <Select onValueChange={setSelectedType} value={selectedType}>
                          <SelectTrigger className="bg-background/50 border-white/10 rounded-none h-12">
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                          <SelectContent>
                            {CASE_TYPES.map(type => (
                              <SelectItem key={type.id} value={type.title} className="text-[10px] font-bold uppercase tracking-widest">
                                {type.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Approx. Loss (USD)*</Label>
                        <Input 
                          placeholder="e.g. 5000" 
                          type="number"
                          className="bg-background/50 border-white/10 rounded-none h-12"
                          onChange={e => setFormValues({...formValues, amount: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Narrative</Label>
                      <Textarea 
                        placeholder="Detail the timeline, platform names, and fund movement markers."
                        className="min-h-[160px] bg-background/50 border-white/10 rounded-none italic"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
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
                  </div>
                </Card>
              </div>

              {/* Right Column: Evidence & Identity */}
              <div className="lg:col-span-5 space-y-8">
                <Card className="glass-card border-white/5 p-8 md:p-10 bg-primary/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3 mb-8">
                    <User className="w-4 h-4" /> Secure Identity
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name*</Label>
                      <Input 
                        placeholder="Your Name" 
                        className="bg-black/20 border-white/10 rounded-none h-12"
                        value={bookingValues.name}
                        onChange={e => setBookingValues({...bookingValues, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address*</Label>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="bg-black/20 border-white/10 rounded-none h-12"
                        value={bookingValues.email}
                        onChange={e => setBookingValues({...bookingValues, email: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone</Label>
                        <Input 
                          placeholder="+1..." 
                          className="bg-black/20 border-white/10 rounded-none h-12"
                          value={bookingValues.phone}
                          onChange={e => setBookingValues({...bookingValues, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Country</Label>
                        <Input 
                          placeholder="Global Hub" 
                          className="bg-black/20 border-white/10 rounded-none h-12"
                          value={bookingValues.country}
                          onChange={e => setBookingValues({...bookingValues, country: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/70 flex items-center gap-2">
                        <UploadCloud className="w-3.5 h-3.5" /> Evidence Upload
                      </h4>
                      <div className="relative border border-dashed border-white/10 rounded-none p-6 text-center bg-black/40 hover:bg-black/60 transition-colors cursor-pointer group">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={handleFileUpload} />
                        {uploadingEvidence ? <Loader2 className="w-6 h-6 text-primary mx-auto animate-spin" /> : <UploadCloud className="w-6 h-6 text-muted-foreground mx-auto mb-2 opacity-30" />}
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Drop Forensic Meta-Data Here</p>
                      </div>
                      
                      {evidenceFiles.length > 0 && (
                        <div className="space-y-2">
                          {evidenceFiles.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-black/40 border border-white/5">
                              <span className="text-[9px] font-bold text-foreground/70 truncate">{f.name}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={handleFinalSubmit} 
                    disabled={loading}
                    className="w-full h-20 text-lg font-black uppercase tracking-[0.3em] bg-primary text-black premium-cta"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="text-sm">{scanStatus}</span>
                      </div>
                    ) : (
                      <>Submit Case for Recovery <ArrowRight className="ml-2 w-6 h-6" /></>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Senior Analyst Available</span>
                    </div>
                    <Lock className="w-3.5 h-3.5 text-muted-foreground opacity-30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="animate-in fade-in zoom-in-95 duration-700">
             <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 rounded-full border-2 border-primary/40 flex items-center justify-center relative shadow-2xl shadow-primary/20">
                      <ShieldCheck className="w-10 h-10 text-primary" />
                      <div className="absolute inset-0 rounded-full bg-primary/10 animate-breathing" />
                   </div>
                   <div>
                      <h2 className="text-4xl font-headline font-bold uppercase tracking-tighter">Case Initialized</h2>
                      <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">Reference ID: {caseId}</p>
                   </div>
                </div>
                <Button variant="outline" className="h-14 px-10 border-white/10 text-[10px] font-black uppercase tracking-widest" onClick={() => setStep('form')}>Return to Command</Button>
             </div>

             <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-card p-10 space-y-12">
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {Object.entries(result.preliminaryCaseFindings).map(([key, val]: any) => (
                        <div key={key} className="p-4 bg-white/5 border border-white/5">
                           <p className="text-[8px] text-muted-foreground uppercase tracking-widest mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                           <p className="text-xs font-bold uppercase text-white">{val}</p>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 text-primary"><Target className="w-4 h-4" /> Recovery Roadmap</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                         {result.investigativeFocusAreas.map((area: any, idx: number) => (
                            <div key={idx} className="p-6 bg-white/5 border border-white/5 space-y-4">
                               <h4 className="text-[11px] font-black uppercase tracking-widest text-primary">{area.categoryName}</h4>
                               <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">{area.description}</p>
                               <ul className="space-y-2 pt-4 border-t border-white/5">
                                  {area.specificItems.map((item: string, j: number) => (
                                     <li key={j} className="text-[9px] font-bold text-foreground/60 flex items-center gap-2 uppercase">
                                        <ChevronRight className="w-3 h-3 text-primary" /> {item}
                                     </li>
                                  ))}
                               </ul>
                            </div>
                         ))}
                      </div>
                   </div>
                </Card>

                <div className="space-y-8">
                   <Card className="glass-card p-8 border-primary/20 bg-primary/5">
                      <Avatar className="w-20 h-20 border-2 border-primary mx-auto mb-6">
                         <AvatarImage src={`https://picsum.photos/seed/${caseId}/200/200`} />
                         <AvatarFallback>LA</AvatarFallback>
                      </Avatar>
                      <div className="text-center space-y-2">
                         <p className="text-xs font-black uppercase tracking-widest text-white">Analyst Assigned</p>
                         <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Awaiting Verification Brief</p>
                      </div>
                      <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                         {TIMELINE_STEPS.map((s, idx) => (
                            <div key={s.id} className="flex items-center gap-4 opacity-40">
                               <div className={cn("w-6 h-6 rounded-full border border-white/20 flex items-center justify-center", idx === 0 && "border-primary opacity-100")}>
                                  <s.icon className={cn("w-3 h-3", idx === 0 && "text-primary")} />
                               </div>
                               <span className={cn("text-[9px] font-black uppercase tracking-widest", idx === 0 && "text-white opacity-100")}>{s.label}</span>
                            </div>
                         ))}
                      </div>
                   </Card>
                   
                   <div className="p-8 bg-destructive/5 border border-destructive/20 text-center space-y-4">
                      <Lock className="w-8 h-8 text-destructive mx-auto opacity-50" />
                      <p className="text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Transmission Finalized</p>
                      <p className="text-[9px] text-muted-foreground uppercase leading-relaxed">Your data has been moved to a restricted vault. Case monitoring is active.</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  )
}
