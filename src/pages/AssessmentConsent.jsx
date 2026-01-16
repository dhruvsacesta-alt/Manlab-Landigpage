import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronRight, Info } from 'lucide-react';
import Button from '../ui/Button';
import SEO from '../components/SEO';

const AssessmentConsent = () => {
    const navigate = useNavigate();
    const [selection, setSelection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('manlab_user');
        if (!user) {
            localStorage.setItem('redirect_after_login', '/assessment/consent');
            navigate('/login');
        }
        window.scrollTo(0, 0);
    }, [navigate]);

    const handleProceed = () => {
        if (!selection) return;

        if (selection === 'no') {
            setError('Medical protocol consent is mandatory to generate your clinical report. If you prefer alternative options, our doctors still require acknowledgment of the standard protocol first.');
            return;
        }

        // Save the consent answer to the assessment data
        const savedAnswers = JSON.parse(localStorage.getItem('manlab_assessment') || '{}');
        savedAnswers.finasteride_consent = selection;
        localStorage.setItem('manlab_assessment', JSON.stringify(savedAnswers));

        navigate('/assessment/results');
    };

    return (
        <div className="min-h-screen bg-[var(--background)] pt-32 pb-20">
            <SEO
                title="Prescription Consent"
                description="Medical assessment for prescription hair loss treatment."
            />
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto bg-white p-8 md:p-14 rounded-[32px] md:rounded-[40px] shadow-[0_32px_80_ -20px_rgba(0,0,0,0.1)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-bl-[100px] pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <h1 className="text-xl md:text-2xl font-black font-heading leading-tight text-[var(--text-dark)]">Clinical Protocol Consent</h1>
                    </div>

                    <div className="prose prose-sm max-w-none text-[var(--text-dark)]/70 space-y-4 mb-8 leading-relaxed font-medium">
                        <p className="text-sm">Some types of hair loss are driven by genetics and hormones and tend to progress over time if left untreated.</p>

                        <div className={`space-y-4 transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 mb-0'}`}>
                            <p>For this type of hair loss, <strong>finasteride</strong> is the most effective, most extensively studied, and most reliable medical treatment available to slow or stop further thinning. It directly targets DHT, the hormone responsible for follicle miniaturization and long-term hair loss progression.</p>
                            <p>Finasteride has been used worldwide for over 25 years, is supported by large clinical studies, and is considered the gold-standard, first-line treatment by dermatologists for genetic hair loss.</p>
                            <p>Unlike cosmetic or supportive products, finasteride treats the root cause of genetic hair loss and is the only medication consistently shown to preserve existing hair long-term when used appropriately.</p>
                            <div className="bg-[var(--surface)]/50 p-6 rounded-2xl border border-black/5">
                                <p className="mb-3 font-bold text-[var(--text-dark)] text-[10px] uppercase tracking-widest">Medical Safety Profile</p>
                                <p className="text-[11px]">Most men take finasteride without any issues. A small percentage (around 1–2%) may experience side effects such as reduced libido or mood changes, which are usually mild and reversible after stopping.</p>
                            </div>
                            <p>Finasteride does not lower testosterone levels and does not affect fertility in most men.</p>
                            <p>If oral finasteride is not suitable or not tolerated, the reviewing doctor may recommend secondary or alternative approaches, based on your medical profile.</p>
                            <p className="italic text-[10px] opacity-60">No prescription medication will be started unless a licensed doctor reviews your answers and scalp photos.</p>
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 text-[var(--primary)] font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                        >
                            {isExpanded ? 'View Less' : 'Read Full Protocol Details +'}
                        </button>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-black/5">
                        <h2 className="text-base md:text-lg font-black leading-tight">
                            If the reviewing doctor determines that finasteride is appropriate for your condition, are you open to it being included in your treatment plan?
                        </h2>

                        <div className="grid gap-3">
                            <button
                                onClick={() => {
                                    setSelection('yes');
                                    setError('');
                                }}
                                className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${selection === 'yes' ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg' : 'bg-[var(--surface)]/30 border-transparent hover:border-black/10'}`}
                            >
                                <div className="flex flex-col">
                                    <span className="font-black text-sm uppercase tracking-widest">Yes</span>
                                    <span className={`text-[10px] md:text-xs opacity-60 ${selection === 'yes' ? 'text-white' : ''}`}>I am open to the doctor recommending finasteride if medically appropriate</span>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selection === 'yes' ? 'border-white bg-white/20' : 'border-black/10'}`}>
                                    {selection === 'yes' && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                                </div>
                            </button>

                            <button
                                onClick={() => setSelection('no')}
                                className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${selection === 'no' ? 'bg-[var(--text-dark)] text-white border-[var(--text-dark)] shadow-lg' : 'bg-[var(--surface)]/30 border-transparent hover:border-black/10'}`}
                            >
                                <div className="flex flex-col">
                                    <span className="font-black text-sm uppercase tracking-widest">No</span>
                                    <span className={`text-[10px] md:text-xs opacity-60 ${selection === 'no' ? 'text-white' : ''}`}>I would prefer the doctor to consider alternative options</span>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selection === 'no' ? 'border-white bg-white/20' : 'border-black/10'}`}>
                                    {selection === 'no' && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                                </div>
                            </button>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-[11px] font-bold leading-relaxed"
                                >
                                    <Info size={16} className="shrink-0 mt-0.5" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                            <div className="flex items-start gap-2 opacity-40 px-2 max-w-sm">
                                <Info size={14} className="shrink-0 mt-0.5" />
                                <p className="text-[9px] md:text-[10px] font-medium leading-relaxed uppercase tracking-wider">
                                    Your response helps guide the doctor’s recommendation. Final treatment decisions are always made by the reviewing doctor.
                                </p>
                            </div>
                            <Button
                                onClick={handleProceed}
                                disabled={!selection}
                                className="w-full md:w-auto px-10 py-5 text-sm font-black"
                            >
                                {selection === 'no' ? 'Recommend Alternatives' : 'Continue to Analysis'} <ChevronRight size={18} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AssessmentConsent;
