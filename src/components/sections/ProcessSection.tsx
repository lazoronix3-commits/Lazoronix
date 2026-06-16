import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Shield, Search, FileText, Activity, UserCheck, Database, Network } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

const steps = [
  {
    number: "01",
    title: "Intake & Preservation",
    description: "Initial case ingestion and immediate preservation of volatile digital evidence including server logs and communications.",
    icon: FileText,
    details: ["Evidence hashing", "Metadata logging", "Chain of custody initialization"]
  },
  {
    number: "02",
    title: "Evidence Verification",
    description: "Rigorous technical verification of submitted transaction hashes and platform credentials across multi-jurisdictional nodes.",
    icon: Shield,
    details: ["Hash validation", "Entity verification", "Jurisdiction mapping"]
  },
  {
    number: "03",
    title: "Forensic Analysis",
    description: "Deep-dive blockchain analytics and fund obfuscation tracing using high-compute forensic workstations.",
    icon: Search,
    details: ["Cluster analysis", "Mixer tracing", "Wallet attribution"]
  },
  {
    number: "04",
    title: "Intelligence Development",
    description: "Synthesis of technical data into a formal investigative brief, identifying final asset destination points.",
    icon: Database,
    details: ["Beneficiary identification", "Exchange node mapping", "Intelligence reporting"]
  },
  {
    number: "05",
    title: "Recovery Strategy",
    description: "Development of a specialized roadmap for asset intercession, including technical and jurisdictional interdiction protocols.",
    icon: Network,
    details: ["Intercession protocols", "Roadmap finalization", "Legal-Technical alignment"]
  },
  {
    number: "06",
    title: "Resolution Support",
    description: "Direct technical guidance through the final resolution phase, providing expert reporting and case monitoring.",
    icon: UserCheck,
    details: ["Case monitoring", "Resolution tracking", "Expert reporting"]
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-32 bg-card/30 relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <SectionReveal>
            <h2 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Methodology</h2>
            <h3 className="text-3xl md:text-6xl font-headline font-bold mb-6 md:mb-8 uppercase tracking-tighter leading-tight">Investigation Lifecycle</h3>
            <p className="text-muted-foreground text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              Our clinical 6-phase investigative lifecycle is designed to identify definitive technical resolution points for complex fraud.
            </p>
          </SectionReveal>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-0 relative">
          {/* Main Gold Connection Path */}
          <svg className="absolute left-6 md:left-8 top-10 h-full w-full pointer-events-none hidden md:block" style={{ width: 'calc(100% - 2rem)' }}>
            {steps.map((_, idx) => idx < steps.length - 1 && (
              <path 
                key={idx}
                d={`M 0 ${idx * 160 + 10} L 0 ${(idx + 1) * 160 + 10}`} 
                className="forensic-trace" 
                style={{ animationDelay: `${idx * 0.4}s`, opacity: 0.3 }}
              />
            ))}
          </svg>

          {steps.map((step, idx) => (
            <SectionReveal 
              key={idx} 
              delay={idx * 150} 
              threshold={0.3}
              className="group relative pb-12 md:pb-16 last:pb-0 active"
            >
              {/* Vertical Connector Line for Desktop */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-6 md:left-8 top-16 md:top-20 bottom-0 w-px bg-white/5 hidden md:block overflow-hidden">
                  <div className="timeline-line-fill absolute top-0 left-0 w-full bg-primary" />
                </div>
              )}
              
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="md:col-span-2 flex md:flex-col items-center gap-4 md:gap-0">
                  <div className="timeline-node w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-black flex items-center justify-center text-primary-foreground transition-all duration-700 shadow-xl relative z-20 overflow-hidden group-hover:scale-110 shrink-0">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 text-primary" />
                  </div>
                  <span className="md:mt-4 text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">{step.number}</span>
                </div>
                
                <div className="md:col-span-7">
                  <h4 className="text-xl md:text-2xl font-headline font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors uppercase tracking-tight">{step.title}</h4>
                  <p className="text-sm md:text-lg text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <div className="p-4 md:p-6 bg-white/[0.03] border border-white/5 space-y-2 md:space-y-3 hover:border-primary/20 transition-colors relative">
                    <svg className="absolute top-0 right-0 opacity-10" width="30" height="30">
                      <path d="M 30 8 L 8 8 L 8 30" className="forensic-trace" />
                    </svg>
                    
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/50">
                        <CheckCircle2 className="w-3 md:w-3.5 h-3 md:h-3.5 text-primary" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <SectionReveal>
            <div className="inline-block p-6 md:p-12 glass-card border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 w-full sm:w-auto">
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-headline font-bold mb-4 md:mb-6 uppercase tracking-tight">Commence Lifecycle Phase 01</h4>
                <Link href="#forensic-intake" className="block sm:inline-block">
                  <Button size="lg" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 text-sm md:text-lg bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-widest group rounded-none premium-cta">
                    Initialize Intake
                    <ArrowRight className="ml-2 w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="mt-4 md:mt-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Restricted Access Protocols Active
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
