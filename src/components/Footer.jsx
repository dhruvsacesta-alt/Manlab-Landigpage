import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[var(--text-dark)] text-white/40 py-32 md:py-48 border-t border-white/5">
            <div className="container-wide">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-32 mb-32 max-w-7xl mx-auto">
                    <div className="md:col-span-1">
                        <img src="/logo.png" alt="Man Labs" className="h-20 w-auto mb-12 brightness-0 invert opacity-60" />
                        <p className="text-sm md:text-base leading-relaxed mb-12 font-medium italic opacity-50">
                            "Systemic clinical interventions for physiological optimization. India's primary pharmacological distribution platform for male aesthetics."
                        </p>
                        <div className="flex gap-6">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all text-white/30 shadow-sm">
                                    <Icon size={16} strokeWidth={1.2} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[var(--primary)] font-bold mb-10 uppercase text-[10px] tracking-[0.4em] opacity-60">Institutional</h4>
                        <ul className="space-y-6 text-sm font-bold uppercase tracking-tight">
                            <li><Link to="/about" className="hover:text-white transition-all opacity-40 hover:opacity-100 decoration-1 hover:underline underline-offset-8 transition-all">Scientific Base</Link></li>
                            <li><Link to="/blogs" className="hover:text-white transition-all opacity-40 hover:opacity-100 decoration-1 hover:underline underline-offset-8 transition-all">Research Journal</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-all opacity-40 hover:opacity-100 decoration-1 hover:underline underline-offset-8 transition-all">Clinical Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[var(--primary)] font-bold mb-10 uppercase text-[10px] tracking-[0.4em] opacity-60">Protocols</h4>
                        <ul className="space-y-6 text-sm font-bold uppercase tracking-tight">
                            <li><Link to="/assessment" className="hover:text-white transition-all opacity-40 hover:opacity-100 decoration-1 hover:underline underline-offset-8 transition-all">Start Diagnosis</Link></li>
                            <li><Link to="/login" className="hover:text-white transition-all opacity-40 hover:opacity-100 decoration-1 hover:underline underline-offset-8 transition-all">Authentication</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white transition-all opacity-40 hover:opacity-100 decoration-1 hover:underline underline-offset-8 transition-all">Pharmacology</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[var(--primary)] font-bold mb-10 uppercase text-[10px] tracking-[0.4em] opacity-60">Operational</h4>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:scale-105 group-hover:bg-[var(--primary)] transition-all">
                                    <MessageCircle size={18} strokeWidth={1.2} />
                                </div>
                                <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                                    <p className="text-xs font-bold text-white uppercase tracking-widest">Protocol WA</p>
                                    <p className="text-[10px] uppercase tracking-widest mt-1">24/7 Connectivity</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:scale-105 group-hover:bg-[var(--primary)] transition-all">
                                    <Shield size={18} strokeWidth={1.2} />
                                </div>
                                <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                                    <p className="text-xs font-bold text-white uppercase tracking-widest">HIPAA Protocol</p>
                                    <p className="text-[10px] uppercase tracking-widest mt-1">Encrypted Data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 max-w-7xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-20 text-center md:text-left leading-loose">© 2025 Man Labs India • Institutional Medical Oversight Mandatory • Pharmacological Standards Council</p>
                    <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] opacity-30 font-bold">
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/medical-disclaimer" className="hover:text-white transition-colors">Safety</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
