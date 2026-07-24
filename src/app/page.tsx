'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SignsSection } from '@/components/sections/SignsSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { AIGuidedTool } from '@/components/sections/AIGuidedTool';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { TeamSection } from '@/components/sections/TeamSection';
import { GlobalIntelligence } from '@/components/sections/GlobalIntelligence';
import { EvidencePreservation } from '@/components/sections/EvidencePreservation';
import { IntelligenceReports } from '@/components/sections/IntelligenceReports';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  BarChart, 
  Heart, 
  Briefcase, 
  Wallet,
  FileText,
  MessageSquare,
  Globe,
  CreditCard,
  CheckCircle2,
  Shield,
  Lock,
  ChevronRight,
  Search,
  Activity,
  Network,
  Fingerprint
} from 'lucide-react';

const SERVICE_DETAILS = [
  { 
    id: "forex",
    title: "Trading Fraud Recovery", 
    subtitle: "Investigating broker fraud and platform manipulation.",
    icon: TrendingUp, 
    markers: [
      "Withdrawal restrictions",
      "Fake trading profits",
      "Broker disappearance",
      "Account balance manipulation"
    ],
    desc: "Identification of fraudulent brokers and tracing of funds sent to offshore accounts.",
    detailedDesc: "Trading fraud involves unregulated brokers using fake platforms to show artificial profits. When you try to withdraw, they often demand 'taxes' or 'fees'—this is a clear sign of fraud.",
    forensicSteps: [
      "Broker Location Mapping: Identifying where the broker is actually operating.",
      "Fund Flow Audit: Tracing payments to find the receiving bank.",
      "Evidence Extraction: Recovering logs to prove balance manipulation."
    ]
  },
  { 
    id: "investment",
    title: "Investment Scam Recovery", 
    subtitle: "Analysis of institutional and crypto investment scams.",
    icon: BarChart, 
    markers: [
      "Crypto Ponzi schemes",
      "Fake token sales",
      "High-yield fraud",
      "Unauthorized transfers"
    ],
    desc: "Technical analysis of platforms to find where your assets were moved.",
    detailedDesc: "Modern investment scams use fake 'High-Yield' programs or DeFi protocols. Scammers use the blockchain to hide funds, but our tools can track these assets through mixers and multiple wallets.",
    forensicSteps: [
      "Wallet History Analysis: Identifying the sequence of wallet transfers.",
      "Contract Auditing: Checking the code used to lock or drain funds.",
      "Recipient Tracking: Mapping addresses to exchange accounts for recovery."
    ]
  },
  { 
    id: "romance",
    title: "Romance Scam Recovery", 
    subtitle: "Support for victims of emotional grooming and fraud.",
    icon: Heart, 
    markers: [
      "Crypto transfers",
      "Wire transfer deception",
      "Gift card fraud",
      "Identity deception"
    ],
    desc: "Investigative support for victims targeted through online relationships and deception.",
    detailedDesc: "Often called 'Pig Butchering', these scams involve long-term emotional manipulation. Victims are persuaded to 'invest' in fake sites. We focus on the platform infrastructure and tracking the specific crypto wallets used.",
    forensicSteps: [
      "Communication Audit: Analyzing email and chat data to find origins.",
      "Identity Verification: Using intelligence tools to unmask the persona.",
      "Evidence Packaging: Preparing reports for law enforcement coordination."
    ]
  },
  { 
    id: "wallet",
    title: "Lost Funds Recovery", 
    subtitle: "Recovery of inaccessible wallets and lost keys.",
    icon: Wallet, 
    markers: [
      "Hardware wallet issues",
      "Lost seed phrases",
      "Locked exchange accounts",
      "Corrupted storage drives"
    ],
    desc: "Advanced tools used to regain access to hardware and software crypto wallets.",
    detailedDesc: "Sometimes funds aren't stolen, just inaccessible. We specialize in recovering access to 'frozen' assets or wallets where you have lost your password or seed phrase.",
    forensicSteps: [
      "Hardware Audit: Physical recovery for Ledger, Trezor, or drives.",
      "Phrase Reconstruction: Rebuilding lost seed phrases from partial data.",
      "Credential Recovery: Bypassing encryption on local wallet files."
    ]
  },
  { 
    id: "job",
    title: "Employment Scam Recovery", 
    subtitle: "Investigating fake job offers and recruitment scams.",
    icon: Briefcase, 
    markers: [
      "Upfront training fees",
      "Remote equipment scams",
      "Fake onboarding sites",
      "Identity theft attempts"
    ],
    desc: "Support for victims of job scams, focusing on fee tracing and ID protection.",
    detailedDesc: "Job scams target professionals with fake remote roles. Victims are asked to pay for 'equipment'. These scams also aim to steal your identity using your personal bank details.",
    forensicSteps: [
      "Portal Mapping: Identifying the servers used by fake job sites.",
      "Financial Tracing: Tracking the accounts used to filter stolen fees.",
      "Identity Protection: Assessing what data was stolen and securing it."
    ]
  },
  { 
    id: "tracing",
    title: "Blockchain Asset Recovery", 
    subtitle: "Professional multi-chain crypto asset tracing.",
    icon: ShieldCheck, 
    markers: [
      "Transaction path history",
      "Liquidity mapping",
      "Exchange intercession",
      "Jurisdictional analysis"
    ],
    desc: "Crypto intelligence for high-value asset losses and complex fund tracing.",
    detailedDesc: "For high-value losses, we use deep-dive analytics to track assets through mixers and across different blockchains (like BTC to ETH) to find the final exit point.",
    forensicSteps: [
      "Cross-Chain Tracing: Tracking assets as they move between different cryptos.",
      "Exchange Coordination: Working with exchange security teams to freeze funds.",
      "Certified Reporting: Providing technical reports for legal use."
    ]
  },
];

