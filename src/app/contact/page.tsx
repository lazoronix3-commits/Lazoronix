'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mail, 
  Globe, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Lock, 
  Activity,
  MessageSquare,
  Building
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Transmission Secure",
        description: "Your investigative brief has been encrypted and sent to the duty analyst.",
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Header */}
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
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Initialize communication with our Senior Investigative Analysts. All technical briefs are handled within restricted jurisdictional protocols.
            </p>
          </SectionReveal>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Information */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { city: "Zurich", region: "DACH / EU Hub", icon: Building },
                      { city: "London", region: "UK / International", icon: Building },
                      { city: "Singapore", region: "APAC Intelligence", icon: Building },
                      { city: "Dubai", region: "MENA Corridor", icon: Building }
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

                  <Card className="glass-card border-white/5 p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Activity className="w-5 h-5 text-primary" />
                      <h4 className="text-sm font-black uppercase tracking-widest">Operational Status</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Intake System</span>
                        <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Encryption Node</span>
                        <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> AES-256 Verified
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Specialist Availability</span>
                        <span className="text-[10px] font-black text-primary uppercase">24/7 Forensic Coverage</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </SectionReveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <SectionReveal delay={200}>
                <Card className="glass-card border-primary/10 overflow-hidden rounded-none">
                  <div className="p-8 md:p-12 space-y-10">
                    <div className="flex items-center justify-between gap-6 pb-8 border-b border-white/5">
                      <div>
                        <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">Technical Inquiry Portal</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Submit high-integrity case data for review</p>
                      </div>
                      <Lock className="w-8 h-8 text-primary opacity-20" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name / Entity</Label>
                          <Input placeholder="Identifying Name" className="bg-white/5 border-white/10 rounded-none h-12" required />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Encryption-Safe Email</Label>
                          <Input type="email" placeholder="Preferred Email" className="bg-white/5 border-white/10 rounded-none h-12" required />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Jurisdiction / Location</Label>
                          <Input placeholder="Primary Location" className="bg-white/5 border-white/10 rounded-none h-12" required />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inquiry Department</Label>
                          <Input placeholder="e.g. Trading Fraud" className="bg-white/5 border-white/10 rounded-none h-12" required />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Brief Abstract</Label>
                        <Textarea placeholder="Provide a clinical summary of the technical parameters of your case..." className="min-h-[160px] bg-white/5 border-white/10 rounded-none" required />
                      </div>

                      <div className="pt-4">
                        <Button disabled={loading} className="w-full h-16 bg-primary text-black font-black uppercase tracking-[0.3em] premium-cta rounded-none">
                          {loading ? "Transmitting Brief..." : "Transmit Encrypted Brief"}
                          {!loading && <ArrowRight className="ml-3 w-5 h-5" />}
                        </Button>
                      </div>
                    </form>

                    <div className="pt-8 mt-8 border-t border-white/5 text-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center justify-center gap-3">
                        <ShieldCheck className="w-3.5 h-3.5" /> Data Sovereignty Protected | AES-256 Terminal Encryption
                      </p>
                    </div>
                  </div>
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
