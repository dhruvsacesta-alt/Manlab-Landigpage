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
        <section className="bg-[var(--background)] py-32 md:py-48">
            <div className="container-wide">
                <div className="max-w-3xl mb-32">
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight uppercase tracking-tight text-[var(--text-dark)]">
                        Hair loss, <br />
                        <span className="text-[var(--primary)] italic font-light lowercase">decoded.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--text-light)] font-medium leading-relaxed max-w-2xl opacity-80">
                        "Our clinical framework integrates algorithmic diagnostics and licensed medical expertise to identify biological root causes with precision."
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 md:gap-16">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <div className="w-20 h-20 rounded-[1.5rem] bg-white flex items-center justify-center text-[var(--primary)] mb-10 transition-all duration-700 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:shadow-[0_20px_40px_-10px_rgba(166,123,91,0.3)] group-hover:-translate-y-2 border border-[var(--primary)]/5">
                                {React.cloneElement(step.icon, { size: 28, strokeWidth: 1.2 })}
                            </div>
                            <div className="px-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] opacity-40 mb-4">Step 0{idx + 1}</h4>
                                <h3 className="text-base font-bold mb-6 uppercase tracking-tight text-[var(--text-dark)] group-hover:text-[var(--primary)] transition-colors leading-tight">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-[var(--text-light)] opacity-70 font-medium">"{step.desc}"</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySteps;
