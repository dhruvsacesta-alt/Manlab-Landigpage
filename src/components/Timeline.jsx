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
        <section className="py-24">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-6 block">The Timeline</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 md:mb-10 leading-[1.1] text-center lg:text-left">What results usually <br />look like.</h2>

                        <p className="text-xl opacity-60 mb-12">
                            Consistent treatment is what produces measurable change. Results persist only with continued use.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="p-6 bg-[var(--surface)] rounded-2xl flex-1 border border-[var(--border)]">
                                <p className="text-2xl font-black">Day 1</p>
                                <p className="text-[10px] uppercase font-bold opacity-40">Start Treatment</p>
                            </div>
                            <div className="p-6 bg-[var(--surface)] rounded-2xl flex-1 border border-[var(--border)]">
                                <p className="text-2xl font-black">Day 90</p>
                                <p className="text-[10px] uppercase font-bold opacity-40">Visible Changes</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Visual Line */}
                        <div className="absolute left-[31px] md:left-[39px] top-4 bottom-4 w-px bg-[var(--border)] z-0"></div>

                        {phases.map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-6 md:gap-12 relative z-10"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border border-[var(--border)] flex items-center justify-center shrink-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--surface)] flex items-center justify-center text-xs font-black text-[var(--primary)]">
                                        {i + 1}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-[var(--primary)] uppercase tracking-widest mb-2">{phase.time}</p>
                                    <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                                    <p className="opacity-70 leading-relaxed italic">{phase.desc}</p>
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
