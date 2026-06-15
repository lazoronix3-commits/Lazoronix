import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const problems = [
  "Lost wallet access",
  "Forgotten recovery credentials",
  "Wallet migration issues",
  "Transaction tracing requirements",
  "Ownership verification",
  "Security incidents",
  "Complex blockchain investigations"
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden glass-card">
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="p-8 md:p-16 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="inline-flex items-center gap-2 text-primary font-bold mb-6">
                <AlertCircle className="w-5 h-5" />
                <span>CRITICAL WINDOW</span>
              </div>
              <h2 className="text-4xl font-headline font-bold mb-6 leading-tight">When Access Is Lost, <br/>Time Matters</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Digital asset recovery cases can quickly become more complex when recovery attempts are made without proper forensic investigation.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                Request Expert Case Review
              </Button>
            </div>
            
            <div className="p-8 md:p-16 border-l border-white/5">
              <h3 className="text-xl font-headline font-bold mb-8">Specialized Assistance For:</h3>
              <ul className="space-y-4">
                {problems.map((problem, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
