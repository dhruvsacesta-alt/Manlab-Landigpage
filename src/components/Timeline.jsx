import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
    const phases = [
        {
            time: "Month 1",
            title: "Shedding Phase",
            desc: "Shedding may continue or increase temporarily as hair cycles reset. This is normal."
        },
        {
            time: "Month 2–3",
            title: "Stabilization",
            desc: "Hair fall usually starts to slow. Early changes may be noticed, but visible regrowth is limited."
        },
        {
            time: "Month 3–6",
            title: "Early Regrowth",
            desc: "Early regrowth and improved hair texture may appear. Hair can start feeling thicker with consistent use."
        },
        {
            time: "Month 6–12",
            title: "Visible Improvement",
            desc: "Noticeable improvement in density and stability for many users."
        },
    ];

    return (
        <section className="py-20 md:py-24">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-6 block">Clinical Trajectory</span>
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight tracking-tight uppercase">Progression of <br /><span className="italic font-light opacity-50">cellular response.</span></h2>

                        <p className="text-base md:text-lg opacity-40 mb-10 font-medium max-w-md">
                            Biological stabilization occurs incrementally. Consistent pharmacological adherence is critical for sustained follicular restoration.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="p-5 bg-[var(--surface)] rounded-2xl flex-1 border border-black/5">
                                <p className="text-xl font-bold">Protocol 01</p>
                                <p className="text-[9px] uppercase font-bold opacity-30 tracking-widest mt-1">Initial Application</p>
                            </div>
                            <div className="p-5 bg-[var(--surface)] rounded-2xl flex-1 border border-black/5">
                                <p className="text-xl font-bold">Protocol 90</p>
                                <p className="text-[9px] uppercase font-bold opacity-30 tracking-widest mt-1">Cellular Stabilization</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Visual Line */}
                        <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-px bg-black opacity-[0.05] z-0"></div>

                        {phases.map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-8 relative z-10"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-black/5 flex items-center justify-center shrink-0 shadow-sm">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--surface)] flex items-center justify-center text-[10px] font-bold text-[var(--primary)]">
                                        {i + 1}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-[var(--primary)]/40 uppercase tracking-[0.2em] mb-2">{phase.time}</p>
                                    <h3 className="text-sm font-bold mb-3 uppercase tracking-tight">{phase.title}</h3>
                                    <p className="text-xs opacity-40 leading-relaxed font-medium italic">"{phase.desc}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
