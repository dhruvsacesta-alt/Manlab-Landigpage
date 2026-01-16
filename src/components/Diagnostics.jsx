import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, Stethoscope } from 'lucide-react';
import diagnosticsImage from '../assets/diagnostics.png';

const Diagnostics = () => {
    const safetyFeatures = [
        {
            icon: <Lock />,
            title: "Encrypted Medical Data",
            desc: "All your medical data is encrypted. Only your doctor can view your photos and details."
        },
        {
            icon: <FileText />,
            title: "Indian Medical Guidelines",
            desc: "Treatments follow strict Indian medical guidelines. No prescriptions without proper doctor approval."
        },
        {
            icon: <Stethoscope />,
            title: "No Unsafe Medications",
            desc: "We prioritize safety. No unsafe or unnecessary medications are ever prescribed."
        }
    ];

    return (
        <section className="bg-white py-24">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="rounded-[30px] md:rounded-[60px] overflow-hidden relative">
                            <img
                                src={diagnosticsImage}
                                alt="Medical Safety"
                                className="w-full object-cover min-h-[300px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                                <p className="text-xl md:text-2xl font-black mb-1 md:mb-2">Medical-grade care.</p>
                                <p className="opacity-80 text-sm md:text-base">Delivered privately and safely.</p>
                            </div>
                        </div>

                        {/* Overlay Status Card */}
                        <div className="absolute top-6 -right-2 md:top-12 md:-right-6 premium-card !p-4 md:!p-6 flex items-center gap-3 md:gap-4 bg-white shadow-xl max-w-[200px] md:max-w-xs scale-90 md:scale-100 origin-right">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--primary)] shrink-0">
                                <Shield size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-40">Compliance</p>
                                <p className="text-xs md:text-sm font-bold leading-tight">100% Medical Board Approved</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="order-1 lg:order-2">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-6 block">Trust & Safety</span>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight text-center lg:text-left">Your health data <br /><span className="text-[var(--primary)]">is private.</span></h2>

                        <p className="text-xl opacity-60 mb-12">
                            We don't share your photos or medical history. Your consultation is strictly between you and your licensed doctor.
                        </p>

                        <div className="space-y-10">
                            {safetyFeatures.map((f, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] flex items-center justify-center text-[var(--primary)] shrink-0 transition-colors group-hover:bg-[var(--primary)] group-hover:text-white">
                                        {React.cloneElement(f.icon, { size: 24 })}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2">{f.title}</h4>
                                        <p className="text-sm opacity-50 leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Diagnostics;
