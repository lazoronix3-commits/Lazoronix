
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, TrendingUp, ShieldCheck, Wallet, Landmark, Search, Database, Lock, Fingerprint, Activity, FileSearch, Loader2, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

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
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Forensic Records</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white uppercase tracking-tighter">Areas of Forensic Expertise</h3>
            <p className="text-muted-foreground text-lg mb-8">
              Every recovery case is handled with institutional rigor, focusing on the preservation of digital evidence and technical pathways.
            </p>
            <div className="p-8 bg-white/[0.02] border-l-2 border-primary italic text-sm text-foreground/80 uppercase tracking-widest leading-relaxed">
              "We prioritize evidence over promises. Our resolutions are the result of technical precision and rigorous investigative methodologies."
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertise.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-6 bg-card border border-white/5 hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-headline font-bold text-xs tracking-widest uppercase text-white">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-8 text-center lg:text-left">Example Case Resolutions</h4>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Retrieving Records...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">No public resolutions currently available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {stories.map((story) => {
                const Icon = iconMap[story.icon_name] || TrendingUp;
                return (
                  <Card key={story.id} className="glass-card hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] rounded-full blur-3xl -mr-16 -mt-16" />
                    <CardContent className="p-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-black uppercase tracking-widest text-[9px]">
                          {story.status}
                        </Badge>
                      </div>
                      
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Case #{story.case_id}</p>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight text-white">{story.case_type}</h4>
                      <p className="text-3xl font-headline font-bold text-primary mb-6">{story.amount}</p>
                      
                      <div className="p-6 bg-white/[0.03] border border-white/5 mb-8">
                         <p className="text-[9px] font-black uppercase tracking-widest text-foreground/50 mb-4 flex items-center gap-2">
                           <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Forensic Narrative
                         </p>
                         <p className="text-[11px] text-muted-foreground leading-relaxed italic uppercase tracking-widest">
                           "{story.narrative}"
                         </p>
                      </div>

                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Case Resolution
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
           <p className="text-[10px] text-muted-foreground max-w-2xl mx-auto italic uppercase tracking-[0.2em]">
             Technical Note: Case resolutions represent historical forensic records. All scenarios are unique and subject to technical variables.
           </p>
        </div>
      </div>
    </section>
  );
}