function InstitutionalDecryptor({ children, label = "Technical Brief" }: { children: React.ReactNode, label?: string }) {
  const [state, setState] = useState<'decrypting' | 'open'>('decrypting');

  useEffect(() => {
    const timer = setTimeout(() => setState('open'), 400);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'decrypting') {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 bg-primary animate-breathing" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{label}</span>
        </div>
        <div className="text-2xl font-headline font-bold uppercase tracking-tighter animate-pulse text-white">
           Decrypting Assets...
        </div>
        <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
           <div className="absolute top-0 h-full w-24 bg-primary animate-stream-pulse" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">Initializing Forensic Stream</p>
      </div>
    );
  }

  return <div className="animate-in fade-in duration-500">{children}</div>;
}

export default function Home() {
  const [selectedService, setSelectedService] = useState<typeof SERVICE_DETAILS[0] | null>(null);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* About Us Section */}
      <section id="about" className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionReveal className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8 leading-tight">
              Investigation First. Recovery Second.
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium italic">
                We investigate financial fraud, trace digital assets, and identify recovery pathways using professional methodologies.
              </p>
              <p>
                Our role is to help you understand the technical facts of your case, preserve critical evidence, and determine whether recovery is possible through rigorous investigation.
              </p>
              <div className="pt-8 flex flex-col items-center gap-4">
                <div className="w-12 h-px bg-primary/30" />
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  Forensic Integrity Protected
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
      </section>

      {/* Trust Bar */}
      <div className="py-12 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] mb-8">Specialized Recovery Divisions</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale contrast-125">
             <span className="text-2xl font-bold tracking-[0.3em] font-headline">FORENSICS</span>
             <span className="text-2xl font-bold tracking-[0.3em] font-headline">INTELLIGENCE</span>
             <span className="text-2xl font-bold tracking-[0.3em] font-headline">ANALYSIS</span>
             <span className="text-2xl font-bold tracking-[0.3em] font-headline">TRACING</span>
             <span className="text-2xl font-bold tracking-[0.3em] font-headline">RESOLUTION</span>
          </div>
        </div>
      </div>

      <ProblemSection />
      
      <SignsSection />
      
      <EvidencePreservation />

      {/* Services Highlight Section */}
      <section id="services" className="py-24 bg-muted/5">
        <div className="container mx-auto px-6">
          <SectionReveal className="text-center mb-20">
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4">Recovery Solutions</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Specialized Services</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Lazoronix operates through specialized divisions to provide targeted recovery support for all fraud scenarios.
            </p>
          </SectionReveal>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {SERVICE_DETAILS.map((service, idx) => (
              <SectionReveal key={idx} delay={idx * 100} duration={500} className="h-full">
                <div className="p-10 md:p-12 rounded-none bg-card border border-white/5 hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full group relative overflow-hidden shadow-2xl shadow-black/20">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <service.icon className="w-40 h-40" />
                  </div>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-none bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-700 relative overflow-hidden">
                      <div className="absolute inset-[-4px] border border-dashed border-primary/0 group-hover:border-primary/30 group-hover:rotate-180 transition-all duration-1000 ease-in-out" />
                      <service.icon className="w-8 h-8 text-primary relative z-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-headline font-bold uppercase tracking-tight">{service.title}</h4>
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-10 flex-grow">
                     <p className="text-muted-foreground text-sm uppercase leading-relaxed tracking-wide font-medium">{service.desc}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-6 border-t border-white/5">
                       {service.markers.map((marker, mIdx) => (
                         <div key={mIdx} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">
                           <ChevronRight className="w-3.5 h-3.5 text-primary" />
                           {marker}
                         </div>
                       ))}
                     </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg" className="h-14 px-8 rounded-none border-white/10 hover:bg-primary hover:text-black transition-all w-fit font-bold uppercase tracking-widest">
                        Technical Briefing <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/10 p-0">
                      <DialogTitle className="sr-only">{service.title}</DialogTitle>
                      <DialogDescription className="sr-only">Forensic briefing and recovery methodology for {service.title}.</DialogDescription>
                      <InstitutionalDecryptor label="Case Dossier">
                        <div className="p-8 md:p-12 space-y-10">
                          <DialogHeader className="flex flex-col md:flex-row gap-8 items-start text-left">
                            <div className="w-20 h-20 rounded-none bg-primary/10 flex items-center justify-center shrink-0">
                              <service.icon className="w-10 h-10 text-primary" />
                            </div>
                            <div className="space-y-4">
                              <div className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter">{service.title}</div>
                              <div className="text-primary text-[10px] font-black uppercase tracking-[0.4em] opacity-100">
                                {service.subtitle}
                              </div>
                            </div>
                          </DialogHeader>

                          <div className="grid lg:grid-cols-5 gap-12">
                            <div className="lg:col-span-3 space-y-8">
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                                  <Search className="w-4 h-4 text-primary" /> Forensic Analysis
                                </h4>
                                <p className="text-lg text-foreground/90 leading-relaxed font-medium italic border-l-2 border-primary pl-6">
                                  "{service.detailedDesc}"
                                </p>
                              </div>

                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                                  <Network className="w-4 h-4 text-primary" /> Recovery Methodology
                                </h4>
                                <div className="space-y-4">
                                  {service.forensicSteps.map((step, sIdx) => (
                                    <div key={sIdx} className="p-5 bg-white/5 border border-white/5 flex items-start gap-4 hover:border-primary/30 transition-colors">
                                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-[10px] font-black text-primary">0{sIdx + 1}</div>
                                      <p className="text-sm font-bold text-foreground/80 leading-relaxed uppercase tracking-wide">{step}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="lg:col-span-2 space-y-8">
                               <div className="p-8 bg-primary/5 border border-primary/20 space-y-6">
                                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                   <Fingerprint className="w-4 h-4" /> Evidence Requirements
                                 </h4>
                                 <div className="space-y-4">
                                   {service.markers.map((marker, mIdx) => (
                                     <div key={mIdx} className="flex items-center gap-3 text-xs font-bold text-foreground/60 uppercase tracking-widest">
                                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                       {marker}
                                     </div>
                                   ))}
                                 </div>
                               </div>

                               <div className="space-y-4">
                                  <Link href="#forensic-intake" className="block w-full">
                                    <DialogClose asChild>
                                      <Button className="w-full h-16 bg-primary text-black font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform premium-cta rounded-none">
                                        Start Recovery
                                      </Button>
                                    </DialogClose>
                                  </Link>
                                  <p className="text-[9px] text-center font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center justify-center gap-2">
                                    <Lock className="w-3 h-3" /> Secure Lifecycle Active
                                  </p>
                               </div>
                            </div>
                          </div>
                        </div>
                      </InstitutionalDecryptor>
                    </DialogContent>
                  </Dialog>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      
      <SuccessStories />

      <TeamSection />

      {/* Case Qualification Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <SectionReveal className="max-w-5xl mx-auto glass-card rounded-none overflow-hidden">
            <div className="grid md:grid-cols-5 items-stretch">
              <div className="md:col-span-3 p-8 md:p-16 border-r border-white/5">
                <h2 className="text-4xl font-headline font-bold mb-6 uppercase tracking-tighter">Recovery Feasibility</h2>
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed font-medium">
                  Every case is unique. Before we start, our specialists review transaction records and platform data to see if recovery is possible.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { icon: FileText, text: "Transaction Meta-Data" },
                    { icon: Wallet, text: "Wallet Path History" },
                    { icon: MessageSquare, text: "Communication Logs" },
                    { icon: Globe, text: "Platform Infrastructure" },
                    { icon: CreditCard, text: "Evidence Integrity" },
                    { icon: TrendingUp, text: "Recovery Feasibility" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-bold text-[10px] uppercase tracking-widest text-foreground/80">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-8">
                  <Link href="#forensic-intake">
                    <Button size="lg" className="h-16 px-10 text-lg font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group rounded-none">
                      Start Recovery Case
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2 p-8 md:p-16 bg-primary text-primary-foreground flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Professional</h4>
                      <p className="opacity-80 text-sm font-medium">All cases evaluated using objective methodologies.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Data Led</h4>
                      <p className="opacity-80 text-sm font-medium">We lead with facts and evidence-based intelligence.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Restricted Access</h4>
                      <p className="opacity-80 text-sm font-medium">Case details are stored in encrypted vaults.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
      
      <GlobalIntelligence />

      <AIGuidedTool />
      
      <IntelligenceReports />

      <ProcessSection />
      
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
         <div className="container mx-auto px-6 relative z-10 text-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 uppercase tracking-tighter">Our Commitment</h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-12 font-medium">
                We bridge the gap between complex digital fraud and professional recovery rigor.<br/>
                <span className="font-bold underline decoration-accent decoration-4 underline-offset-8">Every case is evaluated with technical precision.</span>
              </p>
            </SectionReveal>
         </div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <SectionReveal className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-none hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-tight uppercase tracking-tighter">Start Recovery Today</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              If you've been affected by trading fraud, scams, or lost access to your assets, our specialists are ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
               <Link href="#forensic-intake">
                 <Button size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest group rounded-none premium-cta">
                   Start Recovery Case
                   <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
