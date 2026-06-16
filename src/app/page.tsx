

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
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  BarChart, 
  Heart, 
  Briefcase, 
  Banknote, 
  Wallet,
  FileText,
  MessageSquare,
  Globe,
  CreditCard,
  CheckCircle2,
  Shield,
  Search,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Human Reassurance Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8 leading-tight">
              We Understand What's At Stake
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium">
                Financial fraud can leave victims feeling overwhelmed, uncertain, and unsure where to turn.
              </p>
              <p>
                Our role is to help you understand your situation, preserve critical evidence, and determine whether viable recovery pathways may exist.
              </p>
              <div className="pt-8 flex flex-col items-center gap-4">
                <div className="w-12 h-px bg-primary/30" />
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  Confidential & Professional
                </p>
                <p className="text-base italic">
                  Every case is reviewed confidentially and treated with the highest level of investigative professionalism.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(70,123,224,0.03)_0%,transparent_70%)] pointer-events-none" />
      </section>

      {/* Trust Bar */}
      <div className="py-12 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-8">Specialized Investigative Tools for Blockchain & Digital Assets</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale contrast-125">
             <span className="text-2xl font-bold tracking-widest font-headline">BLOCKCHAIN</span>
             <span className="text-2xl font-bold tracking-widest font-headline">FORENSICS</span>
             <span className="text-2xl font-bold tracking-widest font-headline">INTELLIGENCE</span>
             <span className="text-2xl font-bold tracking-widest font-headline">RECOVERY</span>
             <span className="text-2xl font-bold tracking-widest font-headline">SECURITY</span>
          </div>
          <p className="mt-12 text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            We help victims of digital fraud navigate the complex path to recovery using blockchain intelligence, wallet analysis, and investigative methodologies to evaluate every case with technical precision.
          </p>
        </div>
      </div>

      <ProblemSection />
      
      <SignsSection />
      
      {/* Services Highlight Section */}
      <section id="services" className="py-24 bg-muted/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">Recovery Specialties</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6">Expert Investigation for Complex Fraud</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our specialists provide technical support and evidence analysis for a range of financial and digital asset fraud scenarios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {[
              { 
                title: "Forex Scam Recovery", 
                subtitle: "Lost money to a broker or trading platform?",
                icon: TrendingUp, 
                markers: [
                  "Withdrawal restrictions",
                  "Fake trading profits",
                  "Broker disappearance",
                  "Account balance manipulation"
                ],
                desc: "Forensic identification of fraudulent brokerage entities and tracing of funds sent to offshore jurisdictions."
              },
              { 
                title: "Investment Scam Recovery", 
                subtitle: "Victim of a fraudulent investment scheme?",
                icon: BarChart, 
                markers: [
                  "Crypto Ponzi schemes",
                  "Fake ICO/Token sales",
                  "High-yield investment fraud",
                  "Unauthorized fund transfers"
                ],
                desc: "Technical analysis of investment platforms to identify the ultimate beneficiary and secure digital evidence."
              },
              { 
                title: "Romance Scam Recovery", 
                subtitle: "Sent funds to someone you met online?",
                icon: Heart, 
                markers: [
                  "Fraudulent crypto transfers",
                  "Wire transfer deception",
                  "Gift card fraud patterns",
                  "Identity deception cases"
                ],
                desc: "Sensitive investigative support for individuals targeted through online relationship deception and fund requests."
              },
              { 
                title: "Wallet & Asset Recovery", 
                subtitle: "Lost access to your digital holdings?",
                icon: Wallet, 
                markers: [
                  "Hardware wallet corruption",
                  "Lost seed phrase extraction",
                  "Inaccessible exchange accounts",
                  "Corrupted encrypted volumes"
                ],
                desc: "Advanced forensic workstations and proprietary tools used to regain access to hardware and software wallets."
              },
              { 
                title: "Job & Recruitment Fraud", 
                subtitle: "Targeted through a fake employment offer?",
                icon: Briefcase, 
                markers: [
                  "Upfront training fees",
                  "Remote work equipment scams",
                  "Fake onboarding platforms",
                  "Identity theft attempts"
                ],
                desc: "Support for victims of employment scams, focusing on credential protection and fee tracing."
              },
              { 
                title: "Asset Tracing Solutions", 
                subtitle: "Require institutional-grade blockchain analysis?",
                icon: ShieldCheck, 
                markers: [
                  "Blockchain path history",
                  "Liquidity pool mapping",
                  "Exchange partner intercession",
                  "Jurisdictional analysis"
                ],
                desc: "Comprehensive blockchain intelligence for complex high-value digital asset losses and fund obfuscation."
              },
            ].map((service, idx) => (
              <div key={idx} className="p-10 md:p-12 rounded-[2.5rem] bg-card border border-white/5 hover:border-primary/40 transition-all flex flex-col h-full group relative overflow-hidden shadow-2xl shadow-black/20">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <service.icon className="w-40 h-40" />
                </div>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-headline font-bold">{service.title}</h4>
                    <p className="text-primary text-sm font-medium">{service.subtitle}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-10 flex-grow">
                   <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-6 border-t border-white/5">
                     {service.markers.map((marker, mIdx) => (
                       <div key={mIdx} className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                         <ChevronRight className="w-3.5 h-3.5 text-primary" />
                         {marker}
                       </div>
                     ))}
                   </div>
                </div>

                <Link href="#ai-tool" className="inline-flex items-center gap-2 px-8 h-14 rounded-xl bg-muted/50 border border-white/10 text-foreground font-bold hover:bg-primary hover:text-white transition-all w-fit">
                  Check Recovery Options
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
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
          <div className="max-w-5xl mx-auto glass-card rounded-[2.5rem] overflow-hidden">
            <div className="grid md:grid-cols-5 items-stretch">
              <div className="md:col-span-3 p-8 md:p-16 border-r border-white/5">
                <h2 className="text-4xl font-headline font-bold mb-6">Not Sure If Recovery Is Possible?</h2>
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                  Every case begins with a forensic review. We don't guess—we investigate the digital evidence to determine the viability of your claim.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { icon: FileText, text: "Transaction records" },
                    { icon: Wallet, text: "Wallet information" },
                    { icon: MessageSquare, text: "Broker communications" },
                    { icon: Globe, text: "Platform details" },
                    { icon: CreditCard, text: "Payment evidence" },
                    { icon: TrendingUp, text: "Recovery possibilities" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  You'll receive a professional assessment outlining potential next steps before any recovery work begins.
                </p>
                <div className="space-y-8">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
                    Check My Recovery Options
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5" /> Your Information Is Protected
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      {[
                        "Encrypted submissions",
                        "Secure document uploads",
                        "Confidential consultations",
                        "Restricted case access"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-foreground/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-8 md:p-16 bg-primary text-white flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">100% Confidential</h4>
                      <p className="opacity-80">All information shared is protected under strict investigative privacy protocols.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">No Obligation</h4>
                      <p className="opacity-80">Our feasibility assessment is designed to provide you with facts, not a sales pitch.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Evidence-Based</h4>
                      <p className="opacity-80">We only proceed if the technical trail indicates a legitimate path for recovery.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <AIGuidedTool />
      
      <ProcessSection />
      
      {/* Our Commitment Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">Our Commitment</h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-12">
              We understand that financial losses caused by scams can be devastating. <br/>
              <span className="font-bold underline decoration-accent decoration-4 underline-offset-8">That's why every case is evaluated using evidence, technical analysis, and investigative methodologies.</span>
            </p>
            <p className="max-w-2xl mx-auto text-lg opacity-80 leading-relaxed">
              Our investigative protocols are designed to identify legitimate recovery opportunities while maintaining complete confidentiality.
            </p>
         </div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-[3rem]">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-tight">Start Your Recovery Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Whether you've been affected by a forex scam, investment fraud, romance scam, fake job offer, loan scam, wallet access issue, or another asset recovery challenge, our specialists are ready to review your case.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
               <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 font-bold group">
                 Get My Free Case Assessment
                 <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
               </Button>
               <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-white/10 hover:bg-white/5">
                 Speak With a Recovery Expert
               </Button>
            </div>
            
            <div className="pt-8 border-t border-white/5 max-w-2xl mx-auto">
               <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 flex items-center justify-center gap-2">
                 <Lock className="w-3.5 h-3.5" /> Your Information Is Protected
               </p>
               <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                  {[
                    "Encrypted submissions",
                    "Secure document uploads",
                    "Confidential consultations",
                    "Restricted case access"
                  ].map((note, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-foreground/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{note}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
