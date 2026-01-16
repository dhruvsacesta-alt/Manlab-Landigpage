import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, ChevronRight, Cpu, Zap, Activity } from 'lucide-react';
import { blogs } from '../data/blogs';
import Button from '../ui/Button';
import SEO from '../components/SEO';

const BlogDetail = () => {
    const { id } = useParams();
    const post = blogs.find((b) => b.id === id);
    const [activeSection, setActiveSection] = useState("");
    const [showStickyNav, setShowStickyNav] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = 500;
            setShowStickyNav(scrollY > threshold);

            // Access main navbar to hide it
            const mainNav = document.querySelector('.glass-nav');
            if (mainNav) {
                mainNav.style.transform = scrollY > threshold ? 'translateY(-100%)' : 'translateY(0)';
                mainNav.style.transition = 'transform 0.5s ease-in-out';
            }

            // Determine active section
            if (post?.sections) {

                for (const section of post.sections) {
                    const el = document.getElementById(section.id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top < 150 && rect.bottom > 150) {
                            setActiveSection(section.id);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            const mainNav = document.querySelector('.glass-nav');
            if (mainNav) {
                mainNav.style.transform = 'translateY(0)';
            }
        };
    }, [id, post]);

    if (!post) {
        return (
            <div className="pt-40 pb-20 text-center">
                <h2 className="text-3xl font-bold mb-8 font-heading">Post not found.</h2>
                <Link to="/blogs">
                    <Button variant="outline">Back to Blogs</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[var(--secondary)] min-h-screen">
            <SEO
                title={post.title}
                description={post.intro.substring(0, 160)}
                image={post.img}
                type="article"
            />
            {/* Sticky Navigation Pill - Improved Mobile Behavior */}
            <AnimatePresence>
                {showStickyNav && (
                    <motion.div
                        initial={{ y: -100, x: "-50%", opacity: 0 }}
                        animate={{ y: 20, x: "-50%", opacity: 1 }}
                        exit={{ y: -100, x: "-50%", opacity: 0 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl"
                    >
                        <div className="bg-white/80 backdrop-blur-2xl border border-white/40 rounded-full px-6 md:px-8 py-3 md:py-4 shadow-2xl flex items-center justify-between gap-4 md:gap-8 overflow-hidden">
                            <div className="hidden sm:flex items-center gap-6 whitespace-nowrap overflow-x-auto no-scrollbar scroll-smooth">
                                {post.sections.map((sec, idx) => (
                                    <a
                                        key={sec.id}
                                        href={`#${sec.id}`}
                                        className={`text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeSection === sec.id ? 'text-[var(--primary)] scale-110' : 'opacity-40 hover:opacity-100'}`}
                                    >
                                        {idx + 1}. {sec.title.split('. ')[1] || sec.title}
                                    </a>
                                ))}
                            </div>
                            <div className="sm:hidden text-[10px] font-black uppercase tracking-[0.2em] opacity-40 truncate pr-4">
                                {activeSection ? (
                                    <>
                                        Section {post.sections.findIndex(s => s.id === activeSection) + 1}: {post.sections.find(s => s.id === activeSection)?.title.split('. ')[1] || post.sections.find(s => s.id === activeSection)?.title}
                                    </>
                                ) : (
                                    <>Reading: {post.title}</>
                                )}
                            </div>
                            <Link to="/assessment" className="shrink-0 hidden sm:block">
                                <button className="bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-widest px-5 md:px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20">
                                    Start Consult
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-24 md:pt-32 pb-24">
                <div className="container-wide max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to="/blogs" className="inline-flex items-center gap-2 text-[var(--primary)] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 md:mb-12 hover:gap-3 transition-all">
                            <ArrowLeft size={16} /> Back to Journal
                        </Link>

                        <div className="mb-12">
                            <h1 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight font-heading">{post.title}</h1>

                            <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-4 items-center border-y border-[var(--border)] py-4 md:py-6 mt-6 md:mt-10 mb-8 md:mb-12">
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase opacity-30 tracking-widest mb-1 md:mb-2">Author</p>
                                    <p className="text-xs md:text-sm font-bold">{post.author}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase opacity-30 tracking-widest mb-1 md:mb-2">Reviewer</p>
                                    <p className="text-xs md:text-sm font-bold text-[var(--primary)]">{post.reviewer}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase opacity-30 tracking-widest mb-1 md:mb-2">Date</p>
                                    <p className="text-xs md:text-sm font-bold">{post.date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="aspect-[21/9] max-h-[400px] rounded-2xl md:rounded-[32px] overflow-hidden mb-12 md:mb-16 shadow-xl relative mx-auto border border-black/5">
                            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>

                        <div className="space-y-12 md:space-y-16">
                            {/* Intro Section */}
                            <div className="text-lg md:text-xl leading-relaxed text-[var(--text-dark)] font-medium opacity-80 border-l-2 border-[var(--primary)] pl-6 md:pl-8 mb-12 md:mb-16 italic">
                                {post.intro}
                            </div>

                            {/* Table of Contents Box */}
                            <div className="bg-white rounded-3xl md:rounded-[40px] p-8 md:p-10 border border-[var(--border)] shadow-sm mb-16 md:mb-20">
                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 md:mb-8 text-[var(--primary)]">Guide Outline</h4>
                                <div className="grid gap-4 md:gap-5">
                                    {post.sections.map((sec, idx) => (
                                        <a href={`#${sec.id}`} key={idx} className="flex items-center gap-4 group">
                                            <span className="w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-[10px] font-black group-hover:bg-[var(--primary)] group-hover:text-white transition-all shrink-0">{idx + 1}</span>
                                            <span className="text-xs md:text-sm font-bold opacity-60 group-hover:opacity-100 transition-all line-clamp-1">{sec.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Start Consultation Box - Redesigned for Mobile & Impact */}
                            <div className="bg-[var(--text-dark)] rounded-[40px] p-8 md:p-16 text-white mb-20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] rounded-full blur-[100px] opacity-20 -mr-48 -mt-48 transition-all duration-700 group-hover:opacity-30 group-hover:scale-110"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--primary)] rounded-full blur-[120px] opacity-10 -ml-32 -mb-32"></div>

                                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                                    <div className="flex-1 text-center lg:text-left">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                                            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Free Medical Assessment</span>
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1] text-[var(--primary)]">The future of <br />hair recovery.</h3>
                                        <p className="text-lg text-white/60 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                                            No generic kits. No guesswork. Just science-backed medicine, monitored by experts.
                                        </p>
                                        <Link to="/assessment" className="inline-block w-full sm:w-auto">
                                            <Button className="w-full sm:w-auto px-12 py-7 text-base shadow-2xl shadow-[var(--primary)]/20">
                                                Start Consultation <ChevronRight size={18} />
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="grid gap-4 w-full lg:w-96">
                                        {[
                                            { icon: <Cpu className="text-[var(--primary)]" />, title: "The AI Advantage", desc: "Precision diagnostics for your scalp." },
                                            { icon: <Zap className="text-[var(--primary)]" />, title: "Efficiency & Accuracy", desc: "Doctor-approved plans in minutes." },
                                            { icon: <Activity className="text-[var(--primary)]" />, title: "Continuous Monitoring", desc: "Plan adjustments as your hair responds." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-5 bg-white/[0.03] border border-white/10 p-6 rounded-[32px] hover:bg-white/[0.08] transition-all group/item">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover/item:bg-[var(--primary)] group-hover/item:text-white transition-all duration-500">
                                                    {React.cloneElement(item.icon, { size: 22 })}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-base mb-1 text-white">{item.title}</h4>
                                                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="space-y-12 md:space-y-16 blog-content" ref={contentRef}>
                                {post.sections.map((sec) => (
                                    <div key={sec.id} id={sec.id} className="scroll-mt-24">
                                        <h2 className="text-2xl md:text-3xl font-black mb-6 font-heading">{sec.title}</h2>
                                        <div className="text-base md:text-lg leading-[1.7] text-[var(--text-dark)]/70 space-y-4">
                                            {sec.content.split('\n').map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-32 pt-20 border-t border-[var(--border)] text-center">
                            <h4 className="text-4xl font-black mb-12">Ready for a clinical <br />hair plan?</h4>
                            <Link to="/assessment">
                                <Button className="px-12 py-6 text-sm">Begin Free Assessment</Button>
                            </Link>
                            <div className="mt-12 flex justify-center gap-6">
                                <button className="w-14 h-14 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
