import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Can every crypto asset be recovered?",
    answer: "No. Recovery feasibility depends on multiple factors including wallet type, available data, technical circumstances, and blockchain activity. Every case requires assessment before conclusions can be made."
  },
  {
    question: "How does the assessment process work?",
    answer: "Our specialists review the information you provide, analyze available evidence, and determine whether viable recovery pathways may exist. You'll receive a structured report of our findings."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Yes. All case submissions are handled through secure, encrypted channels and reviewed under strict internal confidentiality procedures similar to legal or financial standards."
  },
  {
    question: "How long does a case review take?",
    answer: "Timeframes vary based on complexity and available information. Initial assessments are typically completed within 2-5 business days before any full recovery engagement begins."
  },
  {
    question: "What information should I provide?",
    answer: "Wallet details, transaction records, recovery information, account history, and any supporting documentation that may assist the investigation. The more detail you provide during intake, the more accurate the assessment."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold">Frequently Asked Questions</h2>
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
