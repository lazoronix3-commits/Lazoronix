
import Image from 'next/image';
import { ShieldCheck, Database, Search, Lock, Fingerprint, Activity, Briefcase } from 'lucide-react';
import placeholderData from '@/app/lib/placeholder-images.json';

const expertise = [
  "Digital Asset Analysis",
  "Blockchain Intelligence",
  "Cybersecurity",
  "Financial Fraud Investigations",
  "Evidence Collection",
  "Recovery Case Management"
];

const teamMembers = [
  { id: 'team-1', role: "Lead Digital Forensic Analyst" },
  { id: 'team-2', role: "Blockchain Intelligence Specialist" },
  { id: 'team-3', role: "Financial Fraud Investigator" },
  { id: 'team-4', role: "Cybersecurity & Recovery Analyst" }
];

export function TeamSection() {
  const images = placeholderData.placeholderImages;

  return (
    <section className="py-24 bg-card/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">Core Personnel</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-8">Our Investigation Team</h3>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Lazoronix specialists operate at the intersection of blockchain technology and forensic science. 
              Our team consists of experts with deep technical backgrounds in tracing complex asset movements 
              and securing digital evidence for high-value recovery cases.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
              {expertise.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-bold text-foreground/80">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 italic text-foreground/70">
              "We prioritize operational security. While our investigators maintain complete confidentiality, 
              their expertise is verifiable through the technical precision of our case resolutions."
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
            {teamMembers.map((member) => {
              const imageData = images.find(img => img.id === member.id);
              return (
                <div key={member.id} className="relative group overflow-hidden rounded-2xl aspect-[4/5] bg-muted/20">
                  <Image 
                    src={imageData?.imageUrl || ''}
                    alt={member.role}
                    fill
                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-500"
                    data-ai-hint={imageData?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Specialist</p>
                    <p className="text-sm font-bold text-white line-clamp-2">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
