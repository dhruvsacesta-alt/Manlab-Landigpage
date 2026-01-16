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
        const user = localStorage.getItem('manlab_user');
        const savedAnswers = JSON.parse(localStorage.getItem('manlab_assessment') || '{}');
        const cachedReport = JSON.parse(localStorage.getItem('manlab_active_report') || 'null');

        if (!user) {
            localStorage.setItem('redirect_after_login', '/assessment/results');
            navigate('/login');
            return;
        }

        // Check for cached report (handles refresh)
        if (cachedReport) {
            setDiagnosis(cachedReport.diagnosis);
            setAnswers(cachedReport.answers);
            setIsAnalyzing(false);
            return;
        }

        // If no answers and no cache, go back to start
        if (Object.keys(savedAnswers).length === 0) {
            navigate('/assessment');
            return;
        }

        // New: Check if consent was given before showing results
        if (!savedAnswers.finasteride_consent) {
            navigate('/assessment/consent');
            return;
        }

        window.scrollTo(0, 0);
        setAnswers(savedAnswers);

        const timer = setTimeout(() => {
            const result = calculateDiagnosis(savedAnswers);
            setDiagnosis(result);

            // Cache the complete report for refreshes
            localStorage.setItem('manlab_active_report', JSON.stringify({
                diagnosis: result,
                answers: savedAnswers
            }));

            setIsAnalyzing(false);
            // Clear temporary draft answers as requested
            localStorage.removeItem('manlab_assessment');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

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
        <div className="min-h-screen bg-[var(--background)] pt-32 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container-wide"
            >
                <div className="max-w-3xl mx-auto px-4 md:px-0">

                    {/* Header Section */}
                    <div className="text-center mb-8 md:mb-10">
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)] mb-3 md:mb-4 block underline underline-offset-8">Clinical Profile Created</span>
                        <h1 className="text-2xl md:text-4xl font-black font-heading leading-tight">Your Diagnostic <br /><span className="italic font-normal">Blueprint.</span></h1>
                    </div>

                    {/* Compact Diagnostic Card */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-xl mb-6 relative overflow-hidden border border-black/5">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between text-center md:text-left">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest w-fit border border-green-100 mx-auto md:mx-0">
                                    <Activity size={10} /> Results verified
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{diagnosis?.type}</h2>
                                <p className="text-xs md:text-sm opacity-60 leading-relaxed font-medium max-w-sm mx-auto md:mx-0">
                                    Condition detected as <strong>{diagnosis?.type}</strong> (Pattern-based hair thinning) at a <strong>{diagnosis?.severity} Stage</strong>.
                                </p>
                            </div>

                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 md:border-8 border-[var(--surface)] flex flex-col items-center justify-center relative shadow-sm bg-[var(--surface)]/10 shrink-0">
                                <span className="text-2xl md:text-3xl font-black text-[var(--primary)] leading-none">{diagnosis?.scores?.severity}</span>
                                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest opacity-40 mt-1">Severity</span>
                                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                    <circle
                                        cx="48" cy="48" r="44"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="4"
                                        strokeDasharray={`${(diagnosis?.scores?.severity / 10) * 276} 276`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 block md:hidden"
                                    />
                                    <circle
                                        cx="64" cy="64" r="58"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="8"
                                        strokeDasharray={`${(diagnosis?.scores?.severity / 10) * 364} 364`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 hidden md:block"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* NEW: AI Summary Card */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-xl mb-8 border border-black/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Brain size={60} />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                                <Clipboard size={16} />
                            </div>
                            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-40">AI Clinical Review Summary</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-[9px] md:text-[10px] font-black uppercase opacity-30 mb-1">Observation</h4>
                                    <p className="text-[11px] md:text-xs font-bold leading-relaxed opacity-80 italic">"Patient exhibits {answers.hairline === 'yes' ? 'visible hairline recession' : 'diffuse thinning'} over a duration of {answers.duration?.replace(/_/g, ' ')}."</p>
                                </div>
                                <div>
                                    <h4 className="text-[9px] md:text-[10px] font-black uppercase opacity-30 mb-1">Key Triggers</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(answers.triggers || ['none']).map(t => (
                                            <span key={t} className="px-2 py-0.5 md:py-1 bg-[var(--surface)] rounded-md text-[8px] md:text-[9px] font-bold uppercase">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 border-t md:border-t-0 md:border-l border-black/5 pt-4 md:pt-0 md:pl-10">
                                <div>
                                    <h4 className="text-[9px] md:text-[10px] font-black uppercase opacity-30 mb-1">Genetic Risk</h4>
                                    <p className="text-xs md:text-sm font-bold">{(!answers.family || answers.family.includes('none')) ? 'Low / Environmental' : 'Moderate to High'}</p>
                                </div>
                                <div>
                                    <h4 className="text-[9px] md:text-[10px] font-black uppercase opacity-30 mb-1">Scalp Health</h4>
                                    <p className="text-xs md:text-sm font-bold">{(answers.scalp && !answers.scalp.includes('none')) ? 'Reactive / Irritated' : 'Stable'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimalist Treatment Section */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-black/5 flex-1"></div>
                            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Prescription Protocol</h3>
                            <div className="h-px bg-black/5 flex-1"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-5 group hover:shadow-md transition-all">
                                <div className="w-20 h-20 rounded-2xl bg-[var(--surface)] overflow-hidden shrink-0 border border-black/5">
                                    <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Finasteride"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] text-[8px] font-black uppercase">Oral</span>
                                        <ShieldCheck size={12} className="text-green-500" />
                                    </div>
                                    <h4 className="text-base font-black text-[var(--text-dark)] leading-tight">Finasteride 1mg</h4>
                                    <p className="text-[11px] font-bold opacity-40 uppercase tracking-wider mt-1">DHT Blocker • Daily</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-5 group hover:shadow-md transition-all">
                                <div className="w-20 h-20 rounded-2xl bg-[var(--surface)] overflow-hidden shrink-0 border border-black/5">
                                    <img src="https://images.unsplash.com/photo-1550572017-edc9878201a0?auto=format&fit=crop&q=80&w=300"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Minoxidil"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[8px] font-black uppercase">Topical</span>
                                        <Sparkles size={12} className="text-[var(--primary)]" />
                                    </div>
                                    <h4 className="text-base font-black text-[var(--text-dark)] leading-tight">Minoxidil 5%</h4>
                                    <p className="text-[11px] font-bold opacity-40 uppercase tracking-wider mt-1">Vasodilator • 2x Daily</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimalist CTA */}
                    <div className="bg-[var(--text-dark)] rounded-[24px] md:rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] rounded-full -mr-16 -mt-16 blur-[60px] opacity-20"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between text-center md:text-left">
                            <div className="space-y-2">
                                <h2 className="text-lg md:text-2xl font-black leading-tight text-white">Proceed to Doctor Review.</h2>
                                <p className="text-[10px] md:text-sm text-white/60 max-w-xs mx-auto md:mx-0">
                                    Send this blueprint to our medical team for final prescription approval.
                                </p>
                            </div>
                            <Button className="w-full md:w-auto px-8 py-4 text-xs md:text-sm font-black bg-[var(--primary)] text-white hover:scale-105 transition-all shadow-xl shadow-[var(--primary)]/20">
                                Submit Plan <ChevronRight className="ml-2" size={14} />
                            </Button>
                        </div>
                    </div>

                    <p className="text-center text-[9px] opacity-30 mt-8 uppercase tracking-widest font-black">Electronic Signature Required in next step</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AssessmentResults;
