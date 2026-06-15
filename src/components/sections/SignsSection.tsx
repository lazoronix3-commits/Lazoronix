import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-6">Signs You May Be a Victim of Fraud</h2>
            <p className="text-muted-foreground text-lg">
              Online fraud often follows predictable patterns. If you recognize any of these red flags, 
              immediate action is required to evaluate recovery options.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
            {signs.map((sign, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-foreground/90 font-medium">{sign}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 font-bold group">
              Request an Investigation
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Confidential forensic review. No upfront fees for the initial feasibility assessment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
