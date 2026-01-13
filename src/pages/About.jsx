import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import doctorImage from '../assets/doctor.png';
import heroImage from '../assets/hero.png';
import SEO from '../components/SEO';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { title: "Hair Regrowth", img: "https://images.unsplash.com/photo-1626015401419-f5518b83960c?auto=format&fit=crop&q=80&w=800", color: "bg-blue-50" },
        { title: "Skin Health", img: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800", color: "bg-green-50" },
        { title: "Weight Management", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800", color: "bg-emerald-50" },
        { title: "Mental Vitality", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", color: "bg-purple-50" },
        { title: "Sexual Wellness", img: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=800", color: "bg-rose-50" },
    ];

    return (
        <div className="bg-white min-h-screen relative overflow-x-hidden">
            {/* Sub-navigation */}
            <div className="pt-24 pb-6 border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            </div>

            {/* Hero Section - Elevated Logo with Behind-the-Scenes Data */}
            <section className="relative z-30">
                <div className="container-wide py-16 relative flex flex-col items-center justify-center min-h-[40vh]">

                    {/* Background Rotating Data */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-0">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-[0.08] text-[var(--primary)]"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path id="circlePathInside" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                <text className="text-[4px] font-bold uppercase tracking-[2px]" fill="currentColor">
                                    <textPath xlinkHref="#circlePathInside">
                                        Clinical grade precision • Data driven diagnosis • Real results • No guesswork •
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>
                    </div>

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 md:p-10 rounded-full shadow-2xl relative z-50 border border-black/5"
                    >
                        <img src="/logo.png" alt="Man Labs" className="h-20 md:h-28 w-auto object-contain" />
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Man Labs */}
            <section className="bg-white relative z-40 -mt-16 md:-mt-20">
                <div className="container-wide">
                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-4"
                        >
                            Institutional Differentiator
                        </motion.p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center max-w-6xl mx-auto">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-bold leading-tight mb-8 uppercase tracking-tight"
                            >
                                Clinical efficacy over <br /><span className="text-[var(--primary)] italic font-light opacity-50">commodity products.</span>
                            </motion.h2>
                            <p className="text-base md:text-lg opacity-40 mb-10 font-medium leading-relaxed">
                                Most commercial entities prioritize distribution. We prioritize biological resolution:
                            </p>

                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest mb-12 opacity-30 flex-wrap">
                                <span>Diagnostics</span> <span className="text-[var(--primary)]">→</span>
                                <span>Protocol</span> <span className="text-[var(--primary)]">→</span>
                                <span>Optimization</span> <span className="text-[var(--primary)]">→</span>
                                <span>Resolution</span>
                            </div>

                            <ul className="space-y-5">
                                {[
                                    "Evidence-based treatment architecture",
                                    "AI-assisted diagnostic verification",
                                    "Licensed physician clinical review",
                                    "Adaptive follow-up protocols",
                                    "Modular simplified care routines",
                                    "Pharmacological-grade distribution"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-5 h-5 rounded-full bg-[var(--surface)] text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5 border border-black/5">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <span className="text-sm font-medium text-black/60">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl bg-[var(--surface)] relative z-10 border border-black/5">
                                <img src={doctorImage} alt="Man Labs Doctor" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--primary)] rounded-full blur-[100px] opacity-10 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We Started */}
            <section className="py-24 md:py-32 bg-[var(--surface)] relative overflow-hidden mt-24">
                <div className="container-wide relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-8 block">Project Foundation</span>
                        <h2 className="text-2xl md:text-3xl font-bold mb-12 uppercase tracking-tight">Systemic <br /><span className="italic font-light opacity-50">Intervention.</span></h2>
                        <div className="space-y-10 text-lg md:text-xl leading-relaxed font-heading opacity-50 font-medium italic">
                            <p>
                                "Male aesthetics in the Indian subcontinent is often mismanaged through anecdotal remedies and opaque distribution channels."
                            </p>
                            <p>
                                "The barrier to clinical-grade intervention remains high due to geographical constraints and the absence of standardized protocols."
                            </p>
                            <p className="text-[var(--primary)] not-italic font-bold uppercase text-xs tracking-widest opacity-80">
                                Institutional Goal: accessible pharmacological precision for every man.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full"><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern><rect width="100" height="100" fill="url(#grid)" /></svg>
                </div>
            </section>

            {/* Footer Note */}
            <div className="py-16 text-center opacity-20 text-[8px] font-bold uppercase tracking-[0.3em] border-t border-black/5">
                © 2025 Man Labs Technologies Inc. • Pharmacological Standards Council Approved
            </div>
        </div>
    );
};

export default About;
