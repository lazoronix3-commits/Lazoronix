"use client"

import { useState } from 'react'
import { aiGuidedRecoveryPreparation, type AIGuidedRecoveryPreparationOutput } from '@/ai/flows/ai-guided-recovery-preparation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { 
  Loader2, 
  CheckCircle2, 
  Search,
  ArrowRight,
  FileText,
  ShieldCheck,
  Activity,
  Fingerprint,
  Target,
  Network,
  ChevronRight,
  User,
  Lock,
  Shield,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// To avoid unused import error if we remove it from UI but keep it in timeline
const DatabaseIcon = ({ className }: { className?: string }) => <div className={className} />

const TIMELINE_STEPS = [
  { id: 'intake', label: 'Intake & Preservation', status: 'completed', icon: FileText },
  { id: 'verification', label: 'Evidence Verification', status: 'current', icon: ShieldCheck },
  { id: 'forensic', label: 'Forensic Analysis', status: 'pending', icon: Search },
  { id: 'intelligence', label: 'Intelligence Development', status: 'pending', icon: DatabaseIcon },
  { id: 'strategy', label: 'Recovery Strategy', status: 'pending', icon: Network },
  { id: 'resolution', label: 'Resolution Support', status: 'pending', icon: CheckCircle2 },
]

export function AIGuidedTool() {
  const [step, setStep] = useState<'form' | 'result'>('form')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIGuidedRecoveryPreparationOutput | null>(null)
  const [caseId, setCaseId] = useState('')
  const [scanStatus, setScanStatus] = useState('Processing your case...')

  const [bookingValues, setBookingValues] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  })
  
  const { toast } = useToast()

  const handleFinalSubmit = async () => {
    if (!bookingValues.email || !bookingValues.name || !description) {
      toast({ variant: 'destructive', title: "Missing Data", description: "Please complete all required fields." })
      return
    }
    
    setLoading(true)
    const generatedId = `LRX-${Math.floor(10000 + Math.random() * 90000)}`
    setCaseId(generatedId)

    try {
      setScanStatus("Analyzing recovery path...")
      
      const promptText = `
NAME: ${bookingValues.name}
EMAIL: ${bookingValues.email}
PHONE: ${bookingValues.phone}
COUNTRY: ${bookingValues.country}
NARRATIVE: ${description}
      `.trim()

      const [aiOutput] = await Promise.all([
        aiGuidedRecoveryPreparation({ initialProblemDescription: promptText }),
        supabase.from('cases').insert([{
          case_id: generatedId,
          case_type: 'General Inquiry',
          user_name: bookingValues.name,
          user_email: bookingValues.email,
          user_phone: bookingValues.phone,
          user_country: bookingValues.country,
          description: description,
          status: 'Review Pending',
          risk_level: 'High'
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
      <div className="container mx-auto px-6 max-w-4xl">
        {step === 'form' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black mb-6 tracking-[0.3em] uppercase">
                <Shield className="w-3.5 h-3.5" />
                Recovery Intake Portal
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Get Free Consultation</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Complete this brief form to speak with our recovery specialists. Your data is protected by institutional encryption.
              </p>
            </div>

            <Card className="glass-card border-white/10 p-8 md:p-12 max-w-3xl mx-auto overflow-hidden">
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name*</Label>
                    <Input 
                      placeholder="Your Name" 
                      className="bg-background/50 border-white/10 rounded-none h-14"
                      value={bookingValues.name}
                      onChange={e => setBookingValues({...bookingValues, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address*</Label>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-background/50 border-white/10 rounded-none h-14"
                      value={bookingValues.email}
                      onChange={e => setBookingValues({...bookingValues, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                    <Input 
                      placeholder="+1..." 
                      className="bg-background/50 border-white/10 rounded-none h-14"
                      value={bookingValues.phone}
                      onChange={e => setBookingValues({...bookingValues, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Country</Label>
                    <Input 
                      placeholder="Global Hub" 
                      className="bg-background/50 border-white/10 rounded-none h-14"
                      value={bookingValues.country}
                      onChange={e => setBookingValues({...bookingValues, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Narrative (What happened?)*</Label>
                  <Textarea 
                    placeholder="Describe your case briefly. Include any relevant platform names or dates."
                    className="min-h-[140px] bg-background/50 border-white/10 rounded-none italic"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handleFinalSubmit} 
                    disabled={loading}
                    className="w-full h-20 text-lg font-black uppercase tracking-[0.3em] bg-primary text-black premium-cta rounded-none"
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
                </div>

                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Senior Analyst Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground opacity-30" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">AES-256 Active</span>
                  </div>
                </div>
              </div>
            </Card>
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
                <Button variant="outline" className="h-14 px-10 border-white/10 text-[10px] font-black uppercase tracking-widest" onClick={() => setStep('form')}>Start New Case</Button>
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
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 text-primary"><Target className="w-4 h-4" /> Suggested Recovery Pathway</h3>
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
                         <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Awaiting Initial Review</p>
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
                      <p className="text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Data Securely Vaulted</p>
                      <p className="text-[9px] text-muted-foreground uppercase leading-relaxed">Your submission has been moved to a restricted node. A specialist will contact you via the provided email.</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  )
}
