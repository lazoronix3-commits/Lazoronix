'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Fingerprint,
  Mail
} from 'lucide-react';

const SERVICE_DETAILS = [
  { 
    id: "forex",
    title: "Trading Fraud Recovery", 
    subtitle: "Broker fraud & platform manipulation help.",
    icon: TrendingUp, 
    markers: [
      "Withdrawal restrictions",
      "Fake trading profits",
      "Broker disappearance",
      "Account manipulation"
    ],
    desc: "We help identify fraudulent brokers and track funds sent to suspicious accounts.",
    detailedDesc: "Trading fraud often involves unregulated brokers showing fake profits. When you try to withdraw, they demand 'taxes' or 'fees'—this is a sign of fraud.",
    forensicSteps: [
      "Broker Identification: Locating where the broker operates.",
      "Fund Flow Audit: Tracing payments to find receiving banks.",
      "Evidence Extraction: Proving manipulation of account data."
    ]
  },
  { 
    id: "investment",
    title: "Investment Scam Recovery", 
    subtitle: "Help with fake investment platforms & schemes.",
    icon: BarChart, 
    markers: [
      "Ponzi schemes",
      "Fake token sales",
      "High-yield fraud",
      "Unauthorized transfers"
    ],
    desc: "Technical analysis to find where your assets were moved.",
    detailedDesc: "Modern scams use fake 'High-Yield' sites. Scammers hide funds on the blockchain, but we can track these assets to find where they end up.",
    forensicSteps: [
      "Wallet History: Tracking the sequence of transfers.",
      "Contract Audit: Checking code used to lock or drain funds.",
      "Recipient Tracking: Mapping addresses to find recovery paths."
    ]
  },
  { 
    id: "romance",
    title: "Romance Scam Recovery", 
    subtitle: "Support for victims of relationship fraud.",
    icon: Heart, 
    markers: [
      "Crypto transfers",
      "Wire transfer deception",
      "Gift card fraud",
      "Identity deception"
    ],
    desc: "Investigative support for victims targeted through online relationships.",
    detailedDesc: "These scams involve long-term emotional manipulation to persuade victims to 'invest' in fake sites. We focus on tracking the specific crypto wallets used.",
    forensicSteps: [
      "Source Audit: Analyzing emails and chats to find origins.",
      "Identity Verification: Using tools to unmask the scammer.",
      "Evidence Packaging: Preparing reports for recovery steps."
    ]
  },
  { 
    id: "wallet",
    title: "Lost Funds Recovery", 
    subtitle: "Recovery of lost keys & locked digital assets.",
    icon: Wallet, 
    markers: [
      "Hardware wallet issues",
      "Lost seed phrases",
      "Locked exchange accounts",
      "Corrupted drives"
    ],
    desc: "Specialized tools to regain access to hardware and software wallets.",
    detailedDesc: "Sometimes funds aren't stolen, just inaccessible. We specialize in recovering access when you have lost your password or seed phrase.",
    forensicSteps: [
      "Hardware Recovery: Physical recovery for Ledger or Trezor.",
      "Phrase Reconstruction: Rebuilding seed phrases from partial data.",
      "Credential Recovery: Bypassing encryption on wallet files."
    ]
  },
  { 
    id: "job",
    title: "Employment Scam Recovery", 
    subtitle: "Help with fake job offers & recruitment fraud.",
    icon: Briefcase, 
    markers: [
      "Upfront training fees",
      "Remote equipment scams",
      "Fake onboarding sites",
      "Identity theft attempts"
    ],
    desc: "Support for victims of job scams, focusing on fee tracing.",
    detailedDesc: "Job scams target professionals with fake roles. Victims are asked to pay for 'equipment' or provide sensitive bank details.",
    forensicSteps: [
      "Portal Mapping: Identifying servers used by fake sites.",
      "Financial Tracing: Tracking accounts used to take fees.",
      "Identity Protection: Securing any stolen personal data."
    ]
  },
  { 
    id: "tracing",
    title: "Blockchain Asset Recovery", 
    subtitle: "Professional crypto asset tracing & resolution.",
    icon: ShieldCheck, 
    markers: [
      "Transaction path history",
      "Liquidity mapping",
      "Exchange intercession",
      "Jurisdictional analysis"
    ],
    desc: "Crypto intelligence for high-value asset losses and complex tracing.",
    detailedDesc: "For high-value losses, we use analytics to track assets through mixers and across different blockchains to find the final exit point.",
    forensicSteps: [
      "Cross-Chain Tracing: Tracking assets moving between cryptos.",
      "Exchange Coordination: Working with security teams to freeze funds.",
      "Detailed Reporting: Providing reports for resolution."
    ]
  },
];

