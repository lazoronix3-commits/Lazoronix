import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, FileSearch, ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden hero-gradient border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-secondary text-sm font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <ShieldCheck className="w-4 h-4" />
            Institutional Grade Forensic Recovery & Intelligence
          </div>
          
          <h1 className="text-5xl md:text-8xl font-headline font-bold leading-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 tracking-tight">
            Recovering From Financial Fraud <br/>
            <span className="gradient-text italic">Starts With The Right Investigation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Whether you've been affected by a forex scam, investment fraud, romance scam, job scam, loan scam, or lost access to digital assets, our specialists help identify recovery pathways through forensic investigation and blockchain intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 font-bold w-full sm:w-auto shadow-2xl shadow-primary/20 group">
              Get My Free Case Review
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-white/10 bg-white/5 hover:bg-white/10 w-full sm:w-auto font-bold">
              Speak With a Specialist
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
            {[
              { text: "Cases Reviewed Worldwide" },
              { text: "Digital Asset Investigations" },
              { text: "Scam & Fraud Assessments" },
              { text: "Blockchain Intelligence" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                   <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-foreground/70 text-center leading-tight">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[160px] -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
    </section>
  );
}
