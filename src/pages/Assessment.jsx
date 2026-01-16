import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { Camera, Check, AlertCircle, ChevronRight, Lock } from 'lucide-react';

// Example Photos
import frontExample from '../assets/examples/front.png';
import topExample from '../assets/examples/top.png';
import leftExample from '../assets/examples/left_temple.png';
import rightExample from '../assets/examples/right_temple.png';
import crownExample from '../assets/examples/crown.png';

const StepWrapper = ({ title, subtitle, step, children, backStep, nextStep, error }) => (
    <motion.div
        key={`step-${step}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-3xl mx-auto w-full bg-white p-5 md:p-14 rounded-[32px] md:rounded-[40px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.1)] h-[580px] md:h-[700px] flex flex-col relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-bl-[100px] pointer-events-none"></div>

        <div className="mb-8 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-3 block">Step {step + 1} of 12</span>
            <h2 className="text-xl md:text-3xl font-black mb-1 md:mb-2 leading-tight font-heading">{title}</h2>
            {subtitle && <p className="opacity-50 text-[10px] md:text-base font-medium">{subtitle}</p>}
        </div>

        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4">
            {children}
        </div>

        <div className="mt-8 flex justify-between items-center pt-6 border-t border-black/5 shrink-0">
            {step > 0 ? (
                <button
                    type="button"
                    onClick={() => {
                        backStep();
                        setError('');
                    }}
                    className="text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                    Back
                </button>
            ) : <div />}

            <div className="flex flex-col items-center gap-2">
                <Button onClick={nextStep} className="px-10 py-5 text-sm font-black w-full sm:w-auto">
                    {step === 11 ? 'Analyze Results' : 'Next'} <ChevronRight size={18} className="ml-1" />
                </Button>
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="text-[10px] font-bold text-red-500 uppercase tracking-widest text-center mt-2"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </motion.div>
);

const Assessment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState(() => {
        const saved = localStorage.getItem('manlab_assessment');
        return saved ? JSON.parse(saved) : {};
    });
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    const handleAnswer = (key, value) => {
        const updatedAnswers = { ...answers, [key]: value };
        setAnswers(updatedAnswers);
        setError(''); // Clear error when user makes a selection
        localStorage.setItem('manlab_assessment', JSON.stringify(updatedAnswers));
    };

    const nextStep = () => {
        // Validation for each step
        const isStepValid = () => {
            if (step === 0) return true; // Intro step
            if (step === 1) return answers.age && answers.age >= 18;
            if (step === 2) return answers.duration;
            if (step === 3) return answers.pattern && answers.pattern.length > 0;
            if (step === 4) return answers.hairline;
            if (step === 5) return answers.shedding;
            if (step === 6) return answers.triggers && answers.triggers.length > 0;
            if (step === 7) return answers.scalp && answers.scalp.length > 0;
            if (step === 8) return answers.family && answers.family.length > 0;
            if (step === 9) return answers.treatments && answers.treatments.length > 0;
            if (step === 10) return answers.description;
            if (step === 11) {
                // Check if all photos are uploaded (simulation)
                return [0, 1, 2, 3, 4].every(i => answers[`photo_${i}`]);
            }
            return false;
        };

        if (!isStepValid()) {
            setError('Please complete this step to proceed.');
            return;
        }

        if (step === 11) {
            const user = localStorage.getItem('manlab_user');
            if (user) {
                navigate('/assessment/consent');
            } else {
                // Store that we want to go to consent after login
                localStorage.setItem('redirect_after_login', '/assessment/consent');
                navigate('/login');
            }
        } else {
            setStep(prev => prev + 1);
        }
    };

    const backStep = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="bg-[var(--surface)] p-8 rounded-3xl mb-4 border border-black/5">
                            <div className="flex gap-4 items-start opacity-70">
                                <Lock size={20} className="text-[var(--primary)] shrink-0" />
                                <p className="text-sm font-medium">Your answers are encrypted and strictly confidential. Reviewed only by licensed medical doctors according to HIPAA standards.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { id: 1, text: "Clinical Questionnaire" },
                                { id: 2, text: "Scalp Analysis (Photo Upload)" },
                                { id: 3, text: "AI & Doctor Review" }
                            ].map(item => (
                                <div key={item.id} className="flex items-center gap-5 p-6 bg-[var(--surface)]/50 border border-black/5 rounded-2xl">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm text-[var(--primary)] flex items-center justify-center font-black text-sm">{item.id}</div>
                                    <p className="font-black text-sm uppercase tracking-wider opacity-80">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6 max-w-[200px] mx-auto py-10">
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="00"
                                onWheel={(e) => e.target.blur()}
                                className="w-full text-4xl font-black p-6 bg-[var(--surface)]/50 rounded-2xl outline-none focus:ring-2 ring-[var(--primary)] transition-all placeholder:opacity-10 text-center border border-black/5"
                                onChange={(e) => handleAnswer('age', e.target.value)}
                                value={answers.age || ''}
                                autoFocus
                            />
                            <div className="absolute -bottom-8 left-0 right-0 text-center">
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Years Old</span>
                            </div>
                        </div>
                        {answers.age && answers.age < 18 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 -bottom-20 p-3 bg-red-50 text-red-600 rounded-xl text-[9px] font-bold flex gap-2 items-center justify-center border border-red-100">
                                <AlertCircle size={12} /> Minimum age requirement is 18+.
                            </motion.div>
                        )}
                    </div>
                );
            case 2:
            case 4:
            case 5:
            case 7:
            case 9:
            case 10:
                let opts = [];
                let key = '';
                if (step === 2) {
                    opts = ['Less than 3 months', '3 – 6 months', '6 – 12 months', 'More than 12 months'];
                    key = 'duration';
                } else if (step === 4) {
                    opts = ['Yes, clearly receding', 'Slightly / Not Sure', 'No change'];
                    key = 'hairline';
                } else if (step === 5) {
                    opts = ['Handfuls (Sudden & Heavy)', 'Mild but consistent', 'Gradual thinning over years', 'Not sure'];
                    key = 'shedding';
                } else if (step === 7) {
                    opts = ['White Flakes (Dandruff)', 'Oily Yellow Flakes', 'Persistent Itching', 'Redness / Irritation', 'None'];
                    key = 'scalp';
                } else if (step === 9) {
                    opts = ['Minoxidil (Topical)', 'Finasteride (Oral)', 'Hair Supplements', 'Anti-dandruff Shampoo', 'None'];
                    key = 'treatments';
                } else if (step === 10) {
                    opts = ['Mostly normal scalp, just shedding', 'Visible flakes + Persistent itching', 'Redness / irritation + Itching', 'Thinning clearly at front hairline', 'Scalp is healthy but hair feels weak'];
                    key = 'description';
                }
                return (
                    <div className="grid grid-cols-1 gap-4">
                        {opts.map((opt, i) => {
                            const val = step === 2 ? ['less_3_months', '3_6_months', '6_12_months', 'more_12_months'][i] : (step === 4 ? ['yes', 'slightly', 'no'][i] : (step === 5 ? ['sudden', 'mild', 'gradual', 'unsure'][i] : opt));
                            const isSelected = key === 'scalp' || key === 'treatments' ? answers[key]?.includes(val) : answers[key] === val;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                        if (key === 'scalp' || key === 'treatments') {
                                            const curr = answers[key] || [];
                                            handleAnswer(key, isSelected ? curr.filter(v => v !== val) : [...curr, val]);
                                        } else {
                                            handleAnswer(key, val);
                                        }
                                    }}
                                    className={`w-full p-4 md:p-8 text-left font-black rounded-[18px] md:rounded-[24px] transition-all border-2 flex justify-between items-center gap-3 ${isSelected ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xl' : 'bg-[var(--surface)] border-transparent hover:border-black/10'}`}
                                >
                                    <span className="text-[11px] md:text-base leading-snug break-words">{opt}</span>
                                    {isSelected && <Check size={16} className="shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                );
            case 3:
                return (
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { label: 'Front Hairline / Temples', val: 'front_temples' },
                            { label: 'Crown (Vertex)', val: 'crown' },
                            { label: 'Overall / Diffuse', val: 'diffuse' },
                            { label: 'Only in shower (no visible spots)', val: 'shower_only' }
                        ].map((opt, i) => {
                            const isSelected = answers.pattern?.includes(opt.val);
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                        const current = answers.pattern || [];
                                        const next = isSelected ? current.filter(v => v !== opt.val) : [...current, opt.val];
                                        handleAnswer('pattern', next);
                                    }}
                                    className={`w-full p-4 md:p-8 text-left font-black rounded-[18px] md:rounded-[24px] transition-all border-2 flex justify-between items-center gap-3 ${isSelected ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xl' : 'bg-[var(--surface)] border-transparent hover:border-black/10'}`}
                                >
                                    <span className="text-[11px] md:text-base leading-snug break-words">{opt.label}</span>
                                    {isSelected && <Check size={16} className="shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                );
            case 6:
                return (
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {/* Grid optimized for 320px screens */}
                        {[
                            { label: 'High Fever', val: 'fever' },
                            { label: 'High Stress', val: 'stress' },
                            { label: 'Crash Diet', val: 'diet' },
                            { label: 'Medication', val: 'meds' },
                            { label: 'Surgery', val: 'surgery' },
                            { label: 'None', val: 'none' }
                        ].map((opt, i) => {
                            const isSelected = answers.triggers?.includes(opt.val);
                            return (
                                <button key={i}
                                    type="button"
                                    onClick={() => {
                                        const current = answers.triggers || [];
                                        const next = isSelected ? current.filter(v => v !== opt.val) : [...current, opt.val];
                                        handleAnswer('triggers', next);
                                    }}
                                    className={`p-3 md:p-6 text-center font-black rounded-[16px] md:rounded-[20px] transition-all border-2 ${isSelected ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-transparent'}`}
                                >
                                    <p className="text-[9px] md:text-xs uppercase tracking-tight leading-tight">{opt.label}</p>
                                </button>
                            );
                        })}
                    </div>
                );
            case 8:
                return (
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {[
                            { label: 'Father', val: 'father' },
                            { label: 'Mother', val: 'mother' },
                            { label: 'Sibling', val: 'sibling' },
                            { label: 'Grandparents', val: 'grandparents' },
                            { label: 'No one', val: 'none' }
                        ].map((opt, i) => {
                            const isSelected = answers.family?.includes(opt.val);
                            return (
                                <button key={i}
                                    type="button"
                                    onClick={() => {
                                        const current = answers.family || [];
                                        const next = isSelected ? current.filter(v => v !== opt.val) : [...current, opt.val];
                                        handleAnswer('family', next);
                                    }}
                                    className={`p-3 md:p-6 text-center font-black rounded-[16px] md:rounded-[20px] transition-all border-2 ${isSelected ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-transparent'}`}
                                >
                                    <p className="text-[9px] md:text-xs uppercase tracking-tight leading-tight">{opt.label}</p>
                                </button>
                            );
                        })}
                    </div>
                );
            case 11:
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'Front', example: frontExample },
                                { name: 'Top', example: topExample },
                                { name: 'Left', example: leftExample },
                                { name: 'Right', example: rightExample },
                                { name: 'Crown', example: crownExample }
                            ].map((item, i) => (
                                <div key={i} className="bg-[var(--surface)] p-5 rounded-[32px] border border-black/5">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[11px] font-black uppercase tracking-widest opacity-50">{item.name} View</span>
                                        {answers[`photo_${i}`] && <div className="bg-[var(--primary)] text-white p-1 rounded-full"><Check size={12} /></div>}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1/2 aspect-square rounded-2xl overflow-hidden relative border border-black/5 bg-white">
                                            <img src={item.example} alt={item.name} className="w-full h-full object-cover transition-all" />
                                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[8px] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Example</div>
                                        </div>
                                        <div
                                            onClick={() => handleAnswer(`photo_${i}`, true)}
                                            className={`w-1/2 aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${answers[`photo_${i}`] ? 'bg-white border-[var(--primary)]' : 'border-black/10 hover:border-[var(--primary)]/50 bg-white/50'}`}
                                        >
                                            <Camera className={`${answers[`photo_${i}`] ? 'text-[var(--primary)]' : 'opacity-20'} group-hover:opacity-100 transition-opacity`} size={24} />
                                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Tap to Upload</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-[10px] opacity-40 mt-8 font-black uppercase tracking-[0.2em] italic">* Your privacy is our priority. These photos are strictly for clinical diagnostic use.</p>
                    </>
                );
            default: return null;
        }
    };

    const getStepInfo = () => {
        const infos = [
            { title: "Medical Assessment", subtitle: "Let's build your clinical profile. Diagnosis takes about 2 minutes." },
            { title: "How old are you?", subtitle: "Age is a critical factor in determining treatment safety." },
            { title: "Duration of hair fall", subtitle: "How long have you noticed thinning?" },
            { title: "Where is the thinning?", subtitle: "Select all that apply to your pattern." },
            { title: "Hairline Status", subtitle: "Have you noticed your hairline moving back?" },
            { title: "Shedding Severity", subtitle: "How would you describe the hair fall?" },
            { title: "Recent Triggers", subtitle: "Did hair fall start after any of these? (Select all)" },
            { title: "Scalp Health", subtitle: "Do you have any of these symptoms?" },
            { title: "Family History", subtitle: "Who in your family has visible thinning?" },
            { title: "Previous Treatments", subtitle: "Used any of these in the last year?" },
            { title: "Describe your scalp", subtitle: "Choose the statement that fits you best." },
            { title: "Scalp Photos", subtitle: "Mandatory clinical requirement for valid prescription." }
        ];
        return infos[step] || { title: "", subtitle: "" };
    };

    const { title, subtitle } = getStepInfo();

    return (
        <div className="min-h-screen bg-[var(--background)] pt-32 pb-20">
            <div className="container-wide">
                <div className="max-w-3xl mx-auto mb-8 md:mb-12 px-4 md:px-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 mb-4">
                        <div className="flex gap-1 h-1 md:h-1.5 w-full md:max-w-[200px]">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className={`h-full flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-[var(--primary)]' : 'bg-black/5'}`} />
                            ))}
                        </div>
                        <span className="text-[8px] md:text-[10px] font-black opacity-30 uppercase tracking-[0.2em] whitespace-nowrap">{Math.round((step / 11) * 100)}% Complete</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <StepWrapper
                        key={`step-${step}`}
                        title={title}
                        subtitle={subtitle}
                        step={step}
                        backStep={backStep}
                        nextStep={nextStep}
                        error={error}
                    >
                        {renderStepContent()}
                    </StepWrapper>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Assessment;
