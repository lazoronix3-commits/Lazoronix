'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { supabase } from '@/lib/supabase';

export function Hero() {
  const [bgUrl, setBgUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroBg();
  }, []);

  const fetchHeroBg = async () => {
    try {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl('hero-bg.png');
      
      if (data?.publicUrl) {
        setBgUrl(`${data.publicUrl}?t=${Date.now()}`);
      }
    } catch (error) {
      setBgUrl(null);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden hero-gradient border-b border-white/5 min-h-[80vh] flex items-center">
      {/* Dynamic Background Image */}
      {bgUrl && (
        <div className="absolute inset-0 z-0 opacity-40 grayscale pointer-events-none">
          <Image 
            src={bgUrl} 
            alt="Hero Background" 
            fill 
            className="object-cover"
            priority
            onError={() => setBgUrl(null)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
        </div>
      )}

      {/* Living Intelligence Background Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="opacity-20 md:opacity-40">
          <defs>
            <pattern id="intelligence-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="0.4" fill="rgba(212, 175, 55, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intelligence-grid)" />
          <path d="M 0 150 Q 300 100 600 400 T 1200 650" className="network-line" />
          <path d="M 1200 200 Q 900 350 600 400 T 0 600" className="network-line" style={{ animationDelay: '-10s' }} />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <SectionReveal delay={100} duration={600} threshold={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[8px] md:text-[10px] font-black mb-6 md:mb-8 tracking-[0.3em] uppercase">
              <ShieldCheck className="w-3 md:w-3.5 h-3 md:h-3.5" />
              Institutional Forensic Intelligence
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-headline font-bold leading-[1] md:leading-[0.95] mb-6 md:mb-8 tracking-tighter text-white uppercase text-balance">
              Start a Confidential <br className="hidden sm:block"/>
              <span className="gradient-text italic font-medium gold-glow">Case Review.</span>
            </h1>
            
            <p className="text-sm md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium px-4 md:px-0">
              Lazoronix provides institutional-grade forensic investigation and blockchain intelligence for complex digital asset recovery. We investigate financial fraud, trace digital assets, and identify recovery paths.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8">
              <Link href="#forensic-intake" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 md:h-16 px-8 md:px-12 text-sm md:text-lg bg-primary text-black hover:bg-primary/90 font-black w-full shadow-2xl shadow-primary/20 group uppercase tracking-widest rounded-none transition-all duration-300 premium-cta">
                  Begin Case Assessment
                  <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="mailto:investigator@lazoronix.com" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 md:h-16 px-8 md:px-12 text-sm md:text-lg border-white/10 bg-white/5 hover:bg-white/10 w-full font-bold uppercase tracking-widest rounded-none">
                  <Mail className="mr-2 w-4 h-4" /> Email a Recovery Specialist
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-60">
               <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Confidential case enquiries
               </div>
               <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Secure submission
               </div>
               <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Human specialist review
               </div>
            </div>
          </SectionReveal>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-primary/[0.03] rounded-full blur-[120px] md:blur-[180px] -z-10" />
    </section>
  );
}
