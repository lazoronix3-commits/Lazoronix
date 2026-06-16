import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Shield, Search, FileText, Activity, UserCheck } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

const steps = [
  {
    number: "01",
    title: "Case Review",
    description: "Initial assessment of your situation to understand the scope and technical entities involved.",
    icon: Shield,
    details: ["Jurisdictional check", "Entity identification", "Risk assessment"]
  },
  {
    number: "02",
    title: "Evidence Collection",
    description: "Identification and secure intake of documentation, transaction records, and communication logs.",
    icon: FileText,
    details: ["Hash retrieval", "Log preservation", "Platform audit"]
  },
  {
    number: "03",
    title: "Forensic Investigation",
    description: "Deep-dive analysis of blockchain movements, fund patterns, and communications.",
    icon: Search,
    details: ["Cluster analysis", "Path history", "Intercession data"]
  },
  {
    number: "04",
    title: "Recovery Strategy",
    description: "Development of a customized roadmap outlining the most viable technical and legal pathways.",
    icon: Activity,
    details: ["Feasibility reporting", "Strategy briefing", "Freezing protocols"]
  },
  {
    number: "05",
    title: "Ongoing Support",
    description: "Dedicated investigative guidance throughout the entire resolution process.",
    icon: UserCheck,
    details: ["Case management", "Specialist consultations", "Resolution monitoring"]
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-card/30 relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <SectionReveal>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Methodology</h2>
            <h3 className="text-4xl md:text-6xl font-headline font-bold mb-8 uppercase tracking-tighter">What Happens After Contact</h3>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              Our structured 5-step investigative process is designed to eliminate uncertainty and build a factual foundation for your case.
            </p>
          </SectionReveal>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-0 relative">
          {/* Main Gold Connection Path - Progressing through all nodes */}
          <svg className="absolute left-8 top-10 h-full w-full pointer-events-none hidden md:block" style={{ width: 'calc(100% - 2rem)' }}>
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
              className="group relative pb-16 last:pb-0 active"
            >
              {/* Vertical Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-px bg-white/5 hidden md:block overflow-hidden">
                  <div className="timeline-line-fill absolute top-0 left-0 w-full bg-primary" />
                </div>
              )}
              
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-2 flex flex-col items-center">
                  <div className="timeline-node w-16 h-16 rounded-full border border-white/10 bg-black flex items-center justify-center text-primary-foreground transition-all duration-700 shadow-xl relative z-20 overflow-hidden group-hover:scale-110">
                    <step.icon className="w-6 h-6 transition-transform duration-500" />
                  </div>
                  <span className="mt-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">{step.number}</span>
                </div>
                
                <div className="md:col-span-7">
                  <h4 className="text-2xl font-headline font-bold mb-4 group-hover:text-primary transition-colors uppercase tracking-tight">{step.title}</h4>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <div className="p-6 bg-white/[0.03] border border-white/5 space-y-3 hover:border-primary/20 transition-colors relative">
                    {/* Subtle Trace Accent on detail card */}
                    <svg className="absolute top-0 right-0 opacity-10" width="40" height="40">
                      <path d="M 40 10 L 10 10 L 10 40" className="forensic-trace" />
                    </svg>
                    
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-24 text-center">
          <SectionReveal>
            <div className="inline-block p-12 glass-card border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10">
                <h4 className="text-2xl font-headline font-bold mb-6 uppercase tracking-tight">Initialize Case Review</h4>
                <Link href="#forensic-intake">
                  <Button size="lg" className="h-16 px-12 text-lg bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-widest group">
                    Begin Step 1 Now
                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Protected under non-disclosure protocols.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
