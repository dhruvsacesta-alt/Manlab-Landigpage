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
        <div className="min-h-screen bg-white text-[var(--text-dark)] overflow-x-hidden pt-28 md:pt-40 lg:pt-[250px]">
            <SEO
                title="Contact Medical Support"
                description="Connect with Man Labs' medical team for queries regarding hair loss treatments, prescriptions, or order tracking."
            />

            {/* Dramatic Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary)] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#A67B5B] rounded-full blur-[100px]"></div>
            </div>

            <div className="container-wide pb-48 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left Column: Info Hub */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)] mb-4 block">Support Hub</span>
                            <h1 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
                                We are here to <span className="italic font-normal">listen.</span>
                            </h1>
                            <p className="text-sm md:text-lg opacity-60 mb-8 md:mb-10 leading-relaxed max-w-md">
                                Our clinical team is dedicated to your journey. Whether it's a medical question or a technical issue, we've got you covered.
                            </p>

                            <div className="grid sm:grid-cols-1 gap-4 mb-12">
                                {contactMethods.map((method, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={method.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-[20px] md:rounded-[24px] bg-[var(--surface)] border border-black/5 hover:border-[var(--primary)] transition-all group"
                                    >
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                                            {React.cloneElement(method.icon, { size: 18 })}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-[8px] md:text-[9px] uppercase tracking-widest opacity-40 mb-0.5">{method.title}</h4>
                                            <p className="text-sm md:text-base font-black truncate">{method.detail}</p>
                                        </div>
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary)] shrink-0" size={14} />
                                    </motion.a>
                                ))}
                            </div>

                        </motion.div>

                        {/* Right Column: Interactive Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-[var(--text-dark)] rounded-[32px] p-8 md:p-10 text-white relative shadow-2xl overflow-hidden"
                        >
                            {/* Form Decor */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--primary)] rounded-full blur-[80px] opacity-20 -mr-24 -mt-24"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-8">Direct Message</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full bg-white/5 border-b border-white/20 px-0 py-2 md:py-3 outline-none focus:border-[var(--primary)] transition-all font-medium text-sm md:text-base placeholder:opacity-20"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="w-full bg-white/5 border-b border-white/20 px-0 py-2 md:py-3 outline-none focus:border-[var(--primary)] transition-all font-medium text-sm md:text-base placeholder:opacity-20"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Inquiry Type</label>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {['Medical', 'Orders', 'App Help', 'Other'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, subject: type })}
                                                    className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${form.subject === type ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'border-white/10 text-white/30 hover:border-white/40'}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Message</label>
                                        <textarea
                                            name="message"
                                            rows="3"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="How can we assist you?"
                                            className="w-full bg-white/5 border-b border-white/20 px-0 py-3 outline-none focus:border-[var(--primary)] transition-all font-medium text-base resize-none placeholder:opacity-20"
                                            required
                                        ></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-4 md:py-5 text-sm md:text-base font-black group shadow-xl shadow-[var(--primary)]/10"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send size={16} className="ml-2" />
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
