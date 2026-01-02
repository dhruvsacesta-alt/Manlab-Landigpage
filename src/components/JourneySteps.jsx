import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Camera, Cpu, Stethoscope, PackageCheck } from 'lucide-react';

const JourneySteps = () => {
    const steps = [
        {
            icon: <ClipboardList />,
            title: "Take a short assessment",
            desc: "Answer questions about your hair fall, triggers, family history, scalp symptoms, and routine."
        },
        {
            icon: <Camera />,
            title: "Upload 3–5 photos",
            desc: "Upload clear photos of your hairline, crown, mid-scalp, and overall density."
        },
        {
            icon: <Cpu />,
            title: "Review your plan",
            desc: "You’ll see your identified hair-loss cause, personalised solution, and medical reasoning."
        },
        {
            icon: <Stethoscope />,
            title: "Doctor reviews your plan",
            desc: "A licensed doctor reviews your assessment, uploaded photos, and AI explanations to confirm diagnosis."
        },
        {
            icon: <PackageCheck />,
            title: "Start treatment",
            desc: "Your plan includes scheduled follow-ups, progress monitoring, and treatment adjustments."
        },
    ];

    return (
        <section className="bg-white py-24">
            <div className="container-wide">
                <div className="max-w-3xl mb-24">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                        Hair loss, <br />
                        <span className="text-[var(--primary)]">decoded.</span>
                    </h2>
                    <p className="text-xl opacity-70">
                        We don’t sell miracle cures. We follow a strict medical protocol to identify and treat the root cause.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 relative">
                    {/* Connector Line */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-[var(--surface)] z-0"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative z-10 group"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-[var(--surface)] flex items-center justify-center text-[var(--primary)] mb-8 transition-all duration-500 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:shadow-2xl group-hover:shadow-[var(--primary)]/30 group-hover:-translate-y-2">
                                {React.cloneElement(step.icon, { size: 32 })}
                            </div>
                            <div className="px-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)] mb-4">Step 0{idx + 1}</p>
                                <h3 className="text-xl font-bold mb-4 font-heading">{step.title}</h3>
                                <p className="text-sm italic leading-relaxed opacity-60">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySteps;
