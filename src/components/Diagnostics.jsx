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
        <section className="bg-white py-20 md:py-24">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="rounded-[24px] md:rounded-[40px] overflow-hidden relative border border-black/5 shadow-2xl">
                            <img
                                src={diagnosticsImage}
                                alt="Medical Safety"
                                className="w-full object-cover min-h-[300px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                                <p className="text-lg md:text-xl font-bold mb-1 uppercase tracking-tight text-white">Clinical Standards.</p>
                                <p className="opacity-60 text-[10px] md:text-xs uppercase tracking-widest font-bold text-white">Privacy • Integrity • Efficacy</p>
                            </div>
                        </div>

                        {/* Overlay Status Card */}
                        <div className="absolute top-6 -right-2 md:top-12 md:-right-6 bg-white rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4 shadow-2xl border border-black/5 scale-90 md:scale-100 origin-right">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center text-[var(--primary)] shrink-0">
                                <Shield size={18} className="md:w-5 md:h-5" />
                            </div>
                            <div>
                                <p className="text-[8px] font-bold uppercase tracking-widest opacity-30">Regulatory Compliance</p>
                                <p className="text-[11px] md:text-xs font-bold leading-tight uppercase mt-1">100% Physician Review</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="order-1 lg:order-2">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-6 block">Data Sovereignty</span>
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight tracking-tight uppercase">Confidential health <br /><span className="italic font-light opacity-50">architecture.</span></h2>

                        <p className="text-base md:text-lg opacity-40 mb-10 font-medium max-w-md">
                            Your biological data and photographic evidence are treated as protected health information (PHI), stored under HIPAA-compliant encryption standards.
                        </p>

                        <div className="space-y-8">
                            {safetyFeatures.map((f, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center text-[var(--primary)] shrink-0 transition-all border border-transparent group-hover:border-black/5 group-hover:bg-white group-hover:shadow-lg">
                                        {React.cloneElement(f.icon, { size: 20, strokeWidth: 1.5 })}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold mb-2 uppercase tracking-tight">{f.title}</h4>
                                        <p className="text-xs opacity-40 leading-relaxed font-medium italic">"{f.desc}"</p>
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
