'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { Globe, MapPin, Activity, ShieldCheck } from 'lucide-react';

const investigationHubs = [
  { name: 'New York', coords: { x: '25%', y: '35%' }, region: 'North America' },
  { name: 'London', coords: { x: '48%', y: '28%' }, region: 'Europe' },
  { name: 'Dubai', coords: { x: '58%', y: '42%' }, region: 'Middle East' },
  { name: 'Singapore', coords: { x: '78%', y: '58%' }, region: 'Asia Pacific' },
  { name: 'Sydney', coords: { x: '88%', y: '75%' }, region: 'Oceania' },
];

export function GlobalIntelligence() {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/[0.02] rounded-full blur-[160px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black mb-6 tracking-[0.3em] uppercase">
                <Globe className="w-3 h-3" />
                Global Capability
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 uppercase tracking-tighter leading-tight">
                Forensic <br />
                <span className="text-primary italic font-medium gold-glow">Intelligence Hubs.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                Our investigative reach extends across key global financial jurisdictions. We maintain active forensic monitoring in major blockchain nodes and asset flow corridors.
              </p>
              
              <div className="space-y-6">
                {investigationHubs.map((hub, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 group hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-breathing" />
                      <span className="font-headline font-bold text-xs uppercase tracking-widest text-white group-hover:text-primary transition-colors">{hub.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{hub.region}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-white/[0.02] border border-white/5 rounded-none flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">Institutional Sovereignty</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Active Cross-Border Protocols</p>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="lg:w-2/3 w-full">
            <SectionReveal delay={200} className="relative aspect-[16/9] bg-card/40 border border-white/5 rounded-none overflow-hidden shadow-2xl">
              {/* Simplified World Map SVG */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20 grayscale" xmlns="http://www.w3.org/2000/svg">
                <path d="M164,152c-1.5-1.1-2.6-3.1-4.1-4c-1.6-0.9-3.7-0.9-5.1-2.1c-1.3-1.2-2.3-3.1-3.6-4.3c-1.4-1.2-3.1-2-4.1-3.6 c-0.9-1.5-0.9-3.6-2.1-5.1c-1.2-1.3-3.1-2.3-4.3-3.6c-1.2-1.4-2-3.1-3.6-4.1c-1.5-0.9-3.6-0.9-5.1-2.1c-1.3-1.2-2.3-3.1-3.6-4.3 c-1.4-1.2-3.1-2-4.1-3.6c-0.9-1.5-0.9-3.6-2.1-5.1c-1.2-1.3-3.1-2.3-4.3-3.6c-1.2-1.4-2-3.1-3.6-4.1c-1.5-0.9-3.6-0.9-5.1-2.1" fill="currentColor" />
                {/* Visual Placeholder Map - In a real app we'd use a full GeoJSON map or a high-res SVG */}
                <rect width="1000" height="500" fill="url(#grid-pattern)" />
                <defs>
                  <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
              </svg>

              {/* Pulsing Nodes */}
              {investigationHubs.map((hub, idx) => (
                <div 
                  key={idx} 
                  className="absolute group"
                  style={{ left: hub.coords.x, top: hub.coords.y }}
                >
                  <div className="relative">
                    {/* Outer Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-primary/20 animate-breathing" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/10 animate-breathing" style={{ animationDelay: '1s' }} />
                    
                    {/* Core Pulse */}
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(212,175,55,0.8)] relative z-10" />
                    
                    {/* Label */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{hub.name}</p>
                      <p className="text-[8px] text-muted-foreground uppercase tracking-widest leading-none">Intelligence Active</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Heatmap Trace Lines - Artistic representation of global data flow */}
              <svg className="absolute inset-0 pointer-events-none opacity-10" width="100%" height="100%">
                <path d="M 250 175 Q 400 100 480 140" className="forensic-trace active" />
                <path d="M 480 140 Q 550 140 580 210" className="forensic-trace active" style={{ animationDelay: '1s' }} />
                <path d="M 580 210 Q 700 300 780 290" className="forensic-trace active" style={{ animationDelay: '2s' }} />
                <path d="M 780 290 Q 850 350 880 375" className="forensic-trace active" style={{ animationDelay: '3s' }} />
              </svg>

              <div className="absolute bottom-6 left-6 flex items-center gap-4 bg-black/60 backdrop-blur-sm border border-white/5 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-breathing" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Live Intelligence Stream</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                  <Activity className="w-3 h-3 text-primary" />
                  Latency: 14ms
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
