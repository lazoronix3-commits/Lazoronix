import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Can money lost to a forex or investment scam really be recovered?",
    answer: "In many cases, yes, though it depends on the digital trail. We use blockchain forensics to trace where your funds were sent. Once identified on an exchange or a known wallet, recovery pathways involving legal and technical measures can be explored."
  },
  {
    question: "I forgot the password to my old crypto wallet. Can you help?",
    answer: "Yes. Our wallet recovery specialists use forensic workstations and proprietary tools to help clients regain access to hardware wallets, software wallets, and older encrypted files where partial information is known."
  },
  {
    question: "Is there a fee for the initial assessment?",
    answer: "Our initial case review and AI-guided tool are free. We believe in providing an honest feasibility assessment first, so you know exactly what the digital evidence shows before choosing to proceed with a full forensic investigation."
  },
  {
    question: "How do I know if I'm being scammed by a 'recovery company'?",
    answer: "Legitimate recovery specialists like Lazoronix prioritize evidence over promises. If a company asks for an 'upfront tax' or claims they have a 'special backdoor' to the blockchain, be extremely cautious. We lead with forensic analysis and factual data."
  },
  {
    question: "How long does the investigation process take?",
    answer: "A preliminary review usually takes 2-5 business days. A full forensic investigation into a complex scam can take longer as we map out transaction paths across multiple layers of the blockchain."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold">Common Questions About Recovery</h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-white/5">
              <AccordionTrigger className="text-left text-lg font-headline py-6 hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
