import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero.png';

const Hero = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    // Mouse Parallax
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-[92vh] flex items-center pt-32 overflow-hidden bg-[var(--background)]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--surface)] -skew-x-12 translate-x-1/3 opacity-30"></div>

            {/* Animated Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur border border-[var(--border)] mb-8 shadow-sm"
                    >
                        <ShieldCheck size={16} className="text-[var(--primary)]" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-light)]">Proven Medicine &bull; Clear Guidance</span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95] tracking-tight mb-8 text-[var(--text-dark)]">
                        GET YOUR <br />
                        <span className="text-[var(--primary)] relative">
                            HAIR BACK
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--primary)] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[var(--text-light)] mb-8 max-w-xl leading-relaxed font-medium">
                        Hair loss is treatable. <br />We make it simple.
                        <span className="block text-base mt-2 opacity-70 font-normal">
                            A personalised hair-loss plan, explained using AI support and approved by real doctors. Private follow-ups — from home.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Button
                            className="h-16 px-10 text-lg shadow-xl shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 hover:-translate-y-1 transition-all duration-300"
                            onClick={() => navigate('/assessment')}
                        >
                            Start Your Free Hair Assessment <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-8 py-6 border-t border-[var(--border)]">
                        <div>
                            <p className="text-3xl font-black text-[var(--primary)]">100%</p>
                            <p className="text-xs uppercase tracking-widest font-accent opacity-50 font-bold">Doctor Approved</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-[var(--primary)]">AI</p>
                            <p className="text-xs uppercase tracking-widest font-accent opacity-50 font-bold">Supported Analysis</p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    style={{ y: y1 }}
                    className="relative mt-12 lg:mt-0"
                >
                    <motion.div
                        style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}
                        className="relative z-10"
                    >
                        <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white mx-auto max-w-md lg:max-w-none">
                            <img
                                src={heroImage}
                                alt="Man Labs Result"
                                className="w-full h-full object-cover"
                            />

                            {/* Floating UI Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/50"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold opacity-50 uppercase tracking-wider">Status</p>
                                            <p className="font-bold text-[var(--text-dark)]">Verified Treatment</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-[var(--text-light)]">
                                    <p>AI Diagnosis: <strong>Detailed</strong></p>
                                    <p>Doctor Review: <strong>Approved</strong></p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[var(--surface)] rounded-full blur-[100px] -z-10 opacity-60"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
