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
        <section className="bg-[var(--surface)] py-20 md:py-24">
            <div className="container-wide">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-4 block">Clinical Differentiation</span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight uppercase tracking-tight">Efficacy over generic <br /><span className="italic font-light opacity-50">solutions.</span></h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block bg-white rounded-3xl overflow-hidden shadow-xl border border-black/5">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-black/5">
                                    <th className="p-8 text-left text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 w-1/3">Diagnostic Attribute</th>
                                    <th className="p-8 text-left bg-[var(--primary)] text-white w-1/3">
                                        <div className="flex items-center gap-2">
                                            <BadgeCheck size={16} />
                                            <span className="text-sm font-bold uppercase tracking-widest">Man Labs</span>
                                        </div>
                                    </th>
                                    <th className="p-8 text-left opacity-30 w-1/3 text-[9px] font-bold uppercase tracking-[0.2em]">Standard Telehealth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => (
                                    <tr key={i} className="border-b border-black/5 group hover:bg-[var(--surface)] transition-colors">
                                        <td className="p-6 text-[11px] font-bold uppercase tracking-tight opacity-40 pl-8 align-middle">{row.label}</td>
                                        <td className="p-6 text-sm font-bold bg-[var(--primary)]/5 align-middle text-[var(--text-dark)] leading-relaxed">
                                            {row.ml}
                                        </td>
                                        <td className="p-6 text-xs opacity-30 align-middle leading-relaxed font-medium">
                                            {row.other}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Comparison View */}
                    <div className="lg:hidden space-y-4">
                        {rows.map((row, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                                <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 mb-5">{row.label}</h4>
                                <div className="space-y-3">
                                    <div className="p-5 bg-[var(--primary)] text-white rounded-xl relative overflow-hidden">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-2 opacity-50">
                                                <BadgeCheck size={14} />
                                                <span className="text-[8px] font-bold uppercase tracking-widest">Man Labs Profile</span>
                                            </div>
                                            <p className="text-sm font-bold leading-snug text-white">{row.ml}</p>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-[var(--surface)] rounded-xl border border-black/5">
                                        <div className="flex items-center gap-2 mb-2 opacity-20">
                                            <X size={14} />
                                            <span className="text-[8px] font-bold uppercase tracking-widest">Other Providers</span>
                                        </div>
                                        <p className="text-xs font-medium opacity-40 leading-relaxed">{row.other}</p>
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
