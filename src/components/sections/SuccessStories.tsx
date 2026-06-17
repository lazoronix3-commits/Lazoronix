'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Wallet, 
  Landmark, 
  Search, 
  Database, 
  Lock, 
  Fingerprint, 
  Activity, 
  Loader2, 
  Briefcase,
  Target,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { SectionReveal } from '@/components/ui/section-reveal';

const iconMap: Record<string, any> = {
  TrendingUp,
  Landmark,
  Wallet,
  Briefcase,
  Search,
  Database
};

type Story = {
  id: string;
  case_id: string;
  case_type: string;
  amount: string;
  status: string;
  challenge: string;
  focus: string;
  outcome: string;
  narrative: string;
  icon_name: string;
};

const expertise = [
  { title: "Blockchain Investigations", icon: Database },
  { title: "Asset Tracing", icon: TrendingUp },
  { title: "Scam Analysis", icon: Search },
  { title: "Wallet Recovery", icon: Wallet },
  { title: "Evidence Preservation", icon: Lock },
  { title: "Digital Forensics", icon: Fingerprint }
];

/**
 * AnimatedAmount - Clinical count-up for financial values.
 * Runs once for 1000ms.
 */
function AnimatedAmount({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('$0');
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const startAnimation = () => {
    const numericTarget = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericTarget)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1000;
    const startTime = performance.now();
    const currencySymbol = value.startsWith('$') ? '$' : '';

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * numericTarget);

      setDisplayValue(`${currencySymbol}${currentCount.toLocaleString()}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  return (
    <div ref={countRef} className="text-3xl font-headline font-bold text-primary tracking-tighter">
      {displayValue}
    </div>
  );
}

export function SuccessStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Failed to fetch resolutions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="success-stories" className="py-24 bg-background overflow-hidden border-t border-white/5 relative">
      {/* Intelligence Network Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network-pattern" width="240" height="240" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" className="network-node" />
              <circle cx="220" cy="20" r="1.5" className="network-node" />
              <circle cx="220" cy="220" r="1.5" className="network-node" />
              <circle cx="20" cy="220" r="1.5" className="network-node" />
              <circle cx="120" cy="120" r="1.5" className="network-node" />
              <path d="M 20 20 L 220 20 M 220 20 L 220 220 M 220 220 L 20 220 M 20 220 L 20 20" className="network-line" />
              <path d="M 20 20 L 120 120 L 220 220" className="network-line" />
              <path d="M 220 20 L 120 120 L 20 220" className="network-line" />
              <path d="M 120 0 L 120 240" className="network-line" strokeDasharray="5 15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-pattern)" />
          <path d="M -100 300 Q 500 150 1100 300" className="pulse-line" />
          <path d="M 1200 200 Q 700 450 -100 200" className="pulse-line" style={{ animationDelay: '-15s' }} />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          <div className="max-w-xl">
            <SectionReveal>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Forensic Records</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white uppercase tracking-tighter">Institutional Case Insights</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Objective technical outcomes derived from institutional investigative methodologies. We lead with evidence, not promises.
              </p>
              <div className="p-8 bg-white/[0.02] border-l-2 border-primary italic text-sm text-foreground/80 uppercase tracking-widest leading-relaxed">
                "Our resolutions are the measurable output of technical precision and rigorous fund obfuscation tracing."
              </div>
            </SectionReveal>
          </div>
          
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertise.map((item, idx) => (
                <SectionReveal key={idx} delay={idx * 50} className="active">
                  <div className="flex items-center gap-4 p-6 bg-card border border-white/5 hover:border-primary/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-headline font-bold text-xs tracking-widest uppercase text-white">{item.title}</span>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <SectionReveal className="text-center lg:text-left mb-12">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Departmental Resolutions</h4>
          </SectionReveal>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Retrieving Forensic Node Records...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">No public resolutions currently initialized</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, idx) => {
                const Icon = iconMap[story.icon_name] || TrendingUp;
                return (
                  <SectionReveal key={story.id} delay={idx * 100} className="active h-full">
                    <Card className="glass-card h-full transition-all duration-500 group relative overflow-hidden flex flex-col bg-card/60 border-white/5 hover:bg-card/80 hover:border-primary/40">
                      
                      {/* Investigation Heat Signature */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden -z-10">
                        <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] bg-primary/20 rounded-full blur-[100px] animate-slow-float" />
                        <div className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] bg-primary/10 rounded-full blur-[120px] animate-slow-float" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
                      </div>

                      {/* Clinical Evidence Scan Line */}
                      <div 
                        className="evidence-scan-line" 
                        style={{ animationDelay: `${(idx * 3.5) % 12}s` }}
                      />
                      
                      <svg className="absolute top-0 right-0 opacity-10 pointer-events-none" width="60" height="60">
                        <path d="M 60 10 L 50 10 L 50 0" className="forensic-trace" />
                      </svg>
                      
                      <CardContent className="p-10 flex flex-col h-full relative z-10">
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-black/40 relative z-10 transition-all duration-500 group-hover:rotate-[5deg] group-hover:border-primary/50">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-black uppercase tracking-widest text-[9px] animate-status-settle relative z-10">
                            {story.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-4 relative z-10">
                          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1 transition-all duration-500 group-hover:text-primary group-hover:gold-glow">Case #{story.case_id}</p>
                          <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight text-white leading-tight">{story.case_type} Division</h4>
                          <AnimatedAmount value={story.amount} />
                        </div>

                        <div className="relative flex flex-col gap-6 flex-grow pt-4">
                          <div className="absolute left-[7px] top-0 bottom-10 w-px bg-white/5 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full bg-primary h-0 group-hover:h-full transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100" />
                          </div>

                          <div className="absolute left-[7px] top-[-10px] h-4 w-px bg-white/5 overflow-hidden">
                             <div className="w-full h-full bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100" />
                          </div>

                          <div className="space-y-6 relative pl-6">
                             <div className="space-y-2 relative">
                               <div className="absolute left-[-23px] top-[6px] w-2 h-2 rounded-full border border-white/20 bg-background z-20 group-hover:border-primary group-hover:shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300 delay-200" />
                               <p className="text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gold-glow transition-all duration-500 delay-200">
                                 <ShieldCheck className="w-3.5 h-3.5" /> Technical Challenge
                               </p>
                               <p className="text-[11px] text-foreground/80 font-bold uppercase tracking-wide leading-relaxed">
                                 {story.challenge}
                               </p>
                             </div>

                             <div className="space-y-2 relative">
                               <div className="absolute left-[-23px] top-[6px] w-2 h-2 rounded-full border border-white/20 bg-background z-20 group-hover:border-primary group-hover:shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300 delay-400" />
                               <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 group-hover:text-primary transition-colors duration-500 delay-400">
                                 <Target className="w-3.5 h-3.5" /> Investigative Focus
                               </p>
                               <p className="text-[11px] text-foreground/60 font-medium uppercase tracking-wide leading-relaxed">
                                 {story.focus}
                               </p>
                             </div>

                             <div className="relative pt-2">
                               <div className="absolute left-[-23px] top-[14px] w-2 h-2 rounded-full border border-white/20 bg-background z-20 group-hover:border-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all duration-300 delay-600" />
                               <div className="p-5 bg-white/[0.03] border border-white/5 outcome-box group-hover:border-emerald-500/50 group-hover:bg-emerald-500/[0.05] transition-all duration-500">
                                 <div className="outcome-content">
                                   <div className="flex items-center gap-2 mb-1">
                                      <svg 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="3" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="w-3.5 h-3.5 text-emerald-500 verified-check-svg"
                                      >
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                      <p className="text-[8px] font-black uppercase tracking-widest text-emerald-500">VERIFIED RESOLUTION</p>
                                   </div>
                                   <p className="text-[11px] text-white font-black uppercase tracking-widest leading-relaxed">
                                     {story.outcome}
                                   </p>
                                 </div>
                               </div>
                             </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 relative overflow-hidden">
                          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                            <Fingerprint className="w-3 h-3 shrink-0" />
                            <span className="relative">Verified Resolution Stream</span>
                          </div>
                          
                          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
                             <div className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent animate-stream-pulse" />
                             <div className="absolute top-0 h-full w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-stream-pulse" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SectionReveal>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
           <SectionReveal>
             <p className="text-[9px] text-muted-foreground max-w-2xl mx-auto italic uppercase tracking-[0.2em] leading-relaxed">
               Investigative Note: Forensic records represent confirmed technical outcomes. Every scenario is subject to specific digital evidence integrity variables.
             </p>
           </SectionReveal>
        </div>
      </div>
    </section>
  );
}