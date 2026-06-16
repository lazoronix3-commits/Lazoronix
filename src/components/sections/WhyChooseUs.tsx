import { Database, TrendingUp, Lock, Search, ShieldCheck, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Blockchain Intelligence",
    description: "Transaction tracing and digital asset analysis.",
    icon: Database
  },
  {
    title: "Financial Fraud Expertise",
    description: "Assessment of investment and scam-related losses.",
    icon: TrendingUp
  },
  {
    title: "Confidential Investigations",
    description: "Strict privacy and secure handling of information.",
    icon: Lock
  },
  {
    title: "Evidence-Based Approach",
    description: "Recommendations grounded in facts, not assumptions.",
    icon: Search
  },
  {
    title: "Security-Focused Process",
    description: "Protection of sensitive information throughout engagement.",
    icon: ShieldCheck
  },
  {
    title: "Professional Support",
    description: "Dedicated specialists guiding every case.",
    icon: UserCheck
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em] mb-4">Institutional Credibility</h2>
          <h3 className="text-4xl md:text-6xl font-headline font-bold mb-8">Why Clients Choose Lazoronix</h3>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Our firm bridges the gap between digital asset technical complexity and professional investigative rigor, providing a structured pathway to case resolution.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className="glass-card hover:border-primary/50 transition-all duration-500 group bg-card/30 border-white/5 shadow-2xl shadow-black/20">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-2xl font-headline font-bold mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-12 opacity-50 grayscale contrast-125 pointer-events-none">
           <div className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-4">
             <ShieldCheck className="w-5 h-5 text-primary" />
             ISO-Aligned Protocols
           </div>
           <div className="hidden md:block w-px h-6 bg-white/10" />
           <div className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-4">
             <Lock className="w-5 h-5 text-primary" />
             AES-256 Data Integrity
           </div>
           <div className="hidden md:block w-px h-6 bg-white/10" />
           <div className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-4">
             <Database className="w-5 h-5 text-primary" />
             Full Chain-of-Custody
           </div>
        </div>
      </div>
    </section>
  );
}
