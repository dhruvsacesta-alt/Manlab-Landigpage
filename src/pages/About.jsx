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
        <div className="bg-[var(--background)] min-h-screen relative overflow-x-hidden text-[var(--text-dark)]">
            {/* Sub-navigation */}
            <div className="pt-24 pb-6 border-b border-[var(--primary)]/5 bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-50">
            </div>

            {/* Hero Section */}
            <section className="relative z-30">
                <div className="container-wide py-20 relative flex flex-col items-center justify-center min-h-[45vh]">
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

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/50 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative z-50 border border-[var(--primary)]/10"
                    >
                        <img src="/logo.png" alt="Man Labs" className="h-24 md:h-32 w-auto object-contain grayscale opacity-60" />
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Man Labs */}
            <section className="bg-[var(--background)] relative z-40 -mt-20">
                <div className="container-wide">
                    <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center max-w-7xl mx-auto">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-bold leading-tight mb-10 uppercase tracking-tight text-[var(--text-dark)]"
                            >
                                Clinical efficacy <br />over <span className="text-[var(--primary)] italic font-light lowercase">commodity care.</span>
                            </motion.h2>
                            <p className="text-lg md:text-xl text-[var(--text-light)] mb-12 font-medium leading-relaxed opacity-80">
                                Most entities prioritize distribution. We prioritize biological resolution through evidence-based architecture.
                            </p>

                            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] mb-14 text-[var(--primary)] opacity-40 flex-wrap">
                                <span>Diagnostics</span> <span className="text-black/10">→</span>
                                <span>Protocol</span> <span className="text-black/10">→</span>
                                <span>Optimization</span> <span className="text-black/10">→</span>
                                <span>Resolution</span>
                            </div>

                            <ul className="space-y-6">
                                {[
                                    "Evidence-based treatment architecture",
                                    "AI-assisted diagnostic verification",
                                    "Licensed physician clinical review",
                                    "Adaptive follow-up protocols",
                                    "Pharmacological-grade distribution"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-5">
                                        <div className="w-6 h-6 rounded-full bg-white text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5 border border-[var(--primary)]/10 shadow-sm">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <span className="text-base font-medium text-[var(--text-light)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(45,41,38,0.2)] bg-white relative z-10 border border-[var(--primary)]/10">
                                <img src={doctorImage} alt="Man Labs Doctor" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[var(--primary)] rounded-full blur-[120px] opacity-10 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We Started (Project Foundation) */}
            <section className="py-32 md:py-48 bg-white/30 backdrop-blur-sm relative overflow-hidden mt-32 border-t border-[var(--primary)]/5">
                <div className="container-wide relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-16 uppercase tracking-tight text-[var(--text-dark)]">
                            Systemic <br /><span className="text-[var(--primary)] italic font-light lowercase">Intervention.</span>
                        </h2>
                        <div className="space-y-12 text-xl md:text-2xl leading-relaxed text-[var(--text-light)] font-medium italic opacity-80">
                            <p>
                                "Male aesthetics in the Indian subcontinent is often mismanaged through anecdotal remedies and opaque distribution channels."
                            </p>
                            <p>
                                "The barrier to clinical-grade intervention remains high due to geographical constraints and the absence of standardized protocols."
                            </p>
                            <p className="text-[var(--primary)] not-italic font-bold uppercase text-sm tracking-[0.4em] opacity-100 mt-16">
                                Accessible medical precision for every man.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full"><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern><rect width="100" height="100" fill="url(#grid)" /></svg>
                </div>
            </section>

            {/* Footer Note */}
            <div className="py-20 text-center opacity-30 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-light)] border-t border-[var(--primary)]/5">
                © 2025 Man Labs India • Institutional Oversight Mandatory
            </div>
        </div>
    );
};

export default About;
