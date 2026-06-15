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
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
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
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-6">How Can We Help?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Specialized recovery assistance tailored to the specific nature of your loss.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Forex Scam Recovery", 
                icon: TrendingUp, 
                desc: "Recover funds lost through fake brokers, trading platforms, withdrawal restrictions, account manipulation, and investment fraud schemes." 
              },
              { 
                title: "Investment Scam Recovery", 
                icon: BarChart, 
                desc: "Assistance for victims of fraudulent investment opportunities, crypto investment schemes, and unauthorized fund transfers." 
              },
              { 
                title: "Romance Scam Recovery", 
                icon: Heart, 
                desc: "Investigative support for individuals who transferred funds or digital assets to fraudulent online relationships." 
              },
              { 
                title: "Job Scam Recovery", 
                icon: Briefcase, 
                desc: "Recovery assistance for victims targeted through fake employment offers, remote work scams, and recruitment fraud." 
              },
              { 
                title: "Loan Scam Recovery", 
                icon: Banknote, 
                desc: "Investigation and recovery support related to advance-fee loan scams and fraudulent lending schemes." 
              },
              { 
                title: "Wallet Recovery", 
                icon: Wallet, 
                desc: "Support for lost wallet access, missing credentials, inaccessible crypto holdings, and wallet-related technical issues." 
              },
              { 
                title: "Asset Recovery Solutions", 
                icon: ShieldCheck, 
                desc: "Comprehensive investigation and recovery strategies for complex financial and digital asset losses." 
              },
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-muted/20 border border-white/5 hover:border-primary/50 transition-all flex flex-col h-full group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-headline font-bold mb-3">{service.title}</h4>
                <p className="text-muted-foreground text-sm flex-grow leading-relaxed mb-6">{service.desc}</p>
                <Link href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors">
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

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
                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
                  Check My Recovery Options
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
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
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 border-t border-white/5">
               {[
                 { text: "Confidential Review" },
                 { text: "Secure Submission" },
                 { text: "No Obligation Consultation" }
               ].map((note, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                   <CheckCircle2 className="w-4 h-4 text-primary" />
                   <span>{note.text}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
