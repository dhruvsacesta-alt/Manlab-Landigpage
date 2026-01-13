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
        <section className="py-20 md:py-24">
            <div className="container-wide">
                <div className="bg-[var(--text-dark)] rounded-[32px] md:rounded-[48px] p-8 md:p-20 text-white overflow-hidden relative border border-white/5">
                    {/* Decorative background circle and image */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--primary)] rounded-full blur-[100px] opacity-10"></div>

                    <div className="relative z-10">
                        <div className="max-w-2xl mb-16">
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-4 block">Endocrine Mechanism</span>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight uppercase tracking-tight text-white">
                                Cellular targeting <br /><span className="italic font-light opacity-50">Precision medicine.</span>
                            </h2>
                            <p className="text-base md:text-lg text-white/50 leading-relaxed font-medium">
                                We utilize a multi-modal approach to inhibit <span className="text-white font-bold italic">DHT</span> pathways while simultaneously optimizing follicular metabolic health.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-white/30">Pharmacological Standards</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {treatments.map((t, i) => (
                                            <div key={i} className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-all group">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 text-[var(--primary)] flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110">
                                                    {React.cloneElement(t.icon, { size: 16, strokeWidth: 1.5 })}
                                                </div>
                                                <h4 className="text-sm font-bold mb-2 text-white uppercase tracking-tight">{t.title}</h4>
                                                <p className="text-[11px] text-white/40 leading-relaxed font-normal">{t.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.02] p-8 md:p-10 rounded-3xl border border-white/5 mt-auto">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-white/30">Phased Recovery Framework</h3>
                                <ul className="space-y-6">
                                    {[
                                        "DHT Inhibition (Pathway Blocking)",
                                        "Follicular Stimulation (Regrowth phase)",
                                        "Structural Density Preservation",
                                        "Adaptive Protocol Adjustments"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-base">
                                            <div className="w-6 h-6 rounded-full bg-white/5 text-white/30 flex items-center justify-center font-bold text-[9px] shrink-0 border border-white/5">
                                                {idx + 1}
                                            </div>
                                            <span className="text-white/60 text-sm font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-12 pt-10 border-t border-white/5 text-center">
                                    <p className="text-[8px] text-white/20 uppercase tracking-[0.3em] font-bold">physician approved • pharmacological grade</p>
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
