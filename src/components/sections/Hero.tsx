'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden hero-gradient border-b border-white/5">
      {/* Living Intelligence Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Layer 1: Atmospheric Floating Metrics */}
        <div className="absolute top-[10%] left-[5%] opacity-[0.03] text-[7px] md:text-[9px] font-black uppercase tracking-[0.5em] text-primary animate-slow-float">
          Forensic Analysis
        </div>
        <div className="absolute top-[55%] left-[2%] opacity-[0.02] text-[7px] md:text-[9px] font-black uppercase tracking-[0.5em] text-primary animate-slow-float" style={{ animationDelay: '-15s' }}>
          Blockchain Intelligence
        </div>
        <div className="absolute top-[20%] right-[10%] opacity-[0.03] text-[7px] md:text-[9px] font-black uppercase tracking-[0.5em] text-primary animate-slow-float" style={{ animationDelay: '-8s' }}>
          Case Review
        </div>
        <div className="absolute bottom-[15%] right-[5%] opacity-[0.02] text-[7px] md:text-[9px] font-black uppercase tracking-[0.5em] text-primary animate-slow-float" style={{ animationDelay: '-22s' }}>
          Asset Tracing
        </div>

        {/* Layer 2: Intelligence Grid & Trace Patterns */}
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="opacity-20 md:opacity-40">
          <defs>
            <pattern id="intelligence-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="0.4" fill="rgba(212, 175, 55, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intelligence-grid)" />
          
          <path d="M 0 150 Q 300 100 600 400 T 1200 650" className="network-line" />
          <path d="M 1200 200 Q 900 350 600 400 T 0 600" className="network-line" style={{ animationDelay: '-10s' }} />
          
          <g className="active">
            <path d="M 100 100 L 150 100 L 150 200" className="forensic-trace" style={{ animationDelay: '0.5s' }} />
            <circle cx="100" cy="100" r="1.5" className="network-node" />
            <circle cx="150" cy="200" r="1.5" className="network-node" />
          </g>
          
          <path d="M 0 150 Q 300 100 600 400 T 1200 650" className="pulse-line" />
          
          <circle cx="600" cy="400" r="1.5" className="network-node" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <SectionReveal delay={100} duration={600} threshold={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[8px] md:text-[10px] font-black mb-6 md:mb-8 tracking-[0.3em] uppercase">
              <ShieldCheck className="w-3 md:w-3.5 h-3 md:h-3.5" />
              Institutional Forensic Intelligence
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-headline font-bold leading-[1] md:leading-[0.95] mb-6 md:mb-8 tracking-tighter text-white uppercase text-balance">
              Investigative Rigor. <br className="hidden sm:block"/>
              <span className="gradient-text italic font-medium gold-glow">Asset Resolution.</span>
            </h1>
            
            <p className="text-sm md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium px-4 md:px-0">
              Lazoronix provides institutional-grade forensic investigation and blockchain intelligence for complex digital asset recovery. We investigate financial fraud, trace digital assets, and identify recovery pathways.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
              <Link href="#forensic-intake" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 md:h-16 px-8 md:px-12 text-sm md:text-lg bg-primary text-black hover:bg-primary/90 font-black w-full shadow-2xl shadow-primary/20 group uppercase tracking-widest rounded-none transition-all duration-300 premium-cta">
                  Commence Investigation
                  <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#forensic-intake" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 md:h-16 px-8 md:px-12 text-sm md:text-lg border-white/10 bg-white/5 hover:bg-white/10 w-full font-bold uppercase tracking-widest rounded-none">
                  Consult Specialist
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-10 md:pt-16 border-t border-white/5">
              {[
                { text: "Worldwide Cases", value: "1,200+" },
                { text: "Assets Traced", value: "$420M+" },
                { text: "Resolution Path", value: "High-Feasibility" },
                { text: "Forensic Analysts", value: "Senior Tier" }
              ].map((item, idx) => (
                <SectionReveal key={idx} delay={400 + (idx * 100)} className="active">
                  <div className="flex flex-col items-center gap-1 md:gap-2 group cursor-default">
                    <span className="text-xl md:text-2xl font-headline font-bold text-primary tracking-tighter group-hover:gold-glow transition-all duration-500">{item.value}</span>
                    <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.25em] text-foreground/40 text-center leading-tight">
                      {item.text}
                    </span>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-primary/[0.03] rounded-full blur-[120px] md:blur-[180px] -z-10" />
    </section>
  );
}
