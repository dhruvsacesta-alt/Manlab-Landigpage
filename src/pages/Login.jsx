import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Lock, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Login successful:', { email, password });
            // navigate('/dashboard'); 
        } catch (error) {
            setErrors({ submit: 'Invalid email or password. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[var(--background)] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px]"
            >
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-black/5">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/5 rounded-bl-[60px] pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold mb-2 font-heading uppercase tracking-tight">Welcome.</h2>
                        <p className="text-xs opacity-40 font-medium">Access your personal care plan.</p>
                    </div>

                    <AnimatePresence>
                        {errors.submit && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold"
                            >
                                <AlertCircle size={14} />
                                {errors.submit}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 ml-1">Protocol Identifier (Email)</label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-[var(--primary)]'} opacity-30`} size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ ...errors, email: null });
                                    }}
                                    className={`w-full bg-[var(--surface)]/30 border transition-all rounded-xl h-12 pl-11 pr-4 outline-none text-sm font-medium ${errors.email ? 'border-red-200 focus:border-red-400' : 'border-black/5 focus:border-[var(--primary)]/30'}`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 ml-1">Security Key (Password)</label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-[var(--primary)]'} opacity-30`} size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: null });
                                    }}
                                    className={`w-full bg-[var(--surface)]/30 border transition-all rounded-xl h-12 pl-11 pr-11 outline-none text-sm font-medium ${errors.password ? 'border-red-200 focus:border-red-400' : 'border-black/5 focus:border-[var(--primary)]/30'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-30 hover:opacity-100 transition-opacity"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.password}</p>}
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" alt="Forgot Password Link" className="text-[9px] font-bold text-[var(--primary)]/50 hover:text-[var(--primary)] uppercase tracking-widest transition-colors">
                                Recovery
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-[10px] uppercase font-bold tracking-widest relative overflow-hidden group shrink-0"
                            disabled={isSubmitting}
                        >
                            <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                                Authenticate <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            {isSubmitting && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="animate-spin" size={18} />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-black/5">
                        <p className="text-[10px] font-medium opacity-40 uppercase tracking-widest">
                            No credentials?{' '}
                            <Link to="/signup" className="text-[var(--primary)] font-bold hover:underline ml-1">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
