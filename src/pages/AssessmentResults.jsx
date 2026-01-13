import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { calculateDiagnosis } from '../utils/diagnosisEngine';
import { Sparkles, Check, ShieldCheck, Activity, Brain, Clipboard, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const AssessmentResults = () => {
    const navigate = useNavigate();
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [diagnosis, setDiagnosis] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        const savedAnswers = JSON.parse(localStorage.getItem('manlab_assessment') || '{}');
        setAnswers(savedAnswers);

        const timer = setTimeout(() => {
            const result = calculateDiagnosis(savedAnswers);
            setDiagnosis(result);
            setIsAnalyzing(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-full border-t-2 border-b-2 border-r-2 border-[var(--primary)]"
                    />
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center text-[var(--primary)]"
                    >
                        <Brain size={32} className="animate-pulse" />
                    </motion.div>
                </div>

                <h1 className="text-2xl font-black mb-4 uppercase tracking-widest">Protocol Generation...</h1>
                <div className="max-w-xs space-y-3 opacity-40 uppercase tracking-[0.2em] text-[8px] font-black">
                    <p className="flex items-center justify-center gap-2"><Check size={10} /> Validating clinical inputs</p>
                    <p className="flex items-center justify-center gap-2"><Check size={10} /> Running pattern matching</p>
                    <p className="flex items-center justify-center gap-2"><Check size={10} /> Finalizing doctor brief</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] pt-24 md:pt-32 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container-wide"
            >
                <div className="max-w-2xl mx-auto px-4 md:px-0">

                    {/* Header Section */}
                    <div className="text-center mb-8 md:mb-10">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-3 block">Diagnostic Profile</span>
                        <h1 className="text-2xl md:text-3xl font-bold font-heading leading-tight uppercase">Your Personal <br /><span className="italic font-light">Blueprint.</span></h1>
                    </div>

                    {/* Compact Diagnostic Card */}
                    <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl mb-6 relative overflow-hidden border border-black/5">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between text-center md:text-left">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[8px] md:text-[9px] font-bold uppercase tracking-widest w-fit border border-green-100 mx-auto md:mx-0">
                                    <Activity size={10} /> Clinical Integrity Verified
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight">{diagnosis?.type}</h2>
                                <p className="text-xs md:text-sm opacity-60 leading-relaxed font-medium max-w-xs mx-auto md:mx-0">
                                    Pattern-based thinning detected at a <strong>{diagnosis?.severity} Stage</strong>.
                                </p>
                            </div>

                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 md:border-6 border-[var(--surface)] flex flex-col items-center justify-center relative shadow-sm bg-[var(--surface)]/10 shrink-0">
                                <span className="text-xl md:text-2xl font-bold text-[var(--primary)] leading-none">{diagnosis?.scores?.severity}</span>
                                <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest opacity-40 mt-1">Score</span>
                                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                    <circle
                                        cx="40" cy="40" r="37"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="3"
                                        strokeDasharray={`${(diagnosis?.scores?.severity / 10) * 232} 232`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 block md:hidden"
                                    />
                                    <circle
                                        cx="56" cy="56" r="52"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="5"
                                        strokeDasharray={`${(diagnosis?.scores?.severity / 10) * 326} 326`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 hidden md:block"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* NEW: AI Summary Card */}
                    <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm mb-8 border border-black/5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-6 opacity-40">
                            <Brain size={14} className="text-[var(--primary)]" />
                            <h3 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">Clinical Observation Summary</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-[9px] font-black uppercase opacity-20 mb-1">Key Findings</h4>
                                    <p className="text-[11px] md:text-xs font-medium leading-relaxed opacity-80 italic">"Observation of {answers.hairline === 'yes' ? 'hairline recession' : 'diffuse thinning'} over {answers.duration?.replace(/_/g, ' ')}."</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-[9px] font-black uppercase opacity-20 mb-1">Genetic</h4>
                                        <p className="text-[11px] font-bold">{(!answers.family || answers.family.includes('none')) ? 'Low' : 'High'}</p>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[9px] font-black uppercase opacity-20 mb-1">Scalp</h4>
                                        <p className="text-[11px] font-bold">{(answers.scalp && !answers.scalp.includes('none')) ? 'Sensitive' : 'Healthy'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:border-l border-black/5 md:pl-8">
                                <h4 className="text-[9px] font-black uppercase opacity-20 mb-2">Primary Triggers</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {(answers.triggers || ['none']).map(t => (
                                        <span key={t} className="px-2 py-1 bg-[var(--surface)] rounded text-[8px] font-bold uppercase tracking-tighter">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Treatment Protocol */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-4 mb-4 opacity-20">
                            <div className="h-px bg-black flex-1"></div>
                            <h3 className="text-[8px] font-black uppercase tracking-[0.4em]">Prescription Protocol</h3>
                            <div className="h-px bg-black flex-1"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex items-center gap-4 group">
                                <div className="w-16 h-16 rounded-xl bg-[var(--surface)] overflow-hidden shrink-0 border border-black/5">
                                    <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300"
                                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                        alt="Finasteride"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[7px] font-black uppercase bg-[var(--primary)]/10 text-[var(--primary)] px-1.5 py-0.5 rounded">Oral (Capsule)</span>
                                    <h4 className="text-sm font-bold text-[var(--text-dark)] leading-tight mt-1">Finasteride 1mg</h4>
                                    <p className="text-[9px] font-medium opacity-40 uppercase tracking-widest mt-0.5">DHT Block • Daily</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex items-center gap-4 group">
                                <div className="w-16 h-16 rounded-xl bg-[var(--surface)] overflow-hidden shrink-0 border border-black/5">
                                    <img src="https://images.unsplash.com/photo-1550572017-edc9878201a0?auto=format&fit=crop&q=80&w=300"
                                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                        alt="Minoxidil"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[7px] font-black uppercase bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">Topical (Solution)</span>
                                    <h4 className="text-sm font-bold text-[var(--text-dark)] leading-tight mt-1">Minoxidil 5%</h4>
                                    <p className="text-[9px] font-medium opacity-40 uppercase tracking-widest mt-0.5">Growth • 2x Daily</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimalist CTA */}
                    <div className="bg-[var(--text-dark)] rounded-[24px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] rounded-full -mr-16 -mt-16 blur-[60px] opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between text-center md:text-left">
                            <div className="space-y-1">
                                <h2 className="text-lg md:text-xl font-bold leading-tight text-white uppercase tracking-tight">Consult with a Specialist.</h2>
                                <p className="text-[10px] md:text-xs text-white/50 max-w-xs mx-auto md:mx-0">
                                    Request official clinical review and personalized prescription approval.
                                </p>
                            </div>
                            <Button className="h-10 px-6 text-[10px] uppercase font-bold tracking-widest bg-[var(--primary)] text-white shrink-0">
                                Send to Review <ChevronRight className="ml-2" size={14} />
                            </Button>
                        </div>
                    </div>

                    <p className="text-center text-[8px] opacity-30 mt-8 uppercase tracking-[0.3em] font-black italic">Certified Blueprint • Physician Review Pending</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AssessmentResults;
