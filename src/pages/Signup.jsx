import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, User, Lock, Phone } from 'lucide-react';
import Button from '../ui/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup:', formData);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[var(--background)] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--accent)]/10 rounded-br-[100px] pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-2 block">New Patient</span>
                        <h2 className="text-3xl font-black">Create Account.</h2>
                        <p className="text-sm opacity-50">Join 2M+ men taking control of their health.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-50" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-[var(--surface)] border border-transparent focus:border-[var(--primary)] rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-50" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-[var(--surface)] border border-transparent focus:border-[var(--primary)] rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                                        placeholder="Phone"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-50" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[var(--surface)] border border-transparent focus:border-[var(--primary)] rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-50" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-[var(--surface)] border border-transparent focus:border-[var(--primary)] rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full py-4 text-base">
                            Start Free Assessment <ArrowRight size={18} />
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-xs opacity-50 leading-relaxed max-w-xs mx-auto">
                        By creating an account, you agree to our <Link to="/terms" className="underline hover:text-[var(--primary)]">Terms</Link> and <Link to="/privacy" className="underline hover:text-[var(--primary)]">Privacy Policy</Link>.
                        <div className="mt-4 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[var(--primary)] font-bold hover:underline">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
