import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[var(--text-dark)] text-white/80 py-24">
            <div className="container-wide">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-white text-3xl font-black mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Man Labs</h3>
                        <p className="text-sm leading-relaxed mb-8 opacity-60">
                            India's premier digital health clinic for men. We combine breakthrough science with personalized medical care to solve hair loss.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 font-accent uppercase text-xs tracking-widest">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
                            <li><Link to="/blogs" className="hover:text-white transition-colors">Expert Journal</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 font-accent uppercase text-xs tracking-widest">Medical Support</h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">WhatsApp 24/7</p>
                                    <p className="text-[10px] opacity-50">Real-time medical support</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--primary)]/30 transition-colors">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">Secure Data</p>
                                    <p className="text-[10px] opacity-50">HIPAA Compliant Privacy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] uppercase tracking-widest opacity-40">© 2025 Man Labs India. All medical decisions are made by licensed physicians.</p>
                    <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-60">
                        <Link to="/terms">Terms</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/medical-disclaimer">Medical Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
