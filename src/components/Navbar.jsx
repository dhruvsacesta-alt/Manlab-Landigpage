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
        { name: 'How it works', path: '/' },
        { name: 'About us', path: '/about' },
        { name: 'Expert Blog', path: '/blogs' },
        { name: 'Contact Support', path: '/contact' },
    ];


    return (
        <nav className={`glass-nav flex items-center transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20 md:h-24'}`}>
            <div className="container-wide flex justify-between items-center w-full">
                <Link to="/" className="flex items-center gap-3 transition-all duration-500">
                    <AnimatePresence mode="wait">
                        {isScrolled ? (
                            <motion.img
                                key="scrolled"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                src="/logo.png"
                                alt="Man Labs"
                                className="h-10 w-auto"
                            />
                        ) : (
                            <motion.img
                                key="top"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                src="/logo_full.png"
                                alt="Man Labs"
                                className="h-6 md:h-10 w-auto"
                            />
                        )}
                    </AnimatePresence>
                </Link>



                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-10">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${location.pathname === link.path ? 'text-[var(--primary)]' : 'text-[var(--text-light)]'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/login">
                        <Button variant="ghost">Log in</Button>
                    </Link>
                    <Link to="/assessment">
                        <Button>Start Assessment</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-[var(--primary)]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-white/95 backdrop-blur-xl lg:hidden z-[999] overflow-y-auto"
                    >
                        <div className="p-8 flex flex-col gap-6">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-xl font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr />
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full">Log in</Button>
                            </Link>
                            <Link to="/assessment" onClick={() => setIsOpen(false)}>
                                <Button className="w-full">Start Assessment</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
