import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';

const signs = [
  "Your broker stopped responding",
  "Withdrawals were suddenly blocked",
  "Additional fees are required before releasing funds",
  "Account balances appear manipulated",
  "The investment platform disappeared",
  "You were encouraged to keep investing",
  "Someone you met online requested money",
  "A job offer required upfront payment",
  "You lost access to your crypto wallet",
  "You suspect funds were transferred fraudulently"
];

export function SignsSection() {
  return (
    <section className="py-24 bg-card/10 relative overflow-hidden border-y border-white/5">
      {/* Forensic Background Detail */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Risk Identification</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Signs of Active Fraud</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Online fraud often follows predictable patterns. If you recognize any of these red flags, 
              immediate forensic review is required to preserve the digital evidence trail.
            </p>
          </SectionReveal>
          
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {signs.map((sign, idx) => (
              <SectionReveal key={idx} delay={idx * 50} duration={400} className="active">
                <div className="group flex items-start gap-4 p-6 rounded-2xl bg-card/40 border border-white/5 hover:border-primary/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden">
                  {/* Subtle hover trace */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/[0.03] translate-x-full group-hover:translate-x-0 transition-transform duration-700 pointer-events-none" />
                  
                  <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-foreground/80 font-bold text-sm tracking-tight leading-relaxed group-hover:text-foreground transition-colors block">
                      {sign}
                    </span>
                    <div className="w-0 h-px bg-primary/30 group-hover:w-full transition-all duration-500 delay-100" />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="text-center">
            <div className="inline-block p-1 bg-white/5 rounded-2xl">
              <div className="p-8 md:p-12 glass-card rounded-xl border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-2xl font-headline font-bold mb-6 uppercase tracking-tight">Requires Immediate Investigation?</h4>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button size="lg" className="h-16 px-12 text-lg bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-widest group shadow-2xl shadow-primary/20">
                      Request Forensic Assessment
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-breathing" />
                      Confidential Review
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-breathing" />
                      No Assessment Fees
                    </span>
                  </div>
                </div>
                
                {/* Background trace signature */}
                <svg className="absolute bottom-0 right-0 opacity-10 pointer-events-none" width="120" height="120">
                  <path d="M 0 120 L 120 120 L 120 0" className="forensic-trace" />
                </svg>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
