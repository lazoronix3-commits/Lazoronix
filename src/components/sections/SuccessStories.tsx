import { CheckCircle2, TrendingUp, ShieldCheck, Wallet, Landmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <section id="success-stories" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">Case Resolutions</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6">Proven Forensic Outcomes</h3>
            <p className="text-muted-foreground text-lg">
              We provide technical evidence of our capabilities through the successful resolution of complex asset recovery challenges.
            </p>
          </div>
          <div className="hidden lg:block">
             <div className="flex gap-12 items-center p-6 glass-card rounded-2xl border-white/5">
                <div className="text-center">
                   <p className="text-2xl font-headline font-bold text-primary">$15M+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assets Traced</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                   <p className="text-2xl font-headline font-bold text-primary">400+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cases Closed</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                   <p className="text-2xl font-headline font-bold text-primary">94%</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Viability</p>
                </div>
             </div>
          </div>
        </div>
        
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

        <div className="mt-16 text-center">
           <p className="text-sm text-muted-foreground max-w-2xl mx-auto italic">
             Disclaimer: These case studies represent historical outcomes. Every digital asset recovery case is unique and subject to technical, legal, and jurisdictional variables.
           </p>
        </div>
      </div>
    </section>
  );
}
