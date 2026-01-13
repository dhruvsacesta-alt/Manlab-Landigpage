import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, User, Lock, Phone, AlertCircle, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Phone validation (Indian 10-digit)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Enter a valid 10-digit phone number';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation (8+ chars, 1 number, 1 special char)
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Min 8 chars, 1 number, 1 special char';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Signup successful:', formData);
            // navigate('/onboarding');
        } catch (error) {
            setErrors({ submit: 'Something went wrong. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[var(--background)] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px]"
            >
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-black/5">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--primary)]/5 rounded-br-[60px] pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]/50 mb-2 block">Premium Clinical Access</span>
                        <h2 className="text-2xl font-bold font-heading mb-2 uppercase tracking-tight">Register Profile.</h2>
                        <p className="text-xs opacity-40 font-medium">Join 2M+ men on the path to vitality.</p>
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-400' : 'text-[var(--primary)]'} opacity-30`} size={16} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full bg-[var(--surface)]/30 border transition-all rounded-xl h-11 pl-11 pr-4 outline-none text-sm font-medium ${errors.name ? 'border-red-200 focus:border-red-400' : 'border-black/5 focus:border-[var(--primary)]/30'}`}
                                        placeholder="Ex: Aman Singh"
                                    />
                                </div>
                                {errors.name && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 ml-1">Mobile</label>
                                <div className="relative">
                                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-400' : 'text-[var(--primary)]'} opacity-30`} size={16} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        maxLength="10"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full bg-[var(--surface)]/30 border transition-all rounded-xl h-11 pl-11 pr-4 outline-none text-sm font-medium ${errors.phone ? 'border-red-200 focus:border-red-400' : 'border-black/5 focus:border-[var(--primary)]/30'}`}
                                        placeholder="9876543210"
                                    />
                                </div>
                                {errors.phone && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 ml-1">Protocol Identifier (Email)</label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-[var(--primary)]'} opacity-30`} size={16} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-[var(--surface)]/30 border transition-all rounded-xl h-11 pl-11 pr-4 outline-none text-sm font-medium ${errors.email ? 'border-red-200 focus:border-red-400' : 'border-black/5 focus:border-[var(--primary)]/30'}`}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full bg-[var(--surface)]/30 border transition-all rounded-xl h-11 pl-11 pr-11 outline-none text-sm font-medium ${errors.password ? 'border-red-200 focus:border-red-400' : 'border-black/5 focus:border-[var(--primary)]/30'}`}
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
                            {errors.password ? (
                                <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1 leading-tight">{errors.password}</p>
                            ) : (
                                <p className="text-[9px] font-medium opacity-30 ml-1">Requires 8+ chars, 1 number & 1 special char</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-[10px] uppercase font-bold tracking-widest relative overflow-hidden group shrink-0"
                            disabled={isSubmitting}
                        >
                            <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                                Register Profile <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            {isSubmitting && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="animate-spin" size={18} />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center pt-8 border-t border-black/5">
                        <p className="text-[10px] font-medium opacity-40 uppercase tracking-widest leading-relaxed">
                            Already registered?{' '}
                            <Link to="/login" className="text-[var(--primary)] font-bold hover:underline ml-1">
                                Log In
                            </Link>
                        </p>
                        <p className="text-[8px] opacity-20 mt-4 uppercase tracking-[0.2em]">
                            By registering, you agree to our Terms & Privacy Policy.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
