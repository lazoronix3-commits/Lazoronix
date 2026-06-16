import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, FileSearch, ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden hero-gradient border-b border-white/5">
      {/* Living Intelligence Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
          <defs>
            <pattern id="intelligence-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="0.5" fill="rgba(212, 175, 55, 0.1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intelligence-grid)" />
          
          {/* Connection Lines - Slow Network Flow */}
          <path d="M 0 100 Q 300 150 600 400 T 1200 700" className="network-line" />
          <path d="M 1200 100 Q 900 300 600 400 T 0 700" className="network-line" />
          <path d="M 600 0 L 600 800" className="network-line" style={{ animationDuration: '80s' }} />
          <path d="M 0 400 L 1200 400" className="network-line" style={{ animationDuration: '90s' }} />
          
          {/* Traveling Pulses - Sparse High-Intensity Data */}
          <path d="M 0 100 Q 300 150 600 400 T 1200 700" className="pulse-line" />
          <path d="M 1200 100 Q 900 300 600 400 T 0 700" className="pulse-line" style={{ animationDelay: '-15s' }} />
          
          {/* Strategic Nodes - Glowing Intelligence Points */}
          <circle cx="600" cy="400" r="2" className="network-node" />
          <circle cx="300" cy="150" r="1.5" className="network-node" style={{ animationDelay: '-2s' }} />
          <circle cx="900" cy="300" r="1.5" className="network-node" style={{ animationDelay: '-4s' }} />
          <circle cx="200" cy="600" r="1.5" className="network-node" style={{ animationDelay: '-6s' }} />
          <circle cx="1000" cy="500" r="1.5" className="network-node" style={{ animationDelay: '-8s' }} />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black mb-8 animate-in fade-in slide-in-from-top-4 duration-700 tracking-[0.3em] uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Institutional Forensic Intelligence
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.95] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 tracking-tighter text-white">
            Investigative Rigor. <br/>
            <span className="gradient-text italic font-medium gold-glow">Asset Resolution.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Lazoronix provides institutional-grade forensic investigation and blockchain intelligence for complex digital asset recovery. We help victims of investment fraud, forex scams, and wallet loss identify definitive recovery pathways.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button size="lg" className="h-16 px-12 text-lg bg-primary text-black hover:bg-primary/90 font-black w-full sm:w-auto shadow-2xl shadow-primary/20 group uppercase tracking-widest">
              Request Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 text-lg border-white/10 bg-white/5 hover:bg-white/10 w-full sm:w-auto font-bold uppercase tracking-widest">
              Speak With Specialists
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
            {[
              { text: "Cases Reviewed Worldwide" },
              { text: "Digital Asset Investigations" },
              { text: "Scam & Fraud Assessments" },
              { text: "Blockchain Intelligence" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center mb-2">
                   <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-foreground/60 text-center leading-tight">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/[0.03] rounded-full blur-[180px] -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
    </section>
  );
}