import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Pill } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Physiology', path: '/' },
        { name: 'Scientific Base', path: '/about' },
        { name: 'Research Journal', path: '/blogs' },
        { name: 'Clinical Support', path: '/contact' },
    ];


    return (
        <nav className={`glass-nav flex items-center transition-all duration-500 z-[1000] ${isScrolled ? 'h-14 md:h-16 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--primary)]/5' : 'h-20 md:h-28'}`}>
            <div className="container-wide flex justify-between items-center w-full px-6 md:px-12">
                <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
                    <AnimatePresence mode="wait">
                        {isScrolled ? (
                            <motion.img
                                key="scrolled"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src="/logo.png"
                                alt="Man Labs"
                                className="h-10 md:h-13 w-auto grayscale"
                            />
                        ) : (
                            <motion.img
                                key="top"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src="/logo_full.png"
                                alt="Man Labs"
                                className="h-11 md:h-16 w-auto"
                            />
                        )}
                    </AnimatePresence>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-12">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-[10px] uppercase font-bold tracking-[0.3em] transition-all hover:text-[var(--primary)] relative group ${location.pathname === link.path ? 'text-[var(--primary)]' : 'text-[var(--text-dark)] opacity-40 hover:opacity-100'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-[var(--primary)] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${location.pathname === link.path ? 'scale-x-100' : ''}`} />
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    <Link to="/login" className="text-[10px] uppercase font-bold tracking-[0.3em] text-[var(--text-dark)] opacity-30 hover:opacity-100 transition-all">
                        Authenticate
                    </Link>
                    <Link to="/assessment">
                        <Button className="h-[42px] px-8 text-[10px] font-bold uppercase tracking-[0.2em] bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20 hover:bg-[var(--primary-hover)] border-0">Start Protocol</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-[var(--text-dark)] opacity-50 hover:opacity-100 transition-opacity" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 h-screen bg-white/95 backdrop-blur-3xl lg:hidden z-[999] overflow-y-auto"
                    >
                        <div className="min-h-screen flex flex-col items-center justify-center p-12 text-center gap-10">
                            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-[var(--text-dark)] opacity-30">
                                <X size={32} strokeWidth={1} />
                            </button>

                            <img src="/logo.png" alt="Man Labs" className="h-20 w-auto mb-12 brightness-0 opacity-40" />

                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-lg uppercase font-bold tracking-[0.4em] text-[var(--text-dark)] opacity-40 hover:opacity-100 transition-all hover:scale-110"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="w-full max-w-xs h-[1px] bg-[var(--primary)]/10 my-6" />

                            <Link to="/assessment" className="w-full max-w-xs" onClick={() => setIsOpen(false)}>
                                <Button className="w-full text-[11px] font-bold uppercase tracking-[0.3em] h-14 bg-[var(--primary)] text-white shadow-2xl shadow-[var(--primary)]/20">Start Protocol</Button>
                            </Link>
                            <Link to="/login" className="text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] opacity-60" onClick={() => setIsOpen(false)}>
                                Authentication
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
