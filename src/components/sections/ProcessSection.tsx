import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Shield, Search, FileText, Activity, UserCheck } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Case Review",
    description: "Our specialists conduct an initial assessment of your situation to understand the scope of the loss and the technical entities involved.",
    icon: Shield,
    details: ["Jurisdictional check", "Entity identification", "Preliminary risk assessment"]
  },
  {
    number: "02",
    title: "Evidence Collection",
    description: "We guide you through identifying and securing critical documentation, transaction records, and communication logs required for a formal investigation.",
    icon: FileText,
    details: ["Transaction hash retrieval", "Chat log preservation", "Platform credential audit"]
  },
  {
    number: "03",
    title: "Forensic Investigation",
    description: "A deep-dive technical analysis of blockchain movements, fund obfuscation patterns, and communications to map the flow of digital assets.",
    icon: Search,
    details: ["Wallet cluster analysis", "Asset path history", "Exchange intercession data"]
  },
  {
    number: "04",
    title: "Recovery Strategy",
    description: "Based on forensic findings, we develop a customized roadmap outlining the most viable technical and legal pathways for asset pursuit.",
    icon: Activity,
    details: ["Feasibility reporting", "Strategy briefing", "Asset freezing protocols"]
  },
  {
    number: "05",
    title: "Ongoing Support",
    description: "Dedicated investigative guidance throughout the entire process, ensuring you are supported at every critical milestone of the recovery journey.",
    icon: UserCheck,
    details: ["Case management", "Specialist consultations", "Resolution monitoring"]
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-muted/10 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(70,123,224,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em] mb-4">The Lazoronix Methodology</h2>
          <h3 className="text-4xl md:text-6xl font-headline font-bold mb-8">What Happens After You Contact Us</h3>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Our structured 5-step investigative process is designed to eliminate uncertainty and build a factual foundation for your recovery case.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative">
              {/* Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />
              )}
              
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Number \u0026 Icon column */}
                <div className="md:col-span-2 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary/20 relative z-20">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="mt-4 text-xs font-black text-muted-foreground uppercase tracking-widest">{step.number}</span>
                </div>
                
                {/* Content column */}
                <div className="md:col-span-7">
                  <h4 className="text-2xl font-headline font-bold mb-4 group-hover:text-primary transition-colors">{step.title}</h4>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Details column */}
                <div className="md:col-span-3">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-bold text-foreground/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-block p-12 rounded-[3rem] bg-card border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-2xl font-headline font-bold mb-6">Ready to Initialize Your Case Review?</h4>
              <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 font-bold group">
                Begin Step 1: Secure Case Review
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="mt-6 text-sm text-muted-foreground">
                All initial consultations are protected under non-disclosure protocols.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
