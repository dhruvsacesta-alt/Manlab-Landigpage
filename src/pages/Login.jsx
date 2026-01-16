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

            // Store user session for frontend only flow
            localStorage.setItem('manlab_user', JSON.stringify({ email, name: email.split('@')[0] }));

            // Check for redirect
            const redirectPath = localStorage.getItem('redirect_after_login');
            if (redirectPath) {
                localStorage.removeItem('redirect_after_login');
                navigate(redirectPath);
            } else {
                navigate('/'); // Default to home
            }
        } catch (error) {
            setErrors({ submit: 'Invalid email or password. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[var(--background)] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-bl-[100px] pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black mb-2 font-heading">Welcome Back.</h2>
                        <p className="text-sm opacity-50">Access your personalized care plan.</p>
                    </div>

                    <AnimatePresence>
                        {errors.submit && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
                            >
                                <AlertCircle size={18} />
                                {errors.submit}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-[var(--primary)]'} opacity-50`} size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ ...errors, email: null });
                                    }}
                                    className={`w-full bg-[var(--surface)] border transition-all rounded-xl py-4 pl-12 pr-4 outline-none font-medium ${errors.email ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[var(--primary)]'}`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Password</label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-[var(--primary)]'} opacity-50`} size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: null });
                                    }}
                                    className={`w-full bg-[var(--surface)] border transition-all rounded-xl py-4 pl-12 pr-12 outline-none font-medium ${errors.password ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[var(--primary)]'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.password}</p>}
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-xs font-black text-[var(--primary)] hover:underline tracking-tight">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-base font-black relative overflow-hidden group"
                            disabled={isSubmitting}
                        >
                            <span className={`flex items-center justify-center gap-2 transition-transform duration-300 ${isSubmitting ? '-translate-y-10' : ''}`}>
                                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            {isSubmitting && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="animate-spin" size={20} />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm font-medium opacity-50">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[var(--primary)] font-black hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
