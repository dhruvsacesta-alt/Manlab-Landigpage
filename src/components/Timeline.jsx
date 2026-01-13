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
        <section className="bg-[var(--background)] py-24 md:py-32">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight uppercase">
                            What results <br />
                            <span className="text-[var(--primary)] italic font-light lowercase">usually look like.</span>
                        </h2>

                        <p className="text-base md:text-lg text-[var(--text-light)] mb-12 font-medium max-w-md leading-relaxed">
                            "Every hair journey is unique. These phases represent standard clinical progression and follicular optimization."
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="p-8 bg-white/60 backdrop-blur rounded-3xl flex-1 border border-[var(--primary)]/5 shadow-lg">
                                <p className="text-2xl font-bold text-[var(--text-dark)] mb-2">Day 1</p>
                                <p className="text-[11px] uppercase font-bold text-[var(--primary)] tracking-widest opacity-60">Initial Protocol</p>
                            </div>
                            <div className="p-8 bg-white/60 backdrop-blur rounded-3xl flex-1 border border-[var(--primary)]/5 shadow-lg">
                                <p className="text-2xl font-bold text-[var(--text-dark)] mb-2">Day 180</p>
                                <p className="text-[11px] uppercase font-bold text-[var(--primary)] tracking-widest opacity-60">Visible Regrowth</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Visual Line */}
                        <div className="absolute left-[27px] md:left-[31px] top-6 bottom-6 w-px bg-black opacity-[0.05] z-0"></div>

                        {phases.map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-10 relative z-10"
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-[var(--primary)]/5 flex items-center justify-center shrink-0 shadow-xl">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--background)] flex items-center justify-center text-[12px] font-bold text-[var(--primary)]">
                                        {i + 1}
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <p className="text-[11px] font-bold text-[var(--primary)] opacity-40 uppercase tracking-[0.2em] mb-2">{phase.time}</p>
                                    <h3 className="text-base font-bold mb-3 uppercase tracking-wider text-[var(--text-dark)]">{phase.title}</h3>
                                    <p className="text-sm text-[var(--text-light)] opacity-70 leading-relaxed font-medium italic">"{phase.desc}"</p>
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
