import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, FileSearch, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden hero-gradient">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-sm font-medium mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <ShieldCheck className="w-4 h-4" />
            Specialized Forensic Recovery & Investigation
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Lost Money to a Scam or <br/>
            <span className="gradient-text">Locked Out of Your Crypto Wallet?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Our investigators and recovery specialists help victims of forex scams, investment fraud, romance scams, fake job offers, loan scams, and wallet access issues understand their recovery options through a confidential forensic assessment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button size="lg" className="h-16 px-8 text-lg bg-primary hover:bg-primary/90 font-bold w-full sm:w-auto">
              Get My Free Case Review
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 w-full sm:w-auto">
              Speak With a Specialist
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
            {[
              { icon: Lock, text: "Secure encrypted case submission" },
              { icon: ShieldCheck, text: "Confidential review by specialists" },
              { icon: FileSearch, text: "Recovery feasibility assessment" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
