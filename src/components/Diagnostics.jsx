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
        <section className="bg-[var(--background)] py-32 md:py-48">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="rounded-[3rem] overflow-hidden relative border border-[var(--primary)]/10 shadow-[0_50px_100px_-20px_rgba(45,41,38,0.2)] bg-white">
                            <img
                                src={diagnosticsImage}
                                alt="Medical Safety"
                                className="w-full h-full object-cover min-h-[500px] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            <div className="absolute bottom-12 left-12 text-white">
                                <p className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-tight text-white leading-none">Clinical Base.</p>
                                <p className="opacity-50 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-black text-white">Privacy • Security • Quality</p>
                            </div>
                        </div>

                        {/* Overlay Status Card */}
                        <div className="absolute top-12 -right-6 md:top-24 md:-right-12 bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 flex items-center gap-6 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-[var(--primary)]/10 scale-90 md:scale-110 origin-right transition-transform hover:scale-[1.15]">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--background)] flex items-center justify-center text-[var(--primary)] shrink-0 shadow-inner border border-[var(--primary)]/5">
                                <Shield size={28} strokeWidth={1.2} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] opacity-40 mb-1">Clinic Status</p>
                                <p className="text-base font-bold leading-tight uppercase text-[var(--text-dark)]">Physician <br />Approved</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight tracking-tight uppercase text-[var(--text-dark)]">
                            Your health data <br />
                            <span className="text-[var(--primary)] italic font-light lowercase">is private.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-[var(--text-light)] mb-16 font-medium max-w-lg leading-relaxed opacity-80">
                            "Protocol mandated privacy. Your clinical data and photographic evidence are treated as strictly protected health information (PHI)."
                        </p>

                        <div className="space-y-12">
                            {safetyFeatures.map((f, i) => (
                                <div key={i} className="flex gap-10 group">
                                    <div className="w-16 h-16 rounded-[1.25rem] bg-white flex items-center justify-center text-[var(--primary)] shrink-0 transition-all border border-[var(--primary)]/5 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] group-hover:shadow-[0_25px_50px_-10px_rgba(166,123,91,0.2)] group-hover:-translate-y-1">
                                        {React.cloneElement(f.icon, { size: 24, strokeWidth: 1.2 })}
                                    </div>
                                    <div className="pt-2">
                                        <h4 className="text-base font-bold mb-4 uppercase tracking-[0.1em] text-[var(--text-dark)]">{f.title}</h4>
                                        <p className="text-sm md:text-base text-[var(--text-light)] opacity-60 leading-relaxed font-medium">"{f.desc}"</p>
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
