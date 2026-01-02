import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact:', form);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[var(--background)]">
            <div className="container-wide">
                <div className="text-center mb-20">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block">Here to help</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Contact Support.</h1>
                    <p className="text-xl opacity-60 max-w-2xl mx-auto">
                        Have questions about your treatment or shipping? Our medical support team is available 24/7.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >


                        <div className="bg-[var(--text-dark)] text-white p-8 rounded-[40px] shadow-lg flex items-start gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/20 rounded-bl-[100px]"></div>
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                                <Mail size={24} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                                <p className="opacity-60 mb-4 leading-relaxed">For detailed inquiries, prescriptions, or account help.</p>
                                <a href="mailto:support@manlabs.com" className="font-bold underline decoration-[var(--primary)] underline-offset-4">support@manlabs.com</a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-3xl text-center">
                                <Phone className="mx-auto mb-4 text-[var(--primary)]" />
                                <h4 className="font-bold mb-1">Phone</h4>
                                <p className="text-xs opacity-50">+91 8800-MANLAB</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl text-center">
                                <MessageSquare className="mx-auto mb-4 text-[var(--primary)]" />
                                <h4 className="font-bold mb-1">WhatsApp</h4>
                                <p className="text-xs opacity-50">Chat 24/7</p>
                            </div>
                        </div>

                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl"
                    >
                        <h3 className="text-2xl font-black mb-8">Send a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full bg-[var(--surface)] border-transparent focus:border-[var(--primary)] rounded-xl py-3 px-4 outline-none border transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full bg-[var(--surface)] border-transparent focus:border-[var(--primary)] rounded-xl py-3 px-4 outline-none border transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Subject</label>
                                <select
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className="w-full bg-[var(--surface)] border-transparent focus:border-[var(--primary)] rounded-xl py-3 px-4 outline-none border transition-all font-medium appearance-none"
                                >
                                    <option value="">Select a topic...</option>
                                    <option value="medical">Medical Question</option>
                                    <option value="shipping">Shipping & Delivery</option>
                                    <option value="billing">Billing Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full bg-[var(--surface)] border-transparent focus:border-[var(--primary)] rounded-xl py-3 px-4 outline-none border transition-all font-medium resize-none"
                                    required
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full py-4 text-base">
                                Send Message <Send size={18} />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
