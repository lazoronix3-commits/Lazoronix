import { Database, TrendingUp, Lock, Search, ShieldCheck, UserCheck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Blockchain Intelligence",
    description: "Advanced transaction tracing and digital asset flow analysis.",
    icon: Database
  },
  {
    title: "Forensic Expertise",
    description: "Assessment of complex investment and scam-related losses.",
    icon: TrendingUp
  },
  {
    title: "Confidentiality Protocols",
    description: "Strict privacy frameworks and secure handling of sensitive data.",
    icon: Lock
  },
  {
    title: "Evidence-Based Method",
    description: "Recommendations grounded in verifiable facts and forensic data.",
    icon: Search
  },
  {
    title: "Industrial Grade Security",
    description: "Protection of critical information throughout the investigative lifecycle.",
    icon: ShieldCheck
  },
  {
    title: "Specialist Support",
    description: "Dedicated investigators guiding every phase of case resolution.",
    icon: UserCheck
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[160px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Institutional Credibility</h2>
          <h3 className="text-4xl md:text-6xl font-headline font-bold mb-8 text-white uppercase tracking-tighter">Why Clients Choose Lazoronix</h3>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Our firm bridges the gap between digital asset complexity and professional investigative rigor, providing structured pathways to case resolution.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className="glass-card hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group bg-card/40 border-white/5">
              <CardContent className="p-12 text-left">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-10 group-hover:bg-primary/5 transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-headline font-bold mb-4 tracking-tight uppercase text-white">{feature.title}</h4>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 pt-16 border-t border-white/5">
          <div className="text-center mb-12">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-2">Operational Security Standards</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Global Integrity Protocols</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale contrast-150 pointer-events-none">
             {[
               { icon: Lock, text: "Encrypted submissions" },
               { icon: Shield, text: "Secure uploads" },
               { icon: UserCheck, text: "Confidential review" },
               { icon: ShieldCheck, text: "Restricted access" }
             ].map((signal, i) => (
               <div key={i} className="text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                 <signal.icon className="w-4 h-4 text-primary" />
                 {signal.text}
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
