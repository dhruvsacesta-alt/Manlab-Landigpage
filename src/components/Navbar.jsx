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
        <nav className={`glass-nav flex items-center transition-all duration-300 ${isScrolled ? 'h-12 md:h-14' : 'h-14 md:h-18'}`}>
            <div className="container-wide flex justify-between items-center w-full">
                <Link to="/" className="flex items-center gap-3">
                    <AnimatePresence mode="wait">
                        {isScrolled ? (
                            <motion.img
                                key="scrolled"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src="/logo.png"
                                alt="Man Labs"
                                className="h-5 md:h-6 w-auto grayscale"
                            />
                        ) : (
                            <motion.img
                                key="top"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src="/logo_full.png"
                                alt="Man Labs"
                                className="h-4 md:h-6 w-auto"
                            />
                        )}
                    </AnimatePresence>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-[9px] uppercase font-bold tracking-[0.2em] transition-all hover:opacity-100 ${location.pathname === link.path ? 'text-[var(--primary)] opacity-100' : 'text-black opacity-30'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/login" className="text-[9px] uppercase font-bold tracking-[0.2em] text-black opacity-30 hover:opacity-100 transition-all pr-4 border-r border-black/5">
                        Authenticate
                    </Link>
                    <Link to="/assessment">
                        <Button className="h-[36px] px-6 text-[9px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/10">Start Protocol</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-black opacity-40 hover:opacity-100 transition-opacity" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed top-0 right-0 w-64 h-screen bg-white shadow-2xl lg:hidden z-[999] overflow-y-auto border-l border-black/5"
                    >
                        <div className="p-8 flex flex-col gap-6 pt-24">
                            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-black opacity-20">
                                <X size={20} />
                            </button>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-black/5 mt-4">
                                <Link to="/assessment" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full text-[9px] font-bold uppercase tracking-widest h-11">Start Protocol</Button>
                                </Link>
                                <Link to="/login" className="block text-center mt-6 text-[9px] font-bold uppercase tracking-widest opacity-20" onClick={() => setIsOpen(false)}>
                                    Authentication
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
