import React from 'react';
import { ShieldCheck, Zap, Globe, Microscope, Pill, Droplet, Sprout } from 'lucide-react';
import Button from '../ui/Button';
import sciBg from '../assets/sci_bg.png';

const ScienceSection = () => {
    const treatments = [
        {
            icon: <Pill />,
            title: "Finasteride",
            desc: "Reduces DHT to help slow or stop further hair loss. Protects existing hair."
        },
        {
            icon: <Droplet />,
            title: "Minoxidil",
            desc: "Stimulates hair growth and improves thickness in follicles that are still active."
        },
        {
            icon: <Sprout />,
            title: "Ketoconazole",
            desc: "Supports a healthy scalp by reducing dandruff, irritation, and inflammation."
        },
        {
            icon: <Zap />,
            title: "Nutritional Support",
            desc: "Used when shedding is linked to deficiencies or stress, not as a generic supplement."
        }
    ];

    return (
        <section className="py-24">
            <div className="container-wide">
                <div className="bg-[var(--text-dark)] rounded-[40px] md:rounded-[60px] p-8 md:p-24 text-white overflow-hidden relative">
                    {/* Decorative background circle and image */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--primary)] rounded-full blur-[100px] opacity-20"></div>
                    <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none hidden lg:block">
                        <img src={sciBg} alt="Scalp Analysis" className="h-full w-full object-cover" />
                    </div>

                    <div className="relative z-10">
                        <div className="max-w-3xl mb-16">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight text-white">
                                Hair loss isn’t random.
                            </h2>
                            <p className="text-xl text-white/70 leading-relaxed font-light">
                                For many people, it’s driven by <span className="text-[var(--accent)] font-bold">DHT</span>, a hormone that slowly weakens hair follicles.
                                We don’t just treat the symptom; we target the root cause.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-white/90">How our treatment helps</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {treatments.map((t, i) => (
                                        <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/15 transition-colors group">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500">
                                                {React.cloneElement(t.icon, { size: 20 })}
                                            </div>
                                            <h4 className="font-bold mb-2 text-white">{t.title}</h4>
                                            <p className="text-sm text-white/70 leading-relaxed font-normal">{t.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
                                <h3 className="text-2xl font-bold mb-6 text-white/90">How your plan works</h3>
                                <ul className="space-y-6">
                                    {[
                                        "Address the cause of hair loss",
                                        "Support regrowth where possible",
                                        "Prevent further progression",
                                        "Adjust over time with follow-ups"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-lg">
                                            <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--text-dark)] flex items-center justify-center font-bold text-sm shrink-0">
                                                {idx + 1}
                                            </div>
                                            <span className="text-white/80 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 pt-10 border-t border-white/10 text-center">
                                    <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Approved by Medical Board</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScienceSection;
