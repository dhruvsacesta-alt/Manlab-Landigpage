import React, { useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero.png';

const Hero = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    // Smooth Scroll Parallax
    const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
    const smoothYParallax = useSpring(yParallax, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Mouse Parallax with MotionValues (No re-renders)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for mouse movement
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX / window.innerWidth - 0.5) * 30;
            const moveY = (clientY / window.innerHeight - 0.5) * 30;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };

        if (window.innerWidth > 1024) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-[var(--background)]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-white skew-x-12 translate-x-1/3 opacity-[0.4] -z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--primary)] skew-x-12 translate-x-2/3 opacity-[0.03] -z-0"></div>

            <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-[var(--primary)]/10 mb-10 shadow-sm transition-all hover:border-[var(--primary)]/30">
                        <ShieldCheck size={16} className="text-[var(--primary)]" />
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--text-dark)] opacity-70">Physician Approved • Medical Grade</span>
                    </div>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight mb-10 text-[var(--text-dark)] uppercase">
                        GET YOUR <br />
                        <span className="text-[var(--primary)] italic font-light lowercase">
                            hair back.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--text-light)] mb-14 max-w-lg leading-relaxed font-medium">
                        "Proven clinical protocols. <span className="text-[var(--text-dark)] font-bold">Absolute transparency.</span>"
                        <span className="block text-sm sm:text-base mt-6 opacity-60 font-normal leading-relaxed max-w-sm italic">
                            Institutional hair recovery — precise diagnostics, pharmacist-grade formulations, and professional medical oversight from home.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-16">
                        <Button
                            className="h-14 px-12 text-[11px] uppercase bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all font-bold tracking-[0.2em] shadow-xl shadow-[var(--primary)]/20"
                            onClick={() => navigate('/assessment')}
                        >
                            Start Clinical Assessment <ArrowRight className="ml-3" size={16} />
                        </Button>
                    </div>

                    <div className="flex items-center gap-16 py-10 border-t border-[var(--primary)]/10">
                        <div>
                            <p className="text-3xl font-bold text-[var(--text-dark)] flex items-baseline gap-1">100<span className="text-sm text-[var(--primary)]">%</span></p>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mt-1">Doctor Approved</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-[var(--text-dark)] flex items-baseline gap-1">ALGO<span className="text-sm text-[var(--primary)]">®</span></p>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mt-1">Assisted Analysis</p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Visual - Optimized for Performance */}
                <div className="relative mt-12 lg:mt-0">
                    <motion.div
                        style={{
                            y: smoothYParallax,
                            x: smoothX,
                            rotateX: useTransform(smoothY, [-15, 15], [5, -5]),
                            rotateY: useTransform(smoothX, [-15, 15], [-5, 5]),
                        }}
                        className="relative z-10 perspective-2000"
                    >
                        <div className="relative aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(45,41,38,0.2)] border-[12px] border-white mx-auto max-w-[320px] sm:max-w-md lg:max-w-none transform-gpu group">
                            <img
                                src={heroImage}
                                alt="Man Labs Result"
                                className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-1000"
                            />

                            {/* Floating UI Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 bg-white/95 backdrop-blur-2xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white/50"
                            >
                                <div className="flex items-center justify-between mb-6 sm:mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--background)] flex items-center justify-center text-[var(--primary)] shadow-inner">
                                            <CheckCircle2 size={24} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] mb-1">Status Protocol</p>
                                            <p className="text-sm sm:text-base font-bold text-[var(--text-dark)] uppercase tracking-tight">Verified Patient</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3 text-xs sm:text-sm text-[var(--text-light)]">
                                    <div className="flex justify-between items-center bg-[var(--background)]/50 px-5 py-4 rounded-2xl border border-[var(--primary)]/5">
                                        <span className="font-bold uppercase text-[9px] tracking-widest opacity-40">AI Diagnosis</span>
                                        <strong className="text-[var(--primary)] uppercase text-[10px] tracking-widest">Completed</strong>
                                    </div>
                                    <div className="flex justify-between items-center bg-[var(--background)]/50 px-5 py-4 rounded-2xl border border-[var(--primary)]/5">
                                        <span className="font-bold uppercase text-[9px] tracking-widest opacity-40">Prescription</span>
                                        <strong className="text-[var(--primary)] uppercase text-[10px] tracking-widest">Released</strong>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[var(--primary)] rounded-full blur-[140px] -z-10 opacity-[0.05]"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
