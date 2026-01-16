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

            // Store user session for frontend only flow
            localStorage.setItem('manlab_user', JSON.stringify({
                email: formData.email,
                name: formData.name
            }));

            // Check for redirect
            const redirectPath = localStorage.getItem('redirect_after_login');
            if (redirectPath) {
                localStorage.removeItem('redirect_after_login');
                navigate(redirectPath);
            } else {
                navigate('/'); // Default to home
            }
        } catch (error) {
            setErrors({ submit: 'Something went wrong. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[var(--background)] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--accent)]/10 rounded-br-[100px] pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-2 block">Premium Care Access</span>
                        <h2 className="text-3xl font-black font-heading mb-2">Create Account.</h2>
                        <p className="text-sm opacity-50">Join 2M+ men taking control of their vitality.</p>
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
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-400' : 'text-[var(--primary)]'} opacity-50`} size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full bg-[var(--surface)] border transition-all rounded-xl py-4 pl-12 pr-4 outline-none font-medium ${errors.name ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[var(--primary)]'}`}
                                        placeholder="Ex: Aman Singh"
                                    />
                                </div>
                                {errors.name && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-400' : 'text-[var(--primary)]'} opacity-50`} size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        maxLength="10"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full bg-[var(--surface)] border transition-all rounded-xl py-4 pl-12 pr-4 outline-none font-medium ${errors.phone ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[var(--primary)]'}`}
                                        placeholder="9876543210"
                                    />
                                </div>
                                {errors.phone && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-[var(--primary)]'} opacity-50`} size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-[var(--surface)] border transition-all rounded-xl py-4 pl-12 pr-4 outline-none font-medium ${errors.email ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[var(--primary)]'}`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Secure Password</label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-[var(--primary)]'} opacity-50`} size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                                {!errors.password && formData.password && !showPassword && (
                                    <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 text-green-500 opacity-50" size={18} />
                                )}
                            </div>
                            {errors.password ? (
                                <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.password}</p>
                            ) : (
                                <p className="text-[9px] font-medium opacity-40 ml-1">Requires 8+ chars, 1 number & 1 special character</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-base font-black group relative overflow-hidden"
                            disabled={isSubmitting}
                        >
                            <span className={`flex items-center justify-center gap-2 transition-transform duration-300 ${isSubmitting ? '-translate-y-10' : ''}`}>
                                Start Free Assessment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            {isSubmitting && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="animate-spin" size={20} />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-[10px] opacity-50 leading-relaxed max-w-xs mx-auto font-medium">
                        By creating an account, you agree to our <Link to="/terms" className="underline font-bold hover:text-[var(--primary)]">Terms</Link> and <Link to="/privacy" className="underline font-bold hover:text-[var(--primary)]">Privacy Policy</Link>.
                        <div className="mt-4 text-sm font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[var(--primary)] font-black hover:underline">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
