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
        <section className="bg-[var(--surface)] py-20 md:py-32">
            <div className="container-wide">
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--accent)] mb-4 block">What Makes Us Different</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">Hair loss, without the guesswork.</h2>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block premium-card !p-0 overflow-hidden border-none shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white">
                                        <th className="p-8 md:p-10 text-left text-sm font-black uppercase tracking-widest opacity-40 font-accent w-1/3">Aspect</th>
                                        <th className="p-8 md:p-10 text-left bg-[var(--primary)] text-white w-1/3 relative overflow-hidden">
                                            <div className="relative z-10 flex items-center gap-2">
                                                <BadgeCheck size={20} />
                                                <span className="text-xl font-bold">Man Labs</span>
                                            </div>
                                        </th>
                                        <th className="p-8 md:p-10 text-left opacity-40 w-1/3">Other Telehealth Apps</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {rows.map((row, i) => (
                                        <tr key={i} className="border-t border-[var(--border)] group hover:bg-[var(--surface)] transition-colors">
                                            <td className="p-6 md:p-8 text-sm font-bold opacity-80 pl-8 md:pl-10 align-top">{row.label}</td>
                                            <td className="p-6 md:p-8 text-base font-bold bg-[var(--primary)]/5 align-top text-[var(--text-dark)] leading-relaxed relative">
                                                <div className="absolute left-0 top-0 w-1 h-full bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                {row.ml}
                                            </td>
                                            <td className="p-6 md:p-8 text-sm opacity-50 align-top leading-relaxed">
                                                {row.other}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Comparison View */}
                    <div className="lg:hidden space-y-6">
                        {rows.map((row, i) => (
                            <div key={i} className="premium-card !p-8">
                                <h4 className="text-sm font-black uppercase tracking-widest opacity-40 mb-6 font-accent">{row.label}</h4>
                                <div className="space-y-4">
                                    <div className="p-5 bg-[var(--primary)] text-white rounded-3xl shadow-lg shadow-[var(--primary)]/20 relative overflow-hidden">
                                        <div className="absolute -right-4 -top-4 opacity-10">
                                            <BadgeCheck size={80} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <BadgeCheck size={18} />
                                                <span className="text-xs font-black uppercase tracking-widest">Man Labs</span>
                                            </div>
                                            <p className="text-lg font-bold leading-snug">{row.ml}</p>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-[var(--surface)] rounded-3xl border border-[var(--border)]">
                                        <div className="flex items-center gap-2 mb-3 opacity-40">
                                            <X size={18} />
                                            <span className="text-xs font-black uppercase tracking-widest">Others</span>
                                        </div>
                                        <p className="text-base font-medium opacity-60 leading-relaxed">{row.other}</p>
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
