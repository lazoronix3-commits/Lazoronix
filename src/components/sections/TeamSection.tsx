
'use client';

import Image from 'next/image';
import { ShieldCheck, User, Award, Globe, Fingerprint } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import placeholderData from '@/app/lib/placeholder-images.json';

const teamMembers = [
  { 
    id: 'team-1', 
    name: "Dr. Aris Thorne",
    role: "Lead Digital Forensic Analyst",
    credentials: "Ex-Europol Cybercrime Division",
    specialties: ["Deep Web Tracing", "Asset Seizure"],
    location: "Zurich Hub"
  },
  { 
    id: 'team-2', 
    name: "Marcus Vance",
    role: "Blockchain Intelligence Specialist",
    credentials: "Certified Fraud Examiner (CFE)",
    specialties: ["Smart Contract Audit", "DEX Analysis"],
    location: "Singapore Hub"
  },
  { 
    id: 'team-3', 
    name: "Elena Rossi",
    role: "Financial Fraud Investigator",
    credentials: "Masters in Forensic Accounting",
    specialties: ["Money Laundering Patterns", "OSINT"],
    location: "London Hub"
  },
  { 
    id: 'team-4', 
    name: "Jameson Burke",
    role: "Cybersecurity & Recovery Analyst",
    credentials: "CISSP | Offensive Security Professional",
    specialties: ["Intrusion Analysis", "Encrypted Volume Recovery"],
    location: "New York Hub"
  }
];

export function TeamSection() {
  const images = placeholderData.placeholderImages;

  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      {/* Background Decorative Trace */}
      <svg className="absolute top-0 right-0 opacity-[0.03] pointer-events-none" width="400" height="400">
        <path d="M 400 0 L 400 100 L 300 100 L 300 200 L 200 200" className="forensic-trace active" />
      </svg>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-start mb-24">
          <div className="lg:w-1/3">
            <SectionReveal>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Investigative Personnel</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold mb-8 uppercase tracking-tighter">Elite Forensic <br/><span className="italic font-medium gold-glow">Specialists.</span></h3>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                Our recovery operations are led by specialists with backgrounds in global law enforcement, financial intelligence, and offensive cybersecurity.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, text: "Ex-Law Enforcement Personnel" },
                  { icon: Award, text: "Certified Fraud Examiners" },
                  { icon: Fingerprint, text: "Offensive Security Experts" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
          
          <div className="lg:w-2/3 w-full grid sm:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => {
              const imageData = images.find(img => img.id === member.id);
              return (
                <SectionReveal key={member.id} delay={idx * 150} className="active">
                  <div className="group relative overflow-hidden bg-card border border-white/5 aspect-[4/5] shadow-2xl transition-all duration-500 hover:border-primary/40">
                    {/* Image with Zoom */}
                    <Image 
                      src={imageData?.imageUrl || ''}
                      alt={member.role}
                      fill
                      className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      data-ai-hint={imageData?.imageHint}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                    
                    {/* Content Area */}
                    <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="mb-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 flex items-center gap-2">
                          <Globe className="w-3 h-3" /> {member.location}
                        </p>
                        <h4 className="text-2xl font-headline font-bold text-white uppercase tracking-tight mb-1">{member.name}</h4>
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{member.role}</p>
                      </div>

                      {/* Hidden Credentials Reveal */}
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
                          <div className="flex items-start gap-3">
                            <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest italic leading-relaxed">
                              {member.credentials}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((spec, sIdx) => (
                              <span key={sIdx} className="px-2 py-1 bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-widest text-primary">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gold Accent Lines (Signature) */}
                    <svg className="absolute top-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" viewBox="0 0 100 100">
                      <path d="M 0 10 L 10 10 L 10 0" className="forensic-trace active" />
                    </svg>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
