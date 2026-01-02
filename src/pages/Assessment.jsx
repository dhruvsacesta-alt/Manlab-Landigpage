import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { calculateDiagnosis } from '../utils/diagnosisEngine';
import { Camera, Check, AlertCircle, ChevronRight, Lock, UploadCloud, Sparkles, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

// Example Photos
import frontExample from '../assets/examples/front.png';
import topExample from '../assets/examples/top.png';
import leftExample from '../assets/examples/left_temple.png';
import rightExample from '../assets/examples/right_temple.png';
import crownExample from '../assets/examples/crown.png';

const Assessment = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [diagnosis, setDiagnosis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        // Validation logic can go here
        setStep(prev => prev + 1);
    };

    const submitAssessment = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const result = calculateDiagnosis(answers);
            setDiagnosis(result);
            setIsAnalyzing(false);
            setStep('complete'); // Move to results view
        }, 2000); // Fake analysis delay
    };

    // Generic Step Wrapper
    const StepWrapper = ({ title, subtitle, children }) => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="md:max-w-2xl mx-auto w-full bg-white p-6 md:p-12 rounded-[30px] md:rounded-[40px] shadow-2xl h-[85vh] md:h-[650px] flex flex-col relative"
        >
            <div className="mb-6 md:mb-8 shrink-0">
                <h2 className="text-2xl md:text-4xl font-black mb-2 leading-tight">{title}</h2>
                {subtitle && <p className="opacity-50 text-lg">{subtitle}</p>}
            </div>
            <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {children}
            </div>
            <div className="mt-8 flex justify-between items-center pt-8 border-t border-[var(--border)]">
                {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)} className="text-sm font-bold opacity-40 hover:opacity-100 transition-opacity">
                        Back
                    </button>
                )}
                {/* Check if current step is valid before showing Next */}
                <Button onClick={step === 11 ? submitAssessment : nextStep} className="ml-auto">
                    {step === 11 ? 'Analyze Results' : 'Next'} <ChevronRight size={18} />
                </Button>
            </div>
        </motion.div>
    );

    // Render Steps
    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <StepWrapper title="Medical Assessment" subtitle="Let's build your clinical profile. Diagnosis takes about 2 minutes.">
                        <div className="bg-[var(--surface)] p-6 rounded-3xl mb-6">
                            <div className="flex gap-4 items-start mb-4 opacity-50">
                                <Lock size={20} />
                                <p className="text-sm">Your answers are encrypted and strictly confidential. Reviewed only by licensed medical doctors.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-2xl">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">1</div>
                                <p className="font-bold">Clinical Questionnaire</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-2xl">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">2</div>
                                <p className="font-bold">Scalp Analysis (Photo Upload)</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-2xl">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">3</div>
                                <p className="font-bold">AI & Doctor Review</p>
                            </div>
                        </div>
                    </StepWrapper>
                );
            case 1:
                return (
                    <StepWrapper title="How old are you?" subtitle="We use this to ensure safety and eligibility for certain treatments.">
                        <input
                            type="number"
                            placeholder="Age (e.g. 28)"
                            className="w-full text-4xl font-black p-6 bg-[var(--surface)] rounded-3xl outline-none focus:ring-2 ring-[var(--primary)]"
                            onChange={(e) => handleAnswer('age', e.target.value)}
                            value={answers.age || ''}
                            autoFocus
                        />
                        {answers.age < 18 && answers.age > 0 && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-2xl mt-4 text-sm font-bold flex gap-2 items-center">
                                <AlertCircle size={16} /> Must be 18+ for this assessment.
                            </div>
                        )}
                    </StepWrapper>
                );
            case 2:
                return (
                    <StepWrapper title="Duration of hair fall" subtitle="How long have you noticed thinning?">
                        {['Less than 3 months', '3 – 6 months', '6 – 12 months', 'More than 12 months'].map((opt, i) => {
                            const val = ['less_3_months', '3_6_months', '6_12_months', 'more_12_months'][i];
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer('duration', val)}
                                    className={`w-full p-6 text-left font-bold rounded-2xl transition-all ${answers.duration === val ? 'bg-[var(--primary)] text-white shadow-xl scale-[1.02]' : 'bg-[var(--surface)] hover:bg-gray-100'}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </StepWrapper>
                );
            case 3:
                return (
                    <StepWrapper title="Where is the thinning?" subtitle="Select all that apply.">
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
                                    onClick={() => {
                                        const current = answers.pattern || [];
                                        const next = isSelected
                                            ? current.filter(v => v !== opt.val)
                                            : [...current, opt.val];
                                        handleAnswer('pattern', next);
                                    }}
                                    className={`w-full p-6 text-left font-bold rounded-2xl transition-all flex justify-between items-center ${isSelected ? 'bg-[var(--primary)] text-white shadow-xl border-2 border-[var(--primary)]' : 'bg-[var(--surface)] border-2 border-transparent'}`}
                                >
                                    {opt.label}
                                    {isSelected && <Check size={20} />}
                                </button>
                            );
                        })}
                    </StepWrapper>
                );
            case 4:
                return (
                    <StepWrapper title="Hairline Status" subtitle="Have you noticed your hairline moving back?">
                        {['Yes, clearly receding', 'Slightly / Not Sure', 'No change'].map((opt, i) => {
                            const val = ['yes', 'slightly', 'no'][i];
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer('hairline', val)}
                                    className={`w-full p-6 text-left font-bold rounded-2xl transition-all ${answers.hairline === val ? 'bg-[var(--primary)] text-white shadow-xl scale-[1.02]' : 'bg-[var(--surface)] hover:bg-gray-100'}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </StepWrapper>
                );
            case 5:
                return (
                    <StepWrapper title="Shedding Severity" subtitle="How would you describe the hair fall?">
                        {[
                            { label: 'Sudden & Heavy (Handfuls)', val: 'sudden' },
                            { label: 'Mild but consistent', val: 'mild' },
                            { label: 'Gradual thinning over years', val: 'gradual' },
                            { label: 'Not sure', val: 'unsure' }
                        ].map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer('shedding', opt.val)}
                                className={`w-full p-6 text-left font-bold rounded-2xl transition-all ${answers.shedding === opt.val ? 'bg-[var(--primary)] text-white shadow-xl scale-[1.02]' : 'bg-[var(--surface)] hover:bg-gray-100'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </StepWrapper>
                );
            case 6:
                return (
                    <StepWrapper title="Recent Triggers" subtitle="Did hair fall start after any of these? (Select all)">
                        {[
                            { label: 'Fever / Serious Infection', val: 'fever' },
                            { label: 'High Stress / Major Life Event', val: 'stress' },
                            { label: 'Crash Diet / Rapid Weight Loss', val: 'diet' },
                            { label: 'New Medication', val: 'meds' },
                            { label: 'Surgery', val: 'surgery' },
                            { label: 'None of the above', val: 'none' }
                        ].map((opt, i) => {
                            const isSelected = answers.triggers?.includes(opt.val);
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const current = answers.triggers || [];
                                        const next = isSelected
                                            ? current.filter(v => v !== opt.val)
                                            : [...current, opt.val];
                                        handleAnswer('triggers', next);
                                    }}
                                    className={`w-full p-6 text-left font-bold rounded-2xl transition-all flex justify-between items-center ${isSelected ? 'bg-[var(--primary)] text-white shadow-xl border-2 border-[var(--primary)]' : 'bg-[var(--surface)] border-2 border-transparent'}`}
                                >
                                    {opt.label}
                                    {isSelected && <Check size={20} />}
                                </button>
                            );
                        })}
                    </StepWrapper>
                );
            case 7:
                return (
                    <StepWrapper title="Scalp Health" subtitle="Do you have any of these symptoms?">
                        {[
                            { label: 'White Flakes (Dandruff)', val: 'white_flakes' },
                            { label: 'Oily Yellow Flakes', val: 'yellow_flakes' },
                            { label: 'Itching', val: 'itching' },
                            { label: 'Redness / Irritation', val: 'redness' },
                            { label: 'None', val: 'none' }
                        ].map((opt, i) => {
                            const isSelected = answers.scalp?.includes(opt.val);
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const current = answers.scalp || [];
                                        const next = isSelected
                                            ? current.filter(v => v !== opt.val)
                                            : [...current, opt.val];
                                        handleAnswer('scalp', next);
                                    }}
                                    className={`w-full p-6 text-left font-bold rounded-2xl transition-all flex justify-between items-center ${isSelected ? 'bg-[var(--primary)] text-white shadow-xl border-2 border-[var(--primary)]' : 'bg-[var(--surface)] border-2 border-transparent'}`}
                                >
                                    {opt.label}
                                    {isSelected && <Check size={20} />}
                                </button>
                            );
                        })}
                    </StepWrapper>
                );
            case 8:
                return (
                    <StepWrapper title="Family History" subtitle="Who in your family has visible hair thinning?">
                        {[
                            { label: 'Father', val: 'father' },
                            { label: 'Mother', val: 'mother' },
                            { label: 'Sibling', val: 'sibling' },
                            { label: 'Grandparents', val: 'grandparents' },
                            { label: 'No one', val: 'none' }
                        ].map((opt, i) => {
                            const isSelected = answers.family?.includes(opt.val);
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const current = answers.family || [];
                                        const next = isSelected
                                            ? current.filter(v => v !== opt.val)
                                            : [...current, opt.val];
                                        handleAnswer('family', next);
                                    }}
                                    className={`w-full p-6 text-left font-bold rounded-2xl transition-all flex justify-between items-center ${isSelected ? 'bg-[var(--primary)] text-white shadow-xl border-2 border-[var(--primary)]' : 'bg-[var(--surface)] border-2 border-transparent'}`}
                                >
                                    {opt.label}
                                    {isSelected && <Check size={20} />}
                                </button>
                            );
                        })}
                    </StepWrapper>
                );
            case 9:
                return (
                    <StepWrapper title="History" subtitle="Used any of these in the last 12 months?">
                        {[
                            { label: 'Minoxidil', val: 'minoxidil' },
                            { label: 'Finasteride', val: 'finasteride' },
                            { label: 'Hair Supplements', val: 'supplements' },
                            { label: 'Anti-dandruff Shampoo', val: 'shampoo' },
                            { label: 'None', val: 'none' }
                        ].map((opt, i) => {
                            const isSelected = answers.treatments?.includes(opt.val);
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const current = answers.treatments || [];
                                        const next = isSelected
                                            ? current.filter(v => v !== opt.val)
                                            : [...current, opt.val];
                                        handleAnswer('treatments', next);
                                    }}
                                    className={`w-full p-6 text-left font-bold rounded-2xl transition-all flex justify-between items-center ${isSelected ? 'bg-[var(--primary)] text-white shadow-xl border-2 border-[var(--primary)]' : 'bg-[var(--surface)] border-2 border-transparent'}`}
                                >
                                    {opt.label}
                                    {isSelected && <Check size={20} />}
                                </button>
                            );
                        })}
                    </StepWrapper>
                );
            case 10:
                return (
                    <StepWrapper title="Describe your scalp" subtitle="Which sounds most like you?">
                        {[
                            { label: 'Mostly normal scalp, just shedding', val: 'A' },
                            { label: 'Visible flakes / dandruff + itching', val: 'B' },
                            { label: 'Redness / irritation + itching', val: 'C' },
                            { label: 'Thinning visible at front hairline', val: 'D' },
                            { label: 'Scalp looks fine but hair feels weak', val: 'E' }
                        ].map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer('description', opt.val)}
                                className={`w-full p-6 text-left font-bold rounded-2xl transition-all ${answers.description === opt.val ? 'bg-[var(--primary)] text-white shadow-xl scale-[1.02]' : 'bg-[var(--surface)] hover:bg-gray-100'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </StepWrapper>
                );
            case 11:
                return (
                    <StepWrapper title="Scalp Photos" subtitle="Mandatory for doctor review. Please follow the example photography.">
                        <div className="bg-blue-50 p-4 rounded-2xl mb-6 flex gap-3 items-start">
                            <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800 font-medium leading-relaxed">
                                High-quality photos help our doctors provide a more accurate diagnosis. Ensure you're in a well-lit room.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'Front', angle: 'Frontal Hairline', example: frontExample },
                                { name: 'Top', angle: 'Vertex/Top', example: topExample },
                                { name: 'Left', angle: 'Left Temple', example: leftExample },
                                { name: 'Right', angle: 'Right Temple', example: rightExample },
                                { name: 'Crown', angle: 'Back/Crown', example: crownExample }
                            ].map((item, i) => (
                                <div key={i} className="bg-[var(--surface)] p-4 rounded-3xl border border-[var(--border)] group">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-bold">{item.name} View</span>
                                        {answers[`photo_${i}`] && <Check className="text-green-500" size={18} />}
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-1/2 aspect-square rounded-2xl overflow-hidden relative border border-black/5">
                                            <img src={item.example} alt={item.name} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                                            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Example</div>
                                        </div>
                                        <div
                                            onClick={() => handleAnswer(`photo_${i}`, true)}
                                            className={`w-1/2 aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${answers[`photo_${i}`] ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-white'}`}
                                        >
                                            {answers[`photo_${i}`] ? (
                                                <div className="text-center">
                                                    <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mx-auto mb-2">
                                                        <Check size={20} />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-[var(--primary)] uppercase">Uploaded</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <Camera className="opacity-30 group-hover:opacity-100 transition-opacity" size={24} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Upload Yours</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-[10px] opacity-40 mt-6 uppercase tracking-[0.2em] font-bold italic">* Privacy Note: These photos are only visible to your assigned doctor.</p>
                    </StepWrapper >
                );
            case 'complete': // Results View
                if (isAnalyzing) {
                    return (
                        <div className="min-h-screen flex items-center justify-center flex-col gap-6">
                            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                            <p className="font-black text-xl animate-pulse">Analyzing Scalp Profile...</p>
                        </div>
                    );
                }
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="container-wide py-20"
                    >
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-10 md:mb-16">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block">Analysis Complete</span>
                                <h1 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">Your Clinical Profile.</h1>
                                <p className="text-lg md:text-xl opacity-60">Based on your inputs, our system has classified your hair profile.</p>
                            </div>

                            {/* Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                                <div className="bg-white p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-xl border border-[var(--border)]">
                                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-40 mb-3 md:mb-4">Diagnosis Score</h3>
                                    <div className="text-2xl md:text-4xl font-black mb-1 md:mb-2 text-[var(--primary)]">{diagnosis?.type}</div>
                                    <p className="text-sm md:text-base opacity-60 font-medium">Secondary Status: {diagnosis?.sdStatus}</p>
                                </div>
                                <div className="bg-white p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-xl border border-[var(--border)]">
                                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-40 mb-3 md:mb-4">Severity Stage</h3>
                                    <div className="text-2xl md:text-4xl font-black mb-1 md:mb-2">{diagnosis?.severity}</div>
                                    <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-[var(--accent)]" style={{ width: `${(diagnosis?.scores?.severity / 10) * 100}%` }}></div>
                                    </div>
                                    <p className="text-[10px] mt-2 opacity-50 text-right">{diagnosis?.scores?.severity}/10 Scale</p>
                                </div>
                            </div>

                            {/* AI Summary Section */}
                            <div className="bg-white p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-xl border border-[var(--border)] mb-10 md:mb-12 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)]"></div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] flex items-center justify-center text-[var(--primary)] shrink-0">
                                        <Sparkles size={24} />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">AI Clinical Analysis</h3>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-40">Generated from 12-point Assessment</p>
                                        </div>
                                        <div className="prose prose-stone max-w-none text-sm leading-relaxed opacity-80">
                                            <p>
                                                Analysis of patient profile (Age: {answers.age}) indicates a <strong>{diagnosis?.type}</strong> pattern.
                                                The condition has persisted for {answers.duration?.replace(/_/g, ' ')}, showing signs of <strong>{diagnosis?.severity} progression</strong>.
                                                {answers.family && !answers.family.includes('none') && ` Genetic predisposition is a likely contributing factor (History: ${answers.family.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ')}).`}
                                            </p>
                                            <ul className="mt-2 list-disc pl-4 space-y-1">
                                                <li><strong>Shedding Phase:</strong> Pattern matches {answers.shedding} hair fall characteristics.</li>
                                                <li><strong>Scalp Environment:</strong> {diagnosis?.sdStatus === 'No SD' ? 'Healthy scalp moisture barrier detected.' : `Signs of ${diagnosis?.sdStatus} detected; anti-inflammatory indicators present.`}</li>
                                                <li><strong>Triggers:</strong> {answers.triggers?.includes('none') ? 'No acute environmental triggers reported.' : `External factors identified: ${answers.triggers?.join(', ')}.`}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Plan */}
                            <div className="bg-white border border-[var(--border)] p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden mb-12">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--surface)] rounded-bl-[200px] pointer-events-none"></div>
                                <h2 className="text-2xl md:text-3xl font-black mb-8 relative z-10 text-[var(--text-dark)]">Recommended Protocol</h2>

                                <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-8">
                                    {diagnosis?.type === 'AGA' && (
                                        <>
                                            <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] flex flex-col h-full group hover:shadow-lg transition-all duration-300">
                                                <div className="h-48 bg-white rounded-2xl mb-6 overflow-hidden relative shrink-0 shadow-inner">
                                                    <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600" alt="Finasteride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm text-[var(--text-dark)]">Oral Tablet</div>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-[var(--text-dark)]">Finasteride (1mg)</h3>
                                                <p className="opacity-70 text-sm mb-4 leading-relaxed flex-grow text-[var(--text-light)]">FDA-approved DHT blocker. Stops hair loss at the hormonal source by inhibiting 5-alpha reductase. Taken once daily.</p>
                                                <div className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--primary)] text-white rounded-xl text-xs font-bold w-fit shadow-md">
                                                    <Check size={14} strokeWidth={3} /> Prescription Required
                                                </div>
                                            </div>
                                            <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] flex flex-col h-full group hover:shadow-lg transition-all duration-300">
                                                <div className="h-48 bg-white rounded-2xl mb-6 overflow-hidden relative shrink-0 shadow-inner">
                                                    <img src="https://images.unsplash.com/photo-1626423589417-76395dc56fa9?auto=format&fit=crop&q=80&w=600" alt="Minoxidil" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm text-[var(--text-dark)]">Topical Solution</div>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-[var(--text-dark)]">Minoxidil (5%)</h3>
                                                <p className="opacity-70 text-sm mb-4 leading-relaxed flex-grow text-[var(--text-light)]">Vasodilator that reactivates dormant follicles and stimulates regrowth. Applied directly to affected areas twice daily.</p>
                                                <div className="inline-block px-3 py-2 bg-[var(--text-dark)] text-white rounded-xl text-xs font-bold w-fit shadow-md">Clinically Proven</div>
                                            </div>
                                        </>
                                    )}
                                    {(diagnosis?.type === 'TE' || diagnosis?.type === 'Mixed (AGA + TE)') && (
                                        <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] flex flex-col h-full group hover:shadow-lg transition-all duration-300">
                                            <div className="h-48 bg-white rounded-2xl mb-6 overflow-hidden relative shrink-0 shadow-inner">
                                                <img src="https://images.unsplash.com/photo-1550572017-edc9878201a0?auto=format&fit=crop&q=80&w=600" alt="Vitamins" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm text-[var(--text-dark)]">Daily Supplement</div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-[var(--text-dark)]">Growth Multi-Vitamin</h3>
                                            <p className="opacity-70 text-sm mb-4 leading-relaxed flex-grow text-[var(--text-light)]">Packed with Biotin, Zinc, and Iron to fuel the hair growth cycle and reduce shedding caused by nutritional gaps.</p>
                                            <div className="inline-block px-3 py-2 bg-[var(--accent)] text-[var(--text-dark)] rounded-xl text-xs font-bold w-fit shadow-sm">Nutritional Support</div>
                                        </div>
                                    )}
                                    {diagnosis?.sdStatus !== 'No SD' && (
                                        <div className="bg-[var(--surface)] p-6 rounded-3xl border border-rose-200 flex flex-col h-full group hover:shadow-lg transition-all duration-300">
                                            <div className="h-48 bg-white rounded-2xl mb-6 overflow-hidden relative shrink-0 shadow-inner">
                                                <img src="https://images.unsplash.com/photo-1549488497-2936a7a72d95?auto=format&fit=crop&q=80&w=600" alt="Ketoconazole" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute top-4 right-4 bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">Inflammation Control</div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-[var(--text-dark)]">Ketoconazole 2% Shampoo</h3>
                                            <p className="opacity-70 text-sm mb-4 leading-relaxed flex-grow text-[var(--text-light)]">Medical-grade anti-fungal shampoo. Eliminates dandruff and reduces scalp inflammation ({diagnosis?.sdStatus}).</p>
                                            <div className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--primary)] text-white rounded-xl text-xs font-bold w-fit shadow-md">
                                                <Check size={14} strokeWidth={3} /> Prescription Required
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-[var(--surface)] p-6 rounded-3xl flex items-start gap-5 border border-[var(--border)] relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0 shadow-lg">
                                        <AlertCircle size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2 text-[var(--text-dark)]">Doctor Review Required</h4>
                                        <p className="text-sm opacity-80 leading-relaxed max-w-2xl text-[var(--text-light)]">
                                            This treatment plan is an <strong>analyzed result</strong> based on your clinical profile. To purchase these medications, you must send this plan for a review by a licensed doctor. They will verify safety and issue a valid prescription.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Consent Section (if AGA) */}
                            {diagnosis?.type.includes('AGA') && (
                                <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl mb-8">
                                    <h3 className="font-bold text-rose-900 mb-4 flex items-center gap-2"><AlertCircle size={20} /> Important Safety Information</h3>
                                    <p className="text-sm text-rose-800 leading-relaxed mb-4">
                                        Finasteride is a prescription medication. A small percentage of users (1-2%) may experience side effects.
                                        You will only be prescribed this after a licensed doctor reviews your full profile.
                                    </p>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" className="mt-1 w-5 h-5 accent-[var(--primary)]" />
                                        <span className="text-sm font-bold text-rose-900">I confirm I have read the safety information and consent to doctor review.</span>
                                    </label>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button className="w-full h-16 text-lg">Send to Doctor Review <ChevronRight /></Button>
                            </div>
                            <p className="text-center text-xs opacity-40 mt-4">By continuing, you agree to the Terms of Service. Assessment ID: #{Math.floor(Math.random() * 100000)}</p>
                        </div>
                    </motion.div>
                );

            default: return null;
        }
    };

    if (step === 'complete' && !isAnalyzing) return renderStep();

    return (
        <div className="min-h-screen bg-[var(--background)] pt-32 pb-20">
            <div className="container-wide">
                {/* Progress Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--primary)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 11) * 100}%` }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Assessment;
