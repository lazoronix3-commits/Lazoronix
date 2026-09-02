'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { 
  ShieldAlert, 
  XCircle, 
  CheckCircle2, 
  Save, 
  AlertTriangle,
  Lock,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const PRESERVATION_PROTOCOLS = [
  {
    title: "Immediate Acquisition (What to Save)",
    icon: Save,
    items: [
      { label: "Transaction Hashes (TXIDs)", desc: "Unique identifiers for every blockchain transfer." },
      { label: "Broker Communications", desc: "Full chat histories from WhatsApp, Telegram, or platforms." },
      { label: "Infrastructure Meta-Data", desc: "Email headers, domain URLs, and IP addresses if available." },
      { label: "Financial Records", desc: "Bank statements showing outgoing transfers to broker nodes." },
      { label: "Platform Snapshots", desc: "Screenshots of account balances and 'frozen' withdrawal screens." }
    ]
  },
  {
    title: "Critical Avoidance (What NOT to Do)",
    icon: XCircle,
    variant: "destructive",
    items: [
      { label: "Avoid Broker Alerting", desc: "Do not inform the suspect entity of your investigative intent." },
      { label: "Refuse Secondary Fees", desc: "Never pay 'release fees', 'taxes', or 'activation costs'." },
      { label: "Account Retention", desc: "Do not delete accounts or apps; they contain forensic meta-data." },
      { label: "Unverified Services", desc: "Avoid 'guaranteed recovery' services requesting upfront crypto." }
    ]
  }
];

export function EvidencePreservation() {
  return (
    <section id="preservation" className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      {/* Forensic Trace Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 100 L 1100 100 L 1100 700 L 100 700 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 20" />
          <path d="M 100 400 L 1100 400" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 15" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black mb-6 tracking-[0.3em] uppercase">
                <ShieldAlert className="w-3.5 h-3.5" />
                Integrity Protocol
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 uppercase tracking-tighter leading-tight">
                Evidence <br />
                <span className="text-primary italic font-medium gold-glow">Preservation Center.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                The technical viability of a recovery case is directly proportional to the integrity of the evidence preserved during the initial discovery phase.
              </p>
              
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-none space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Lock className="w-4 h-4" /> SECURE HASHING ACTIVE
                </h4>
                <p className="text-[11px] text-muted-foreground uppercase leading-relaxed font-bold tracking-widest">
                  Our intake tool utilizes automated forensic hashing to ensure your evidence maintains a verifiable chain of custody from the moment of submission.
                </p>
                <div className="space-y-4">
                  <Link href="#forensic-intake" className="block">
                    <Button className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-[10px] premium-cta">
                      Contact a Recovery Specialist
                    </Button>
                  </Link>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[9px] text-muted-foreground uppercase font-black mb-2 tracking-widest">Prefer Direct Submission?</p>
                    <a href="mailto:investigator@lazoronix.com" className="flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">
                      <Mail className="w-3.5 h-3.5" /> Email Our Team
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="lg:w-2/3 grid md:grid-cols-2 gap-8 w-full">
            {PRESERVATION_PROTOCOLS.map((protocol, pIdx) => (
              <SectionReveal key={pIdx} delay={pIdx * 200}>
                <Card className={cn(
                  "glass-card h-full rounded-none border-white/5 relative overflow-hidden group transition-all duration-500",
                  protocol.variant === 'destructive' ? "hover:border-destructive/30" : "hover:border-primary/30"
                )}>
                  <CardContent className="p-10">
                    <div className="flex items-center gap-4 mb-10">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border",
                        protocol.variant === 'destructive' ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-primary/10 border-primary/20 text-primary"
                      )}>
                        <protocol.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-headline font-bold uppercase tracking-tight leading-tight">
                        {protocol.title}
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {protocol.items.map((item, iIdx) => (
                        <div key={iIdx} className="group/item">
                          <div className="flex items-start gap-4 mb-1">
                            {protocol.variant === 'destructive' ? (
                              <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            )}
                            <p className="text-[11px] font-black uppercase tracking-widest text-white group-hover/item:text-primary transition-colors">
                              {item.label}
                            </p>
                          </div>
                          <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-wider pl-7 font-medium">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>

        <SectionReveal delay={400} className="mt-20 max-w-4xl mx-auto p-12 bg-white/5 border border-white/5 text-center">
          <h3 className="text-2xl font-headline font-bold uppercase tracking-tight mb-4">Documentation Analysis</h3>
          <p className="text-muted-foreground text-base leading-relaxed uppercase tracking-widest font-medium mb-8">
            If you already have a prepared evidence folder or transaction reports, you can bypass the intake portal and reach our investigation team directly.
          </p>
          <a 
            href="mailto:investigator@lazoronix.com" 
            className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-8 py-4 border border-primary/20 hover:bg-primary hover:text-black transition-all premium-cta"
          >
            Email Our Investigation Team <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
