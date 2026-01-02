import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import doctorImage from '../assets/doctor.png';
import heroImage from '../assets/hero.png';

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
                <div className="container-wide py-20 relative flex flex-col items-center justify-center min-h-[45vh]">

                    {/* Background Rotating Data - Layer 0 (Goes behind the section below) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-0">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="w-[380px] h-[380px] md:w-[600px] md:h-[600px] opacity-[0.12] text-[var(--primary)]"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path id="circlePathInside" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                <text className="text-[5px] font-black uppercase tracking-[2px]" fill="currentColor">
                                    <textPath xlinkHref="#circlePathInside">
                                        Clinical grade precision • Data driven diagnosis • Real results • No guesswork •
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>
                    </div>

                    {/* Logo - Layer 50 (Floats above EVERYTHING) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 md:p-12 rounded-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] relative z-50 border border-white/20"
                    >
                        <img src="/logo.png" alt="Man Labs" className="h-24 md:h-36 w-auto object-contain" />
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Man Labs - Layer 10 (Middle) */}
            <section className="bg-white relative z-40 -mt-24 md:-mt-32">
                <div className="container-wide">
                    <div className="text-center mb-20">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-4"
                        >
                            The Man Labs Difference
                        </motion.p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black leading-tight mb-8"
                            >
                                We don’t sell bottles — <span className="text-[var(--primary)]">we deliver real treatment.</span>
                            </motion.h2>
                            <p className="text-xl opacity-60 mb-8 leading-relaxed">
                                Most brands push products. We fix the actual problem:
                            </p>

                            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest mb-12 opacity-80 flex-wrap">
                                <span>Correct Diagnosis</span> <span className="text-[var(--primary)]">→</span>
                                <span>Right Treatment</span> <span className="text-[var(--primary)]">→</span>
                                <span>Consistency</span> <span className="text-[var(--primary)]">→</span>
                                <span>Results</span>
                            </div>

                            <ul className="space-y-6">
                                {[
                                    "A personalised treatment plan backed by clinical science",
                                    "AI-supported explanations for clarity and accuracy",
                                    "A licensed doctor who confirms your plan",
                                    "Follow-ups that keep you consistent",
                                    "Simple routines designed for real life",
                                    "Pricing made for long-term use, not short-term sales"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[var(--surface)] text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <span className="font-medium text-[var(--text-light)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl bg-[var(--surface)] relative z-10">
                                <img src={doctorImage} alt="Man Labs Doctor" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[var(--primary)] rounded-full blur-[100px] opacity-20 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We Started */}
            <section className="py-32 bg-[var(--surface)] relative overflow-hidden">
                <div className="container-wide relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-8 block">Our Mission</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-12">WHY WE STARTED MAN LABS</h2>
                        <div className="space-y-8 text-xl md:text-2xl leading-relaxed font-heading opacity-80">
                            <p>
                                "Hair loss in India is surrounded by confusion — myths, home remedies, and no clarity on what actually works."
                            </p>
                            <p>
                                "Most men don’t get proper treatment because clinics aren’t accessible, advice is inconsistent, and reliable information is hard to find."
                            </p>
                            <p className="text-[var(--primary)] italic font-bold">
                                "And truthfully, coconut oil is great, but it’s not bringing back your hairline."
                            </p>
                            <p>
                                "We built Man Labs to cut through the noise and give men simple, proven, accessible solutions backed by real medical oversight."
                            </p>
                        </div>
                    </div>
                </div>
                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full"><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern><rect width="100" height="100" fill="url(#grid)" /></svg>
                </div>
            </section>

            {/* Footer Note */}
            <div className="py-20 text-center opacity-30 text-[10px] font-bold uppercase tracking-widest border-t border-black/5">
                © 2025 Man Labs Technologies Inc. • Medical Board Approved
            </div>
        </div>
    );
};

export default About;
