import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[var(--text-dark)] text-white/40 py-24 md:py-32 border-t border-white/5">
            <div className="container-wide">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 mb-24 max-w-7xl mx-auto">
                    <div className="md:col-span-1">
                        <img src="/logo_full.png" alt="Man Labs" className="h-4 md:h-5 w-auto mb-10 brightness-0 invert opacity-100" />
                        <p className="text-[11px] md:text-xs leading-relaxed mb-10 font-medium italic">
                            "Systemic clinical interventions for physiological optimization. India's primary pharmacological distribution platform for male aesthetics."
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors opacity-30 hover:opacity-100">
                                    <Icon size={14} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white/40 font-bold mb-8 uppercase text-[9px] tracking-[0.3em]">Institutional</h4>
                        <ul className="space-y-4 text-[11px] md:text-xs font-medium">
                            <li><Link to="/about" className="hover:text-white transition-all opacity-80 decoration-1 hover:underline underline-offset-4">Scientific Base</Link></li>
                            <li><Link to="/blogs" className="hover:text-white transition-all opacity-80 decoration-1 hover:underline underline-offset-4">Research Journal</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-all opacity-80 decoration-1 hover:underline underline-offset-4">Clinical Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white/40 font-bold mb-8 uppercase text-[9px] tracking-[0.3em]">Protocols</h4>
                        <ul className="space-y-4 text-[11px] md:text-xs font-medium">
                            <li><Link to="/assessment" className="hover:text-white transition-all opacity-80 decoration-1 hover:underline underline-offset-4">Start Diagnosis</Link></li>
                            <li><Link to="/login" className="hover:text-white transition-all opacity-80 decoration-1 hover:underline underline-offset-4">Authentication</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white transition-all opacity-80 decoration-1 hover:underline underline-offset-4">Pharmacology</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white/40 font-bold mb-8 uppercase text-[9px] tracking-[0.3em]">Operational</h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:scale-105 transition-transform">
                                    <MessageCircle size={14} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white uppercase tracking-wider">Protocol WA</p>
                                    <p className="text-[8px] opacity-40 uppercase tracking-widest">24/7 Connectivity</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:scale-105 transition-transform">
                                    <Shield size={14} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white uppercase tracking-wider">HIPAA Protocol</p>
                                    <p className="text-[8px] opacity-40 uppercase tracking-widest">Encrypted Data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
                    <p className="text-[8px] uppercase tracking-[0.3em] opacity-20 text-center md:text-left">© 2025 Man Labs India • Institutional Medical Oversight Mandatory • Pharmacological Standards Council</p>
                    <div className="flex gap-8 text-[8px] uppercase tracking-[0.3em] opacity-30">
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
