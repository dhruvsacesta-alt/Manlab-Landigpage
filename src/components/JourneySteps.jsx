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
        <section className="bg-white py-20">
            <div className="container-wide">
                <div className="max-w-2xl mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight">
                        Hair analysis, <br />
                        <span className="text-[var(--primary)] italic font-light">Precision Protocol.</span>
                    </h2>
                    <p className="text-base md:text-lg opacity-50 font-medium">
                        A rigorous clinical framework designed to identify and address the biological root causes of thinning.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center text-[var(--primary)] mb-6 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-black/5 group-hover:-translate-y-1 border border-transparent group-hover:border-black/5">
                                {React.cloneElement(step.icon, { size: 24, strokeWidth: 1.5 })}
                            </div>
                            <div className="px-1">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--primary)]/30 mb-3">Protocol 0{idx + 1}</p>
                                <h3 className="text-sm font-bold mb-3 uppercase tracking-tight leading-snug">{step.title}</h3>
                                <p className="text-xs leading-relaxed opacity-40 font-medium">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySteps;
