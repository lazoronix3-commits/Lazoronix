'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { Globe, Activity, ShieldCheck, Zap } from 'lucide-react';

const investigationNodes = [
  { coords: { x: '25%', y: '35%' } },
  { coords: { x: '48%', y: '28%' } },
  { coords: { x: '58%', y: '42%' } },
  { coords: { x: '78%', y: '58%' } },
  { coords: { x: '88%', y: '75%' } },
  { coords: { x: '15%', y: '60%' } },
  { coords: { x: '40%', y: '70%' } },
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
                Universal Coverage
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 uppercase tracking-tighter leading-tight">
                Global <br />
                <span className="text-primary italic font-medium gold-glow">Forensic Reach.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                Our investigative capability is not restricted by geography. We operate across all international financial jurisdictions, maintaining active forensic monitoring across the global blockchain network and decentralized corridors.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Cross-Border Protocols", desc: "Active in 190+ jurisdictions", icon: ShieldCheck },
                  { title: "Universal Node Access", desc: "Unrestricted blockchain monitoring", icon: Zap },
                  { title: "Real-time Intelligence", desc: "Global asset flow tracking", icon: Activity }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 flex items-start gap-4 hover:border-primary/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">{item.title}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          <div className="lg:w-2/3 w-full">
            <SectionReveal delay={200} className="relative aspect-[16/9] bg-card/40 border border-white/5 rounded-none overflow-hidden shadow-2xl">
              {/* Simplified World Map SVG */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20 grayscale" xmlns="http://www.w3.org/2000/svg">
                <rect width="1000" height="500" fill="url(#grid-pattern)" />
                <defs>
                  <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
              </svg>

              {/* Pulsing Nodes */}
              {investigationNodes.map((node, idx) => (
                <div 
                  key={idx} 
                  className="absolute"
                  style={{ left: node.coords.x, top: node.coords.y }}
                >
                  <div className="relative">
                    {/* Outer Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-primary/20 animate-breathing" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/10 animate-breathing" style={{ animationDelay: '1s' }} />
                    
                    {/* Core Pulse */}
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(212,175,55,0.8)] relative z-10" />
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