function InstitutionalDecryptor({ children, label = "Dossier" }: { children: React.ReactNode, label?: string }) {
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
           Opening Files...
        </div>
        <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
           <div className="absolute top-0 h-full w-24 bg-primary animate-stream-pulse" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">Initializing Secure Access</p>
      </div>
    );
  }

  return <div className="animate-in fade-in duration-500">{children}</div>;
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="about" className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionReveal className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8 leading-tight">
              Investigation First. Recovery Second.
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium italic">
                We investigate fraud, trace digital assets, and identify recovery paths using professional tools.
              </p>
              <p>
                Our role is to help you understand the facts of your case, preserve evidence, and determine if recovery is possible through investigation.
              </p>
              <div className="pt-8 flex flex-col items-center gap-4">
                <div className="w-12 h-px bg-primary/30" />
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  Recovery Integrity Protected
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
      </section>

      <div className="py-12 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] mb-8">Specialized Recovery Services</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale contrast-125">
             <span className="text-2xl font-bold tracking-[0.3em] font-headline">RECOVERY</span>
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

      <section id="services" className="py-24 bg-muted/5">
        <div className="container mx-auto px-6">
          <SectionReveal className="text-center mb-20">
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4">Recovery Solutions</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Our Services</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              We provide targeted recovery support for many types of fraud.
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
                        Service Details <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/10 p-0">
                      <DialogTitle className="sr-only">{service.title}</DialogTitle>
                      <DialogDescription className="sr-only">Briefing and recovery path for {service.title}.</DialogDescription>
                      <InstitutionalDecryptor label="Service Info">
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
                                  <Search className="w-4 h-4 text-primary" /> Analysis
                                </h4>
                                <p className="text-lg text-foreground/90 leading-relaxed font-medium italic border-l-2 border-primary pl-6">
                                  "{service.detailedDesc}"
                                </p>
                              </div>

                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                                  <Network className="w-4 h-4 text-primary" /> Recovery Method
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
                                   <Fingerprint className="w-4 h-4" /> Requirements
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
                                        Contact Specialist
                                      </Button>
                                    </DialogClose>
                                  </Link>
                                  <div className="text-center space-y-2">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center justify-center gap-2">
                                      <Lock className="w-3 h-3" /> Secure Connection Active
                                    </p>
                                    <a href="mailto:investigator@lazoronix.com" className="block text-[8px] font-bold text-primary hover:underline uppercase tracking-widest">investigator@lazoronix.com</a>
                                  </div>
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

      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <SectionReveal className="max-w-5xl mx-auto glass-card rounded-none overflow-hidden">
            <div className="grid md:grid-cols-5 items-stretch">
              <div className="md:col-span-3 p-8 md:p-16 border-r border-white/5">
                <h2 className="text-4xl font-headline font-bold mb-6 uppercase tracking-tighter">Recovery Review</h2>
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed font-medium">
                  Every case is unique. Our specialists review your data to see if recovery is possible.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { icon: FileText, text: "Transaction Data" },
                    { icon: Wallet, text: "Wallet History" },
                    { icon: MessageSquare, text: "Chat Logs" },
                    { icon: Globe, text: "Site Infrastructure" },
                    { icon: CreditCard, text: "Evidence Quality" },
                    { icon: TrendingUp, text: "Recovery Check" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-bold text-[10px] uppercase tracking-widest text-foreground/80">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <Link href="#forensic-intake">
                    <Button size="lg" className="h-16 px-10 text-lg font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group rounded-none">
                      Contact a Recovery Specialist
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <div className="flex flex-col gap-1 items-start pl-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">Or email us directly</p>
                    <a href="mailto:investigator@lazoronix.com" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">investigator@lazoronix.com</a>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-8 md:p-16 bg-primary text-primary-foreground flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Professional</h4>
                      <p className="opacity-80 text-sm font-medium">All cases reviewed using objective methods.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Data Led</h4>
                      <p className="opacity-80 text-sm font-medium">aiming for facts and evidence-based results.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 uppercase tracking-tight">Private</h4>
                      <p className="opacity-80 text-sm font-medium">Case details are stored securely.</p>
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
                We bridge the gap between digital fraud and professional recovery rigor.<br/>
                <span className="font-bold underline decoration-accent decoration-4 underline-offset-8">Every case is reviewed with precision.</span>
              </p>
            </SectionReveal>
         </div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </section>

      <FAQSection />

      <section className="py-24 border-t border-white/5 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionReveal className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6 uppercase tracking-tighter">Speak With Our Investigation Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Whether you're reporting a suspected scam, dealing with a digital asset access issue, or need help understanding your recovery options, you can contact our team directly.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <SectionReveal delay={100} className="h-full">
              <div className="glass-card p-10 md:p-12 rounded-none hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-headline font-bold text-primary opacity-50">01</span>
                  <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">Submit Your Case</h3>
                </div>
                <p className="text-muted-foreground mb-10 flex-grow uppercase text-xs tracking-widest font-bold leading-loose">
                  Provide structured information through our secure case form. This allows our team to initialize Phase 01: Intake & Preservation immediately.
                </p>
                <Link href="#forensic-intake" className="w-full">
                  <Button size="lg" className="w-full h-16 bg-primary text-black font-black uppercase tracking-widest premium-cta rounded-none">
                    Start Case Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </SectionReveal>

            <SectionReveal delay={200} className="h-full">
              <div className="glass-card p-10 md:p-12 rounded-none border-primary/20 bg-primary/5 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-headline font-bold text-primary opacity-50">02</span>
                  <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">Email Our Team</h3>
                </div>
                <p className="text-muted-foreground mb-10 flex-grow uppercase text-xs tracking-widest font-bold leading-loose">
                  Send a confidential enquiry directly to our investigation team. Ideal for private disclosure or complex multi-jurisdictional briefings.
                </p>
                <div className="space-y-4 w-full">
                  <a href="mailto:investigator@lazoronix.com" className="block w-full">
                    <Button size="lg" variant="outline" className="w-full h-16 border-white/10 bg-white/5 hover:bg-white/10 font-black uppercase tracking-widest rounded-none">
                      Email a Specialist <Mail className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                  <p className="text-[10px] text-center font-bold text-primary uppercase tracking-widest">investigator@lazoronix.com</p>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="w-12 h-px bg-primary/30" />
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-primary" /> Two ways to begin
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Secure Data Protocols
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <div className="fixed bottom-24 left-6 z-50">
        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-breathing" />
            Confidential Review
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-breathing" />
            No Upfront Fees
          </span>
        </div>
      </div>
    </main>
  );
}
