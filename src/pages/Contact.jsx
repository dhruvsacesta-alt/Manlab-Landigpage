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
        <div className="min-h-screen bg-white text-[var(--text-dark)] overflow-x-hidden pt-32 pb-48">
            <SEO
                title="Contact Medical Support"
                description="Connect with Man Labs' medical team for queries regarding hair loss treatments, prescriptions, or order tracking."
            />

            {/* Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary)] rounded-full blur-[120px]"></div>
            </div>

            <div className="container-wide relative z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">

                        {/* Left Column: Info Hub */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-6 block">Support Protocol</span>
                            <h1 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tight leading-tight">Connect with <br /><span className="italic font-light opacity-50">clinical care.</span></h1>
                            <p className="text-base md:text-lg opacity-40 mb-12 font-medium leading-relaxed max-w-md">
                                Our medical support infrastructure is designed to provide immediate resolution for physiological and pharmacological inquiries.
                            </p>

                            <div className="grid sm:grid-cols-1 gap-4 mb-12 max-w-md">
                                {contactMethods.map((method, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={method.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--surface)] border border-black/5 hover:border-[var(--primary)]/30 hover:bg-white transition-all group shadow-sm hover:shadow-xl"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-black/5 group-hover:scale-105 transition-transform shrink-0">
                                            {React.cloneElement(method.icon, { size: 16, strokeWidth: 1.5 })}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-[8px] uppercase tracking-widest opacity-30 mb-1">{method.title}</h4>
                                            <p className="text-xs md:text-sm font-bold uppercase tracking-tight truncate">{method.detail}</p>
                                        </div>
                                        <ArrowRight className="opacity-0 group-hover:opacity-30 transition-opacity text-black shrink-0" size={14} />
                                    </motion.a>
                                ))}
                            </div>

                        </motion.div>

                        {/* Right Column: Interactive Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-[var(--text-dark)] rounded-[32px] p-8 md:p-12 text-white relative shadow-2xl overflow-hidden border border-white/5"
                        >
                            {/* Form Decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] rounded-full blur-[100px] opacity-10 -mr-32 -mt-32"></div>

                            <div className="relative z-10">
                                <span className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-30 mb-2 block">Direct Transmission</span>
                                <h3 className="text-xl md:text-2xl font-bold mb-10 uppercase tracking-tight text-white">Clinical Inquiry</h3>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Full Identification</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                className="w-full bg-transparent border-b border-white/10 px-0 py-2 outline-none focus:border-[var(--primary)] transition-all font-medium text-sm placeholder:opacity-20 placeholder:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Electronic Mail</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="username@domain.com"
                                                className="w-full bg-transparent border-b border-white/10 px-0 py-2 outline-none focus:border-[var(--primary)] transition-all font-medium text-sm placeholder:opacity-20 placeholder:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Context Classification</label>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {['Medical', 'Logistics', 'Protocol', 'Technical'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, subject: type })}
                                                    className={`px-5 py-2 rounded-full border text-[8px] font-bold uppercase tracking-widest transition-all ${form.subject === type ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'border-white/5 text-white/30 hover:border-white/20'}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">Detailed Mensage</label>
                                        <textarea
                                            name="message"
                                            rows="2"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Provide technical details regarding your inquiry..."
                                            className="w-full bg-transparent border-b border-white/10 px-0 py-2 outline-none focus:border-[var(--primary)] transition-all font-medium text-sm resize-none placeholder:opacity-20 placeholder:text-white"
                                            required
                                        ></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-5 text-xs font-bold uppercase tracking-[0.2em] group shadow-2xl bg-[var(--primary)] hover:bg-[var(--primary)]/90"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Processing..." : "Authorize Transmission"} <Send size={14} className="ml-3 opacity-50" />
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
