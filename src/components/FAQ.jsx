import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[var(--border)] py-8 last:border-none">
            <button
                className="w-full flex justify-between items-center text-left gap-8 group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-xl md:text-2xl font-bold font-heading transition-colors group-hover:text-[var(--primary)]">{question}</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] transition-all ${isOpen ? 'bg-[var(--primary)] text-white border-[var(--primary)] scale-90' : 'bg-white'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
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
                        <p className="pt-6 text-lg opacity-60 leading-relaxed max-w-4xl">
                            {answer}
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
        <section className="bg-white">
            <div className="container-wide">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)] mb-6 block">Common Questions</span>
                    <h2 className="text-4xl md:text-6xl font-black">Curiosity is <br /><span className="text-[var(--primary)]">Scientific.</span></h2>

                </div>

                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
