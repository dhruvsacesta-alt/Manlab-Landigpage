import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, Globe, Shield, Clock, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import SEO from '../components/SEO';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Contact:', form);
        setIsSubmitting(false);
        alert("Message sent! Our medical team will reach out shortly.");
        setForm({ name: '', email: '', subject: '', message: '' });
    };

    const contactMethods = [
        {
            icon: <Mail className="text-[var(--primary)]" />,
            title: "Email Support",
            detail: "support@manlabs.com",
            desc: "For prescriptions & medical records",
            link: "mailto:support@manlabs.com"
        },
        {
            icon: <MessageSquare className="text-green-500" />,
            title: "WhatsApp",
            detail: "Chat with Experts",
            desc: "Response time: < 15 mins",
            link: "https://wa.me/918800000000"
        },
        {
            icon: <Phone className="text-blue-500" />,
            title: "Phone",
            detail: "+91 8800-MANLAB",
            desc: "Mon-Sat, 10am - 8pm",
            link: "tel:+918800000000"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--text-dark)] overflow-x-hidden pt-32 pb-48">
            <SEO
                title="Contact Medical Support"
                description="Connect with Man Labs' medical team for queries regarding hair loss treatments, prescriptions, or order tracking."
            />

            <div className="container-wide relative z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-start">

                        {/* Left Column: Info Hub */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-10 uppercase tracking-tight leading-tight text-[var(--text-dark)]">
                                Connect with <br /><span className="text-[var(--primary)] italic font-light lowercase">clinical care.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-[var(--text-light)] mb-14 font-medium leading-relaxed max-w-md opacity-80">
                                "Proven medicine. Clear guidance. No guesswork. Our medical team is ready to assist your journey."
                            </p>

                            <div className="grid sm:grid-cols-1 gap-6 mb-12 max-w-md">
                                {contactMethods.map((method, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={method.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                        className="flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-[var(--primary)]/5 hover:border-[var(--primary)]/20 transition-all group shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-[var(--background)] flex items-center justify-center border border-[var(--primary)]/5 group-hover:scale-105 transition-transform shrink-0">
                                            {React.cloneElement(method.icon, { size: 20, strokeWidth: 1.2 })}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-[var(--primary)] opacity-40 mb-1">{method.title}</h4>
                                            <p className="text-base font-bold uppercase tracking-tight truncate">{method.detail}</p>
                                        </div>
                                        <ArrowRight className="opacity-0 group-hover:opacity-40 transition-opacity text-[var(--primary)] shrink-0" size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Column: Interactive Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-[var(--text-dark)] rounded-[3rem] p-10 md:p-14 text-white relative shadow-[0_50px_100px_-20px_rgba(45,41,38,0.3)] overflow-hidden border border-white/5"
                        >
                            {/* Form Decor */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)] rounded-full blur-[120px] opacity-[0.15] -mr-40 -mt-40"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold mb-12 uppercase tracking-tight text-white">Clinical Inquiry</h3>
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white opacity-40">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                className="w-full bg-transparent border-b border-white/10 px-0 py-3 outline-none focus:border-[var(--primary)] transition-all font-medium text-base placeholder:opacity-20 placeholder:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white opacity-40">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="username@domain.com"
                                                className="w-full bg-transparent border-b border-white/10 px-0 py-3 outline-none focus:border-[var(--primary)] transition-all font-medium text-base placeholder:opacity-20 placeholder:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white opacity-40">Reason for Inquiry</label>
                                        <div className="flex flex-wrap gap-3 pt-1">
                                            {['Medical', 'Logistics', 'Protocol', 'Technical'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, subject: type })}
                                                    className={`px-6 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${form.subject === type ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20' : 'border-white/10 text-white/30 hover:border-white/30'}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white opacity-40">Message</label>
                                        <textarea
                                            name="message"
                                            rows="3"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Provide technical details regarding your inquiry..."
                                            className="w-full bg-transparent border-b border-white/10 px-0 py-3 outline-none focus:border-[var(--primary)] transition-all font-medium text-base resize-none placeholder:opacity-20 placeholder:text-white"
                                            required
                                        ></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-6 text-[11px] font-bold uppercase tracking-widest group shadow-[0_20px_40px_-10px_rgba(166,123,91,0.3)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] border-0"
                                        disabled={isSubmitting}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            {isSubmitting ? "Processing..." : "Authorize Transmission"}
                                            <Send size={14} className="opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
