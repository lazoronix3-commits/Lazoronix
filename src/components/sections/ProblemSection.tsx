import Link from 'next/link';
import { AlertCircle, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const problems = [
  "Financial Trading Fraud",
  "Institutional Investment Schemes",
  "Social Engineering Inquiries",
  "Recruitment-Based Asset Loss",
  "Institutional Loan Fraud",
  "Digital Asset Access Recovery",
  "Asset Tracing & Recovery Strategy"
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="glass-card rounded-[2.5rem] p-8 md:p-16 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="inline-flex items-center gap-2 text-primary font-bold mb-6">
                <AlertCircle className="w-5 h-5" />
                <span className="tracking-widest text-xs uppercase">Technical Window</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 leading-tight">Can Investigative Rigor <br/>Identify Your Path?</h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                We investigate financial fraud, trace digital assets, and identify recovery pathways using institutional methodologies and high-compute forensic workstations.
              </p>
              
              <div className="space-y-6 mb-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Investigative Specializations:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {problems.map((problem, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {problem}
                    </div>
                  ))}
                </div>
              </div>

              <Link href="#forensic-intake">
                <Button size="lg" className="h-14 px-10 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group font-bold">
                  Request Technical Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-destructive/5 border border-destructive/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Clock className="w-32 h-32 text-destructive" />
                </div>
                
                <div className="inline-flex items-center gap-2 text-destructive font-bold mb-8">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="tracking-widest text-xs uppercase">Technical Degradation Warning</span>
                </div>
                
                <h3 className="text-3xl font-headline font-bold mb-6">Immediate Intake Recommended</h3>
                <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                  Forensic evidence preservation is critical. Delay increases the probability of technical trail obfuscation and asset movement beyond exchange nodes.
                </p>
                
                <div className="grid gap-6">
                  {[
                    { label: "Asset Obfuscation", desc: "Funds are frequently moved across multiple blockchains or filtered through mixing protocols." },
                    { label: "Platform Termination", desc: "Fraudulent infrastructure is often deactivated once technical markers are identified." },
                    { label: "Meta-Data Loss", desc: "Digital evidence trails and server logs have limited retention windows." },
                    { label: "Jurisdictional Shift", desc: "Assets moving to non-compliant jurisdictions complicate legal intercession." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-background/40 border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">{item.label}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="mt-8 text-sm font-bold text-destructive/80 italic">
                  Preserve all transaction hashes and communications for Phase 01: Intake & Preservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
