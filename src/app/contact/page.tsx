'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { 
  Mail, 
  ShieldCheck, 
  Building, 
  Loader2,
  Lock
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DIVISIONS = [
  "Financial Trading Fraud",
  "Institutional Investment Fraud",
  "Social Engineering Fraud",
  "Digital Asset Access & Recovery",
  "Employment & Recruitment Fraud",
  "Blockchain Intelligence & Tracing"
];

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    country: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service) {
      toast({
        variant: 'destructive',
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    setLoading(true);

    try {
      const generatedId = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;
      
      const payload = {
        case_id: generatedId,
        case_type: formData.service,
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        user_country: formData.country,
        description: formData.message,
        status: 'Review Pending',
        risk_level: 'Initial Inquiry',
        evidence_integrity: 'Pending Review',
        form_values: { source: 'Contact Portal' }
      };

      const { error } = await supabase
        .from('cases')
        .insert([payload]);

      if (error) throw error;

      toast({
        title: "Transmission Secure",
        description: "Your inquiry has been encrypted and sent to the duty analyst.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        country: '',
        message: ''
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Transmission Failed",
        description: error.message || "The encryption node encountered an error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="relative pt-32 pb-20 border-b border-white/5 bg-card/30 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionReveal className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black mb-8 tracking-[0.3em] uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Communication Node
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold mb-6 tracking-tighter uppercase leading-tight">
              Establish <br />
              <span className="gradient-text italic font-medium gold-glow">Confidential Connection.</span>
            </h1>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            
            <div className="lg:col-span-2 space-y-8">
              <SectionReveal>
                <h2 className="text-3xl font-headline font-bold mb-8 uppercase tracking-tighter">Investigative Hubs</h2>
                <div className="space-y-6">
                  <Card className="glass-card border-white/5 p-8 hover:border-primary/30 transition-all group">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Primary Forensic Intake</p>
                        <p className="text-xl font-headline font-bold text-white group-hover:text-primary transition-colors">investigator@lazoronix.com</p>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { city: "Zurich", region: "DACH / EU Hub", icon: Building },
                      { city: "London", region: "UK / International", icon: Building },
                      { city: "Singapore", region: "APAC Intelligence", icon: Building }
                    ].map((hub, idx) => (
                      <Card key={idx} className="glass-card border-white/5 p-6 hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-4">
                          <hub.icon className="w-4 h-4 text-muted-foreground opacity-50" />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-tight text-white">{hub.city}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{hub.region}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>

            <div className="lg:col-span-3">
              <SectionReveal delay={200}>
                <Card className="glass-card border-white/10 overflow-hidden rounded-none p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Input 
                        placeholder="Your Name*" 
                        className="bg-white/5 border-white/10 rounded-none h-14 text-base placeholder:text-muted-foreground/50" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Input 
                        type="email" 
                        placeholder="Your Email Address" 
                        className="bg-white/5 border-white/10 rounded-none h-14 text-base placeholder:text-muted-foreground/50" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Input 
                        type="tel" 
                        placeholder="Your Phone Number" 
                        className="bg-white/5 border-white/10 rounded-none h-14 text-base placeholder:text-muted-foreground/50" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Select 
                        value={formData.service} 
                        onValueChange={(val) => setFormData({...formData, service: val})}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-none h-14 text-base text-muted-foreground/50">
                          <SelectValue placeholder="Select Services You're interested in:" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/10">
                          {DIVISIONS.map((service) => (
                            <SelectItem key={service} value={service} className="text-sm font-bold uppercase tracking-widest">
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Input 
                        placeholder="Country" 
                        className="bg-white/5 border-white/10 rounded-none h-14 text-base placeholder:text-muted-foreground/50" 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Your Message" 
                        className="min-h-[140px] bg-white/5 border-white/10 rounded-none text-base placeholder:text-muted-foreground/50" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        disabled={loading} 
                        className="bg-[#0056b3] hover:bg-[#004494] text-white font-bold h-12 px-10 rounded-sm transition-all"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </div>
                        ) : 'Submit'}
                      </Button>
                    </div>

                    <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-center gap-3 opacity-40">
                      <Lock className="w-3.5 h-3.5" />
                      <p className="text-[9px] font-black uppercase tracking-[0.3em]">AES-256 Terminal Encryption Active</p>
                    </div>
                  </form>
                </Card>
              </SectionReveal>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
