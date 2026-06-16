import { CheckCircle2, TrendingUp, ShieldCheck, Wallet, Landmark, Search, Database, Lock, Fingerprint, Activity, FileSearch } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const expertise = [
  { title: "Blockchain Investigations", icon: Database },
  { title: "Asset Tracing", icon: TrendingUp },
  { title: "Scam Analysis", icon: Search },
  { title: "Wallet Recovery", icon: Wallet },
  { title: "Evidence Preservation", icon: Lock },
  { title: "Digital Forensics", icon: Fingerprint }
];

const stories = [
  {
    caseId: "LRX-41209",
    type: "Forex Fraud Recovery",
    amount: "$84,200",
    status: "Recovered",
    icon: TrendingUp,
    narrative: "Targeted fund tracing across three offshore jurisdictions. Successfully identified the ultimate beneficiary through advanced blockchain analysis and legal intercession."
  },
  {
    caseId: "LRX-77124",
    type: "Investment Scam Recovery",
    amount: "$210,000",
    status: "Recovered",
    icon: Landmark,
    narrative: "Forensic identification of liquidity pool vulnerabilities used by a fraudulent investment platform. Coordinated asset freezing with international exchange partners."
  },
  {
    caseId: "LRX-99382",
    type: "Wallet Access Recovery",
    amount: "4.2 BTC",
    status: "Restored",
    icon: Wallet,
    narrative: "Technical data extraction from a corrupted hardware device. Successfully reconstructed the encrypted volume and verified seed integrity for complete asset restoration."
  }
];

export function SuccessStories() {
  return (
    <section id="success-stories" className="py-24 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          <div className="max-w-xl">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">Forensic Records</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6">Areas of Forensic Expertise</h3>
            <p className="text-muted-foreground text-lg mb-8">
              Every recovery case is handled with institutional rigor, focusing on the preservation of digital evidence and the identification of technical recovery pathways.
            </p>
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 italic text-sm text-foreground/80">
              "We prioritize evidence over promises. Our case resolutions are the result of technical precision and rigorous investigative methodologies."
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertise.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-headline font-bold text-sm tracking-tight">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-8 text-center lg:text-left">Example Case Resolutions</h4>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, idx) => (
              <Card key={idx} className="glass-card hover:border-primary/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <story.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5 font-bold uppercase tracking-widest text-[10px]">
                      {story.status}
                    </Badge>
                  </div>
                  
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Case #{story.caseId}</p>
                  <h4 className="text-xl font-headline font-bold mb-2">{story.type}</h4>
                  <p className="text-3xl font-headline font-bold text-primary mb-6">{story.amount}</p>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                     <p className="text-xs font-bold text-foreground/70 mb-2 flex items-center gap-2">
                       <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Forensic Narrative
                     </p>
                     <p className="text-xs text-muted-foreground leading-relaxed italic">
                       "{story.narrative}"
                     </p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Case Resolution
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
           <p className="text-sm text-muted-foreground max-w-2xl mx-auto italic">
             Disclaimer: These case resolutions represent historical forensic records. Every digital asset recovery scenario is unique and subject to technical, legal, and jurisdictional variables.
           </p>
        </div>
      </div>
    </section>
  );
}