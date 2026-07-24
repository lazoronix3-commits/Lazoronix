"use client"

import { useState } from 'react'
import { aiGuidedRecoveryPreparation } from '@/ai/flows/ai-guided-recovery-preparation'
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
  ArrowRight,
  Lock,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AIGuidedTool() {
  const [step, setStep] = useState<'form' | 'result'>('form')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
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
      setScanStatus("Securing transmission...")
      
      const promptText = `
NAME: ${bookingValues.name}
EMAIL: ${bookingValues.email}
PHONE: ${bookingValues.phone}
COUNTRY: ${bookingValues.country}
NARRATIVE: ${description}
      `.trim()

      // We call the AI in the background so the admin has the results, 
      // but we don't make the user wait for a dashboard.
      const aiOutput = await aiGuidedRecoveryPreparation({ initialProblemDescription: promptText });

      await supabase.from('cases').insert([{
        case_id: generatedId,
        case_type: 'Direct Inquiry',
        user_name: bookingValues.name,
        user_email: bookingValues.email,
        user_phone: bookingValues.phone,
        user_country: bookingValues.country,
        description: description,
        status: 'Review Pending',
        risk_level: 'High',
        result_data: aiOutput
      }]);

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

        {step === 'result' && (
          <div className="animate-in fade-in zoom-in-95 duration-700 text-center py-20">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold uppercase tracking-tighter mb-4">Case Initialized</h2>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">Reference ID: {caseId}</p>
            <div className="max-w-md mx-auto p-8 bg-white/5 border border-white/10 space-y-4">
              <p className="text-sm text-muted-foreground uppercase leading-relaxed font-bold tracking-widest">
                Your request has been securely vaulted. A specialized analyst has been assigned to your case and will contact you via email shortly.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3 opacity-40">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Protocol Active</span>
              </div>
            </div>
            <Button variant="outline" className="mt-12 h-12 px-8 border-white/10 text-[10px] font-black uppercase tracking-widest" onClick={() => setStep('form')}>Return to Portal</Button>
          </div>
        )}
      </div>
    </section>
  )
}