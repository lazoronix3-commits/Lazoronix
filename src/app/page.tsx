import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { AIGuidedTool } from '@/components/sections/AIGuidedTool';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Lock, Eye } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Trust Bar */}
      <div className="py-12 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-8">Trusted by Individuals & Businesses Worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale contrast-125">
             <span className="text-2xl font-bold tracking-widest font-headline">BITGO</span>
             <span className="text-2xl font-bold tracking-widest font-headline">LEDGER</span>
             <span className="text-2xl font-bold tracking-widest font-headline">TREZOR</span>
             <span className="text-2xl font-bold tracking-widest font-headline">COINBASE</span>
             <span className="text-2xl font-bold tracking-widest font-headline">BINANCE</span>
          </div>
          <p className="mt-12 text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Our team applies blockchain intelligence, digital forensics, wallet analysis, and investigative methodologies to evaluate complex asset recovery cases with professionalism, discretion, and technical precision.
          </p>
        </div>
      </div>

      <ProblemSection />
      
      {/* Services Highlight Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-6">Recovery & Investigation Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Wallet Access Recovery", icon: Lock },
              { title: "Blockchain Analysis", icon: ShieldCheck },
              { title: "Asset Verification", icon: Eye },
              { title: "Feasibility Assessments", icon: ShieldCheck },
              { title: "Security Investigations", icon: Lock },
              { title: "Evidence Documentation", icon: Eye },
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-muted/20 border border-white/5 hover:bg-muted/30 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-headline font-bold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground text-sm">Professional evaluation of recovery paths before any technical work begins.</p>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">What Makes Our Approach Different?</h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-12">
              Many recovery providers begin with promises. <br/>
              <span className="font-bold underline decoration-accent decoration-4 underline-offset-8">We begin with evidence.</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm font-bold tracking-widest uppercase">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Recovery Data</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Architecture</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">History</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Options</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Security</div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">Risks</div>
            </div>
         </div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-[3rem]">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-tight">Get a Professional Assessment <br/>Before Your Next Step</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Digital asset recovery decisions should be based on evidence, not guesswork. Speak with a specialist to understand your options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
               <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 font-bold">
                 Start My Assessment
                 <ArrowRight className="ml-2 w-6 h-6" />
               </Button>
               <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-white/10 hover:bg-white/5">
                 Request Consultation
               </Button>
            </div>
            <p className="text-sm italic text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              "Every recovery case is unique. Our objective is to provide clear, evidence-based guidance through a secure and transparent process."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
