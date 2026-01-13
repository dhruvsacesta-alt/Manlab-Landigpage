import React from 'react';
import { Check, X, ShieldAlert, BadgeCheck } from 'lucide-react';

const ComparisonTable = () => {
    const rows = [
        { label: "How your plan is built", ml: "Structured assessment reviewed by a doctor", other: "Quick quiz–based suggestions" },
        { label: "Role of AI", ml: "AI explains your condition and guides specific steps", other: "Often suggests products automatically" },
        { label: "Doctor involvement", ml: "Mandatory review before ANY treatment starts", other: "Optional or after purchase" },
        { label: "Personalisation", ml: "Matched to your specific hair-loss type", other: "Similar kits for most users" },
        { label: "Care after you start", ml: "Ongoing follow-ups and plan adjustments", other: "Little or no follow-up" },
    ];

    return (
        <section className="bg-[var(--background)] py-32 md:py-48">
            <div className="container-wide">
                <div className="text-center mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight uppercase tracking-tight text-[var(--text-dark)]">
                        Efficacy over generic <br /><span className="text-[var(--primary)] italic font-light lowercase">solutions.</span>
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] opacity-40">Systemic Comparison Matrix</p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-[var(--primary)]/5">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-[var(--primary)]/5">
                                    <th className="p-10 text-left text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 w-1/3 text-[var(--text-dark)]">Diagnostic Attribute</th>
                                    <th className="p-10 text-left bg-[var(--primary)] text-white w-1/3">
                                        <div className="flex items-center gap-3">
                                            <BadgeCheck size={20} strokeWidth={1.5} />
                                            <span className="text-base font-bold uppercase tracking-widest">Man Labs</span>
                                        </div>
                                    </th>
                                    <th className="p-10 text-left opacity-30 w-1/3 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-dark)]">Standard Telehealth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => (
                                    <tr key={i} className="border-b border-[var(--primary)]/5 group hover:bg-[var(--background)]/50 transition-colors">
                                        <td className="p-8 text-[11px] font-bold uppercase tracking-tight opacity-40 pl-10 align-middle text-[var(--text-dark)]">{row.label}</td>
                                        <td className="p-8 text-base font-bold bg-[var(--primary)]/5 align-middle text-[var(--text-dark)] leading-relaxed uppercase tracking-tight">
                                            "{row.ml}"
                                        </td>
                                        <td className="p-8 text-sm opacity-30 align-middle leading-relaxed font-medium text-[var(--text-dark)] italic">
                                            {row.other}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Comparison View */}
                    <div className="lg:hidden space-y-6">
                        {rows.map((row, i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-8 border border-[var(--primary)]/5 shadow-xl">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-8 text-[var(--text-dark)]">{row.label}</h4>
                                <div className="space-y-4">
                                    <div className="p-6 bg-[var(--primary)] text-white rounded-[1.5rem] relative overflow-hidden shadow-lg shadow-[var(--primary)]/20">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-3 opacity-60">
                                                <BadgeCheck size={16} />
                                                <span className="text-[9px] font-bold uppercase tracking-widest">Man Labs Protocol</span>
                                            </div>
                                            <p className="text-base font-bold leading-tight uppercase text-white">{row.ml}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-[var(--background)] rounded-[1.5rem] border border-[var(--primary)]/5">
                                        <div className="flex items-center gap-2 mb-3 opacity-30 text-[var(--text-dark)]">
                                            <X size={16} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Generic Providers</span>
                                        </div>
                                        <p className="text-sm font-medium opacity-50 leading-relaxed text-[var(--text-dark)] italic">"{row.other}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ComparisonTable;
