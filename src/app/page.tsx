import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { AIGuidedTool } from '@/components/sections/AIGuidedTool';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Eye, 
  AlertCircle, 
  TrendingUp, 
  BarChart, 
  Heart, 
  Briefcase, 
  Banknote, 
  Wallet 
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
      
      <AIGuidedTool />
      
      <ProcessSection />
      
      {/* Differentiation Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">A Different Approach to Recovery</h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-12">
              We don't make empty promises. We provide an <br/>
              <span className="font-bold underline decoration-accent decoration-4 underline-offset-8">Evidence-Based Recovery Roadmap.</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm font-bold tracking-widest uppercase">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Transaction Logs</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Wallet Path</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Exchange Leads</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Asset Locations</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Recovery Odds</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Legal Options</div>
            </div>
         </div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-[3rem]">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-tight">Get a Professional Assessment <br/>of Your Recovery Case</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop guessing and start following a forensic path. Our specialists will review your situation and provide clear, evidence-based guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
               <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 font-bold">
                 Start My Free Case Review
                 <ArrowRight className="ml-2 w-6 h-6" />
               </Button>
               <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-white/10 hover:bg-white/5">
                 Request Specialist Callback
               </Button>
            </div>
            <p className="text-sm italic text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              "Every recovery case is unique. Our mission is to provide you with a factual foundation before you commit to any recovery pathway."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}