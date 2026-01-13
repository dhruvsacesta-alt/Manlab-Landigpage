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
        <section className="relative min-h-[92vh] flex items-center pt-32 overflow-hidden bg-[var(--background)]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--surface)] -skew-x-12 translate-x-1/3 opacity-30"></div>

            <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur border border-[var(--border)] mb-6 shadow-sm">
                        <ShieldCheck size={14} className="text-[var(--primary)]" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-light)]">Proven Medicine &bull; Clear Guidance</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-[var(--text-dark)] uppercase">
                        RECLAIM YOUR <br />
                        <span className="text-[var(--primary)] italic font-light">
                            confidence.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--text-light)] mb-8 max-w-lg leading-relaxed font-medium">
                        Hair loss is treatable. We make it simple.
                        <span className="block text-sm mt-3 opacity-70 font-normal leading-relaxed">
                            A personalised hair-loss plan, explained using AI support and approved by real doctors. Private follow-ups — from home.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Button
                            className="h-12 px-8 text-xs uppercase"
                            onClick={() => navigate('/assessment')}
                        >
                            Start Free Assessment <ArrowRight className="ml-2" size={14} />
                        </Button>
                    </div>

                    <div className="flex items-center gap-10 py-6 border-t border-[var(--border)]">
                        <div>
                            <p className="text-2xl font-bold text-[var(--primary)]">100%</p>
                            <p className="text-[9px] uppercase tracking-widest font-accent opacity-50 font-bold">Doctor Approved</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--primary)]">AI</p>
                            <p className="text-[9px] uppercase tracking-widest font-accent opacity-50 font-bold">Supported Analysis</p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Visual - Optimized for Performance */}
                <div className="relative mt-8 sm:mt-12 lg:mt-0">
                    <motion.div
                        style={{
                            y: smoothYParallax,
                            x: smoothX,
                            rotateX: useTransform(smoothY, [-15, 15], [5, -5]),
                            rotateY: useTransform(smoothX, [-15, 15], [-5, 5]),
                        }}
                        className="relative z-10 perspective-1000"
                    >
                        <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white mx-auto max-w-[280px] sm:max-w-md lg:max-w-none transform-gpu">
                            <img
                                src={heroImage}
                                alt="Man Labs Result"
                                className="w-full h-full object-cover"
                            />

                            {/* Floating UI Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-2xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50"
                            >
                                <div className="flex items-center justify-between mb-2 sm:mb-4">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <CheckCircle2 size={16} className="sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] sm:text-xs font-bold opacity-50 uppercase tracking-wider">Status</p>
                                            <p className="text-xs sm:text-sm font-bold text-[var(--text-dark)]">Verified Treatment</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-sm text-[var(--text-light)]">
                                    <div className="flex justify-between items-center bg-black/[0.03] px-3 py-2 rounded-xl">
                                        <span>AI Diagnosis</span>
                                        <strong className="text-[var(--primary)]">Detailed</strong>
                                    </div>
                                    <div className="flex justify-between items-center bg-black/[0.03] px-3 py-2 rounded-xl">
                                        <span>Doctor Review</span>
                                        <strong className="text-[var(--primary)]">Approved</strong>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--surface)] rounded-full blur-[60px] sm:blur-[100px] -z-10 opacity-60"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
