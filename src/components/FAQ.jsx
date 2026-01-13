import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[var(--primary)]/10 py-4 md:py-6 last:border-none">
            <button
                className="w-full flex justify-between items-center text-left gap-8 group py-6 md:py-8"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight transition-all text-[var(--text-dark)] group-hover:text-[var(--primary)] group-hover:translate-x-1">{question}</h3>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-[var(--primary)]/10 transition-all duration-500 shadow-sm ${isOpen ? 'bg-[var(--primary)] text-white border-[var(--primary)] rotate-180' : 'bg-white group-hover:border-[var(--primary)]/30 group-hover:scale-110'}`}>
                    {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-10 pt-2 text-base md:text-lg text-[var(--text-light)] leading-[1.8] max-w-3xl font-medium">
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
        <section className="bg-[var(--background)] py-32 md:py-48">
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
                <div className="text-center mb-24 md:mb-32">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-[var(--text-dark)] leading-tight">
                        Curiosity is <br /><span className="text-[var(--primary)] italic font-light lowercase">scientific.</span>
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/30 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-[var(--primary)]/5 shadow-[0_40px_80px_-20px_rgba(166,123,91,0.1)]">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} {...faq} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
