
'use client';

import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden hero-gradient border-b border-white/5">
      {/* Living Intelligence Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
          <defs>
            <pattern id="intelligence-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="0.4" fill="rgba(212, 175, 55, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intelligence-grid)" />
          
          {/* Connection Lines - Sparse & Slow */}
          <path d="M 0 150 Q 300 100 600 400 T 1200 650" className="network-line" />
          <path d="M 1200 200 Q 900 350 600 400 T 0 600" className="network-line" style={{ animationDelay: '-10s' }} />
          <path d="M 400 0 Q 600 300 400 800" className="network-line" style={{ animationDuration: '100s' }} />
          <path d="M 800 0 Q 600 500 800 800" className="network-line" style={{ animationDuration: '120s' }} />
          
          {/* Forensic Trace Signature Lines */}
          <g className="active">
            <path d="M 100 100 L 150 100 L 150 200" className="forensic-trace" style={{ animationDelay: '0.5s' }} />
            <circle cx="100" cy="100" r="1.5" className="network-node" />
            <circle cx="150" cy="200" r="1.5" className="network-node" />
            
            <path d="M 1000 600 L 1050 600 L 1050 500 L 1150 500" className="forensic-trace" style={{ animationDelay: '1.2s' }} />
            <circle cx="1000" cy="600" r="1.5" className="network-node" />
            <circle cx="1150" cy="500" r="1.5" className="network-node" />
          </g>
          
          {/* Traveling Pulses - High Precision */}
          <path d="M 0 150 Q 300 100 600 400 T 1200 650" className="pulse-line" />
          <path d="M 1200 200 Q 900 350 600 400 T 0 600" className="pulse-line" style={{ animationDelay: '-25s' }} />
          
          {/* Strategic Nodes - Barely Pulsing */}
          <circle cx="600" cy="400" r="1.5" className="network-node" />
          <circle cx="300" cy="100" r="1.2" className="network-node" style={{ animationDelay: '-5s' }} />
          <circle cx="900" cy="350" r="1.2" className="network-node" style={{ animationDelay: '-8s' }} />
          <circle cx="200" cy="600" r="1.2" className="network-node" style={{ animationDelay: '-12s' }} />
          <circle cx="1000" cy="650" r="1.2" className="network-node" style={{ animationDelay: '-15s' }} />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <SectionReveal delay={100} duration={600} threshold={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black mb-8 tracking-[0.3em] uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Institutional Forensic Intelligence
            </div>
            
            <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.95] mb-8 tracking-tighter text-white uppercase">
              Investigative Rigor. <br/>
              <span className="gradient-text italic font-medium gold-glow">Asset Resolution.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Lazoronix provides institutional-grade forensic investigation and blockchain intelligence for complex digital asset recovery. We identify definitive recovery pathways for victims of investment fraud.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button size="lg" className="h-16 px-12 text-lg bg-primary text-black hover:bg-primary/90 font-black w-full sm:w-auto shadow-2xl shadow-primary/20 group uppercase tracking-widest rounded-none transition-all duration-300">
                Request Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-lg border-white/10 bg-white/5 hover:bg-white/10 w-full sm:w-auto font-bold uppercase tracking-widest rounded-none">
                Speak With Specialists
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-white/5">
              {[
                { text: "Worldwide Cases", value: "1,200+" },
                { text: "Assets Traced", value: "$420M+" },
                { text: "Success Rate", value: "High-Feasibility Only" },
                { text: "Forensic Analysts", value: "Senior Tier" }
              ].map((item, idx) => (
                <SectionReveal key={idx} delay={400 + (idx * 100)} className="active">
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                    <span className="text-2xl font-headline font-bold text-primary tracking-tighter group-hover:gold-glow transition-all duration-500">{item.value}</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-foreground/40 text-center leading-tight">
                      {item.text}
                    </span>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
      
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/[0.03] rounded-full blur-[180px] -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
    </section>
  );
}
