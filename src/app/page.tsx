'use client';

import { useState } from 'react';
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
    title: "Financial Trading Fraud Division", 
    subtitle: "Investigating broker malfeasance and platform manipulation.",
    icon: TrendingUp, 
    markers: [
      "Withdrawal restrictions",
      "Fake trading profits",
      "Broker disappearance",
      "Account balance manipulation"
    ],
    desc: "Forensic identification of fraudulent brokerage entities and tracing of funds sent to offshore jurisdictions.",
    detailedDesc: "Financial trading fraud typically involves unregulated brokerage entities that use manipulated trading platforms to display artificial profits. Once a withdrawal is requested, the broker often demands 'taxes' or 'fees' to release funds—a definitive marker of fraud.",
    forensicSteps: [
      "Entity Jurisdiction Analysis: Mapping the broker's actual physical and legal location.",
      "Fund Flow Audit: Tracing wire and card payments to identify the receiving institution.",
      "Platform Evidence Extraction: Recovering trade logs to prove manual balance manipulation."
    ]
  },
  { 
    id: "investment",
    title: "Institutional Investment Fraud Division", 
    subtitle: "Technical analysis of institutional and DeFi schemes.",
    icon: BarChart, 
    markers: [
      "Crypto Ponzi schemes",
      "Fake ICO/Token sales",
      "High-yield investment fraud",
      "Unauthorized fund transfers"
    ],
    desc: "Technical analysis of investment platforms to identify the ultimate beneficiary and secure digital evidence.",
    detailedDesc: "Modern institutional investment fraud often utilizes decentralized finance (DeFi) or fake 'High-Yield Investment Programs' (HYIPs). Perpetrators leverage the anonymity of the blockchain to obfuscate the final destination of the assets through various mixing protocols.",
    forensicSteps: [
      "Blockchain Hop Analysis: Identifying the sequence of wallet transfers across multiple layers.",
      "Smart Contract Deconstruction: Auditing the code used to lock or drain participant liquidity.",
      "Recipient Attribution: Mapping wallet addresses to known exchange-hosted accounts for intercession."
    ]
  },
  { 
    id: "romance",
    title: "Social Engineering Fraud Division", 
    subtitle: "Specialized investigation for emotional grooming schemes.",
    icon: Heart, 
    markers: [
      "Crypto transfers",
      "Wire transfer deception",
      "Gift card fraud patterns",
      "Identity deception cases"
    ],
    desc: "Sensitive investigative support for individuals targeted through online relationship deception and fund requests.",
    detailedDesc: "Often referred to as 'Pig Butchering', social engineering fraud involves long-term emotional grooming. Victims are eventually persuaded to 'invest' in a fake platform controlled by the scammer. The technical recovery focus is on the platform's infrastructure and specific crypto wallets.",
    forensicSteps: [
      "Communication Meta-Data Audit: Analyzing email and chat headers to identify server origins.",
      "Identity Verification (OSINT): Using open-source intelligence to unmask the true identity behind the persona.",
      "Asset Seizure Roadmaps: Preparing technical evidence for law enforcement jurisdictional coordination."
    ]
  },
  { 
    id: "wallet",
    title: "Digital Asset Access & Recovery Division", 
    subtitle: "Forensic bypass and seed phrase reconstruction.",
    icon: Wallet, 
    markers: [
      "Hardware wallet corruption",
      "Lost seed phrase extraction",
      "Inaccessible exchange accounts",
      "Corrupted encrypted volumes"
    ],
    desc: "Advanced forensic workstations and proprietary tools used to regain access to hardware and software wallets.",
    detailedDesc: "Digital asset access isn't always fraudulent; it can be technical. We specialize in recovering access to 'frozen' assets or wallets where partial credentials are known. This involves high-compute forensic workstations and specialized cryptographic recovery tools.",
    forensicSteps: [
      "Hardware Forensic Analysis: Physical auditing of Ledger, Trezor, or corrupted storage drives.",
      "Seed Phrase Reconstruction: Using partial data to statistically rebuild lost mnemonic phrases.",
      "Credential Recovery: Bypassing legacy encryption on local wallet files where the owner has lost passwords."
    ]
  },
  { 
    id: "job",
    title: "Employment & Recruitment Fraud Division", 
    subtitle: "Investigating fake onboarding and recruitment scams.",
    icon: Briefcase, 
    markers: [
      "Upfront training fees",
      "Remote work equipment scams",
      "Fake onboarding platforms",
      "Identity theft attempts"
    ],
    desc: "Support for victims of employment scams, focusing on credential protection and fee tracing.",
    detailedDesc: "Employment fraud targets professionals by offering lucrative remote roles. Victims are asked to pay for 'equipment' or 'training'. Beyond fund loss, these scams often involve identity theft via the collection of personal identifiers and bank details.",
    forensicSteps: [
      "Infrastructure Mapping: Identifying the hosting providers and domains used by fake recruitment portals.",
      "Financial Path Tracing: Identifying the 'money mules' or intermediate accounts used to filter stolen funds.",
      "Credential Protection Audit: Assessing what personal data was exposed and providing protection protocols."
    ]
  },
  { 
    id: "tracing",
    title: "Blockchain Intelligence & Tracing Division", 
    subtitle: "Institutional-grade multi-chain asset tracing.",
    icon: ShieldCheck, 
    markers: [
      "Blockchain path history",
      "Liquidity pool mapping",
      "Exchange partner intercession",
      "Jurisdictional analysis"
    ],
    desc: "Comprehensive blockchain intelligence for complex high-value digital asset losses and fund obfuscation.",
    detailedDesc: "Institutional blockchain intelligence is required for high-value losses. This involves deep-dive blockchain analytics that track assets through mixers and cross-chain bridges to find a definitive technical resolution point.",
    forensicSteps: [
      "Multi-Chain Analysis: Tracking assets as they move from BTC to ETH to stablecoins via bridges.",
      "Exchange Compliance Coordination: Issuing forensic reports to exchange security teams to freeze assets.",
      "Expert Witness Testimony: Providing certified technical reports for use in civil and criminal litigation."
    ]
  },
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<typeof SERVICE_DETAILS[0] | null>(null);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Human Reassurance Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionReveal className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8 leading-tight">
              Investigation First. Resolution Second.
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium italic">
                We investigate financial fraud, trace digital assets, and identify recovery pathways using institutional methodologies.
              </p>
              <p>
                Our role is to help you understand the technical parameters of your case, preserve critical evidence, and determine whether viable recovery pathways exist through rigorous forensic investigation.
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
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] mb-8">Specialized Investigative Divisions for Digital Assets</p>
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
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4">Investigative Divisions</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Departmental Expertise</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Lazoronix operates through specialized divisions, each utilizing distinct forensic protocols for institutional and digital asset fraud scenarios.
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
                    <div className="w-16 h-16 rounded-none bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
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
                      <div className="p-8 md:p-12 space-y-10">
                        <DialogHeader className="flex flex-col md:flex-row gap-8 items-start text-left">
                          <div className="w-20 h-20 rounded-none bg-primary/10 flex items-center justify-center shrink-0">
                            <service.icon className="w-10 h-10 text-primary" />
                          </div>
                          <div className="space-y-4">
                            <DialogTitle className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter">{service.title}</DialogTitle>
                            <DialogDescription className="text-primary text-[10px] font-black uppercase tracking-[0.4em] opacity-100">
                              {service.subtitle}
                            </DialogDescription>
                          </div>
                        </DialogHeader>

                        <div className="grid lg:grid-cols-5 gap-12">
                          <div className="lg:col-span-3 space-y-8">
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                                <Search className="w-4 h-4 text-primary" /> Forensic Analysis Briefing
                              </h4>
                              <p className="text-lg text-foreground/90 leading-relaxed font-medium italic border-l-2 border-primary pl-6">
                                "{service.detailedDesc}"
                              </p>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                                <Network className="w-4 h-4 text-primary" /> Investigative Methodology
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
                               <div className="pt-6 border-t border-white/10">
                                 <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-bold tracking-widest">
                                   Technical resolution is determined by the preservation of high-integrity digital evidence.
                                 </p>
                               </div>
                             </div>

                             <div className="space-y-4">
                                <Link href="#forensic-intake" className="block w-full">
                                  <DialogClose asChild>
                                    <Button className="w-full h-16 bg-primary text-black font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform premium-cta rounded-none">
                                      Commence Intake
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
                <h2 className="text-4xl font-headline font-bold mb-6 uppercase tracking-tighter">Investigative Feasibility</h2>
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed font-medium">
                  Every scenario is unique. Prior to formal engagement, our specialists review transaction records, platform infrastructure, and technical meta-data to determine if a viable resolution pathway exists.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { icon: FileText, text: "Transaction Meta-Data" },
                    { icon: Wallet, text: "Wallet Path History" },
                    { icon: MessageSquare, text: "Communication Logs" },
                    { icon: Globe, text: "Platform Infrastructure" },
                    { icon: CreditCard, text: "Evidence Integrity" },
                    { icon: TrendingUp, text: "Resolution Feasibility" }
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
                      Commence Confidential Assessment
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
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">100% Clinical</h4>
                      <p className="opacity-80 text-sm font-medium">All assessments are conducted using objective forensic methodologies.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Technical Data Only</h4>
                      <p className="opacity-80 text-sm font-medium">We lead with evidence-based intelligence, avoiding speculative recovery claims.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Restricted Access</h4>
                      <p className="opacity-80 text-sm font-medium">Case details are stored in encrypted vaults with senior-tier analyst access only.</p>
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
      
      <ProcessSection />
      
      {/* Our Commitment Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
         <div className="container mx-auto px-6 relative z-10 text-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 uppercase tracking-tighter">Institutional Commitment</h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-12 font-medium">
                We bridge the gap between complex digital asset fraud and professional investigative rigor.<br/>
                <span className="font-bold underline decoration-accent decoration-4 underline-offset-8">Every case is evaluated using rigorous forensic analysis.</span>
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
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-tight uppercase tracking-tighter">Initialize Your Investigation Lifecycle</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Whether you've been affected by institutional trading fraud, social engineering, or digital asset access challenges, our specialists are ready to review your evidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
               <Link href="#forensic-intake">
                 <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 font-black uppercase tracking-widest group rounded-none premium-cta">
                   Request Forensic Assessment
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
