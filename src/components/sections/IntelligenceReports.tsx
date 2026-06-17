'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { 
  FileText, 
  ChevronRight, 
  ArrowRight,
  Download,
  Calendar,
  Lock,
  Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const REPORTS = [
  {
    id: "LRX-INT-2024-06",
    title: "Heuristic Tracing of Mixer Obfuscation",
    category: "Technical Briefing",
    date: "June 2024",
    classification: "Restricted",
    abstract: "A clinical analysis of algorithmic de-mixing techniques and exit-node identification for assets filtered through privacy protocols.",
    topics: ["Cluster Analysis", "Heuristic Mapping", "Tornado Cash Audits"]
  },
  {
    id: "LRX-INT-2024-05",
    title: "Social Engineering in DeFi Liquidity Schemes",
    category: "Institutional Risk",
    date: "May 2024",
    classification: "Confidential",
    abstract: "Mapping the psychological grooming vectors and technical infrastructure used in coordinated decentralized finance liquidity pool fraud.",
    topics: ["Grooming Vectors", "Smart Contract Audit", "OSINT Tracking"]
  },
  {
    id: "LRX-INT-2024-04",
    title: "Hardware Vault Side-Channel Vulnerabilities",
    category: "Forensic Audit",
    date: "April 2024",
    classification: "Internal Review",
    abstract: "Analysis of side-channel attacks on legacy cold storage devices and the forensic reconstruction of corrupted mnemonic data.",
    topics: ["Key Extraction", "Mnemonic Hashing", "Hardware Bypass"]
  }
];

export function IntelligenceReports() {
  return (
    <section id="intelligence" className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      {/* Intelligence Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="briefing-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#briefing-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <SectionReveal className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Intelligence Archive</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Recovery Intelligence Reports</h3>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Monthly forensic briefings and whitepapers analyzing emerging digital asset fraud vectors, blockchain obfuscation trends, and institutional security protocols.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <div className="p-6 bg-white/[0.02] border border-white/5 flex items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-headline font-bold text-primary">120+</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Whitepapers</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-headline font-bold text-primary">Q2</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Active Cycle</span>
              </div>
            </div>
          </SectionReveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {REPORTS.map((report, idx) => (
            <SectionReveal key={report.id} delay={idx * 100} className="h-full">
              <Card className="glass-card h-full rounded-none border-white/5 hover:border-primary/50 transition-all duration-500 group flex flex-col relative overflow-hidden bg-card/60">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <FileText className="w-32 h-32" />
                </div>
                
                <CardContent className="p-10 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{report.id}</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-widest text-primary">
                      <Lock className="w-2.5 h-2.5" /> {report.classification}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{report.date} | {report.category}</span>
                    </div>
                    <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-tight">{report.title}</h4>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow italic">
                    "{report.abstract}"
                  </p>

                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {report.topics.map((topic, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-primary" /> {topic}
                        </span>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full h-12 rounded-none border-white/10 hover:bg-primary hover:text-black font-black uppercase tracking-widest text-[10px] premium-cta">
                      Request Technical Briefing <Download className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-20 p-12 glass-card rounded-none border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative">
              <Lock className="w-8 h-8 text-primary" />
              <div className="absolute inset-0 rounded-full border border-primary animate-breathing opacity-30" />
            </div>
            <div>
              <h5 className="text-xl font-headline font-bold uppercase tracking-tight text-white">Institutional Intelligence Subscription</h5>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Receive real-time forensic alerts and emerging fraud vectors.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <Link href="#forensic-intake" className="w-full md:w-auto">
              <Button size="lg" className="h-14 px-10 bg-primary text-black font-black uppercase tracking-widest rounded-none group premium-cta">
                Commence Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-50 flex items-center justify-center gap-2">
            <Activity className="w-3.5 h-3.5 text-primary" /> Technical Node Monitoring: Active 24/7/365
          </p>
        </div>
      </div>
    </section>
  );
}
