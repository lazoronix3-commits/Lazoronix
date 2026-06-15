import { Search, Shield, Eye, Database, Cpu, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Blockchain Intelligence",
    description: "Advanced transaction tracing and blockchain analytics to identify asset movement patterns and leads.",
    icon: Database
  },
  {
    title: "Digital Forensics",
    description: "Structured examination of wallet data, devices, backups, account records, and recovery evidence.",
    icon: Cpu
  },
  {
    title: "Confidential Process",
    description: "Sensitive information is handled through secure channels with strict confidentiality standards.",
    icon: Lock
  },
  {
    title: "Transparent Assessments",
    description: "Clear explanations of recovery feasibility, risks, limitations, and potential next steps.",
    icon: Eye
  },
  {
    title: "Specialist-Led Reviews",
    description: "Your case is evaluated by professionals experienced in digital assets and forensic investigation.",
    icon: Search
  },
  {
    title: "Security-First Methodology",
    description: "Every engagement follows strict operational security procedures designed to protect client data.",
    icon: Shield
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">Technical Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6">Investigative Precision</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlike generic recovery services, every Lazoronix case begins with evidence collection, technical verification, and forensic analysis.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="glass-card hover:border-primary/50 transition-colors group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-headline font-bold mb-4">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
