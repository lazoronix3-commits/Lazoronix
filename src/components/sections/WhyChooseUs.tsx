import { Search, Shield, Eye, Database, Cpu, Lock, FileSearch } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Blockchain Intelligence",
    description: "Advanced tracing and transaction analysis using industry-leading forensic tools.",
    icon: Database
  },
  {
    title: "Financial Fraud Investigation",
    description: "Rigorous evidence collection and professional scam assessment to build your case.",
    icon: FileSearch
  },
  {
    title: "Digital Asset Expertise",
    description: "Specialized wallet, exchange, and blockchain investigations led by technical experts.",
    icon: Cpu
  },
  {
    title: "Confidential Process",
    description: "Your sensitive information remains protected through encrypted communication and strict protocols.",
    icon: Lock
  },
  {
    title: "Transparent Guidance",
    description: "No unrealistic promises. We provide evidence-based recommendations and clear recovery roadmaps.",
    icon: Eye
  },
  {
    title: "Specialist Support",
    description: "Dedicated investigative experts assigned to evaluate every nuance of your specific situation.",
    icon: Search
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">Authority & Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6">Why Clients Choose Lazoronix</h3>
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
