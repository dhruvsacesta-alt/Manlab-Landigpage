import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-black/5 py-4 last:border-none">
            <button
                className="w-full flex justify-between items-center text-left gap-8 group py-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-sm md:text-base font-bold uppercase tracking-tight transition-colors group-hover:text-[var(--primary)]">{question}</h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-black/5 transition-all ${isOpen ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 pt-2 text-xs md:text-sm opacity-40 leading-relaxed max-w-2xl font-medium italic">
                            "{answer}"
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "Will I experience side effects with Finasteride?",
            answer: "Clinical data shows that less than 2% of men experience mild side effects, which are typically reversible upon discontinuation. Our doctors monitor your journey 24/7 to ensure safety."
        },
        {
            question: "How long until I see real results?",
            answer: "Hair growth is biological. Most men notice reduced shedding in 1-2 months and visible regrowth by month 4-6. Consistency is the most critical factor in achieving peak stability by month 12."
        },
        {
            question: "Are these medicines FDA approved?",
            answer: "Yes, our treatments use active ingredients that are FDA and CDSCO approved for the treatment of Androgenic Alopecia (Male Pattern baldness)."
        },
        {
            question: "Is the online consultation enough?",
            answer: "Absolutely. For hair loss, high-resolution photos and detailed clinical history provide sufficient data for our dermatologists to create a precise medical plan safely."
        },
    ];

    return (
        <section className="bg-white py-20 md:py-24">
            {/* JSON-LD for FAQ Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqs.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                })}
            </script>
            <div className="container-wide">
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-6 block leading-none">Inquiry Hub</span>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Technical <br /><span className="italic font-light opacity-50">Clarification.</span></h2>
                </div>

                <div className="max-w-3xl mx-auto px-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
