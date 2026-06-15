import { Button } from '@/components/ui/button';

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "Share the details of your case through our secure intake process."
  },
  {
    number: "02",
    title: "Forensic Investigation",
    description: "We examine transaction records, communications, wallet activity, and available evidence."
  },
  {
    number: "03",
    title: "Recovery Strategy",
    description: "A customized recovery roadmap is developed based on investigative findings."
  },
  {
    number: "04",
    title: "Resolution & Support",
    description: "We guide you through the recovery process and provide ongoing case support."
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-muted/20 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-headline font-bold mb-8">Our 4-Step Recovery Process</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every case is different. We focus on evidence, feasibility, and transparency—not assumptions or unrealistic promises.
            </p>
            <div className="space-y-4 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm font-medium italic text-foreground/80">
                  "The goal of our process is to eliminate uncertainty. We provide you with a factual foundation before any technical recovery work begins."
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Step 1 Now
            </Button>
          </div>
          
          <div className="grid gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all">
                <div className="text-4xl font-headline font-black text-primary/20 shrink-0">
                  {step.number}
                </div>
                <div>
                  <h4 className="text-xl font-headline font-bold mb-2 tracking-tight">{step.title}</h4>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
