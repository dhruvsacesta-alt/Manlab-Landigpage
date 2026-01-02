import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Lock } from 'lucide-react';
import Button from '../ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login:', { email, password });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[var(--background)] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-bl-[100px] pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black mb-2">Welcome Back.</h2>
                        <p className="text-sm opacity-50">Access your personalized care plan.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-50" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[var(--surface)] border border-transparent focus:border-[var(--primary)] rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-xs font-bold text-[var(--primary)] hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full py-4 text-base">
                            Sign In <ArrowRight size={18} />
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm opacity-50">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[var(--primary)] font-bold hover:underline">
                                Sign Up
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
