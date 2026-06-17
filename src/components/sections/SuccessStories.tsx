'use client';

import { useEffect, useState } from 'react';
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
    <section id="success-stories" className="py-24 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
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
                  <div className="flex items-center gap-4 p-6 bg-card border border-white/5 hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
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
                    <Card className="glass-card h-full hover:border-primary/50 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden flex flex-col bg-card/60">
                      <svg className="absolute top-0 right-0 opacity-10 pointer-events-none" width="60" height="60">
                        <path d="M 60 10 L 50 10 L 50 0" className="forensic-trace" />
                      </svg>
                      
                      <CardContent className="p-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-black/40 relative z-10">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-black uppercase tracking-widest text-[9px] animate-status-settle relative z-10">
                            {story.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-4 relative z-10">
                          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Case #{story.case_id}</p>
                          <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight text-white leading-tight">{story.case_type} Division</h4>
                          <p className="text-3xl font-headline font-bold text-primary tracking-tighter">{story.amount}</p>
                        </div>

                        {/* Investigation Path Visualizer */}
                        <div className="relative flex flex-col gap-6 flex-grow pt-4">
                          {/* Sequential Vertical Trace Line */}
                          <div className="absolute left-[7px] top-0 bottom-10 w-px bg-white/5 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full bg-primary h-0 group-hover:h-full transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100" />
                          </div>

                          {/* CASE to CHALLENGE connector */}
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
                               <div className="p-5 bg-white/[0.03] border border-white/5 outcome-box group-hover:border-emerald-500/30 transition-colors duration-700 delay-600">
                                 <div className="outcome-content">
                                   <p className="text-[8px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                     <CheckCircle2 className="w-3.5 h-3.5" /> Technical Outcome
                                   </p>
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
                          
                          {/* Transmission Pulse Effect */}
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
