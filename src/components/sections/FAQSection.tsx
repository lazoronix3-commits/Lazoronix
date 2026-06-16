import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionReveal } from "@/components/ui/section-reveal";
import { ShieldCheck, Search, Wallet, AlertCircle, FileText } from 'lucide-react';

const knowledgeCategories = [
  {
    title: "Scam Investigations",
    icon: AlertCircle,
    questions: [
      {
        question: "Can money lost to a forex or investment scam really be recovered?",
        answer: "Recovery feasibility depends on the integrity of the digital trail. We use blockchain forensics to trace fund movement. Once identified on an exchange or a known node, institutional recovery pathways involving legal-technical coordination can be explored."
      },
      {
        question: "How do you handle complex social engineering or romance scams?",
        answer: "These cases require a synthesis of OSINT (Open Source Intelligence) and blockchain analysis. We map the infrastructure used by the perpetrator and track assets across multiple layers to identify a definitive resolution point."
      }
    ]
  },
  {
    title: "Wallet Access Cases",
    icon: Wallet,
    questions: [
      {
        question: "I lost the seed phrase or password to my hardware wallet. Can you help?",
        answer: "Yes. Our specialists utilize high-compute forensic workstations and specialized cryptographic recovery protocols to regain access to hardware and software wallets where partial credential data is available."
      },
      {
        question: "What specific devices do you support for forensic extraction?",
        answer: "We provide technical support for Ledger, Trezor, and KeepKey hardware, as well as encrypted local volumes and legacy wallet files (e.g., wallet.dat) on corrupted storage drives."
      }
    ]
  },
  {
    title: "Asset Tracing Cases",
    icon: Search,
    questions: [
      {
        question: "Can you trace funds if they were sent through a mixer or tumbler?",
        answer: "While mixers increase obfuscation, advanced cluster analysis and heuristic tracking often identify the exit nodes. Our intelligence identifies the ultimate destination wallets, typically at major exchanges, where interdiction is possible."
      },
      {
        question: "How long does a formal forensic asset trace typically take?",
        answer: "A preliminary assessment is completed within 48-72 hours. A full forensic lifecycle for complex cases typically spans 2-4 weeks, depending on the depth of fund obfuscation and the number of cross-chain hops."
      }
    ]
  },
  {
    title: "Security & Protocols",
    icon: ShieldCheck,
    questions: [
      {
        question: "How is my sensitive evidence protected during the investigation?",
        answer: "Lazoronix operates under restricted institutional privacy protocols. All evidence, communications, and technical data are stored in AES-256 encrypted vaults with access limited to assigned senior analysts."
      },
      {
        question: "Is there an upfront fee for the initial feasibility assessment?",
        answer: "The initial case review and AI-guided forensic scan are free. We lead with evidence first, ensuring a viable recovery pathway exists before a formal investigative engagement is initialized."
      }
    ]
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionReveal className="text-center mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Investigative Resources</h2>
          <h3 className="text-4xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter">Recovery Knowledge Base</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A specialized resource for understanding the technical methodologies behind digital asset investigation and recovery.
          </p>
        </SectionReveal>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {knowledgeCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-headline font-bold uppercase tracking-tight">{category.title}</h4>
              </div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {category.questions.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${catIdx}-${idx}`} className="border-white/5 bg-white/5 px-6 rounded-none">
                    <AccordionTrigger className="text-left text-sm font-bold py-6 hover:no-underline hover:text-primary transition-colors uppercase tracking-widest">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-[11px] leading-relaxed pb-6 uppercase tracking-widest">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/5 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-center gap-2">
             <FileText className="w-3.5 h-3.5 text-primary" /> Formal investigative reports are provided upon completion of lifecycle Phase 04.
           </p>
        </div>
      </div>
    </section>
  );
}
