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
                                        className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeSection === sec.id ? 'text-[var(--primary)]' : 'text-black opacity-30 hover:opacity-100'}`}
                                    >
                                        {idx + 1}. {sec.title.split('. ')[1] || sec.title}
                                    </a>
                                ))}
                            </div>
                            <div className="sm:hidden text-[9px] font-bold uppercase tracking-[0.1em] opacity-40 truncate pr-4">
                                {activeSection ? (
                                    <>
                                        Section {post.sections.findIndex(s => s.id === activeSection) + 1}: {post.sections.find(s => s.id === activeSection)?.title.split('. ')[1] || post.sections.find(s => s.id === activeSection)?.title}
                                    </>
                                ) : (
                                    <>Reading: {post.title}</>
                                )}
                            </div>
                            <Link to="/assessment" className="shrink-0">
                                <button className="bg-[var(--primary)] text-white text-[9px] font-bold uppercase tracking-widest px-5 md:px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/10">
                                    Start Consult
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-24 md:pt-32 pb-24">
                <div className="container-wide max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to="/blogs" className="inline-flex items-center gap-2 text-[var(--primary)] font-bold text-[10px] uppercase tracking-widest mb-10 hover:gap-3 transition-all">
                            <ArrowLeft size={14} /> Back to Journal
                        </Link>

                        <div className="mb-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight font-heading uppercase">{post.title}</h1>

                            <div className="flex flex-wrap gap-x-8 md:gap-x-10 gap-y-4 items-center border-y border-black/5 py-4 md:py-5 mt-6 mb-10">
                                <div>
                                    <p className="text-[8px] font-bold uppercase opacity-20 tracking-widest mb-1">Author</p>
                                    <p className="text-xs font-bold">{post.author}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold uppercase opacity-20 tracking-widest mb-1">Reviewer</p>
                                    <p className="text-xs font-bold text-[var(--primary)]">{post.reviewer}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold uppercase opacity-20 tracking-widest mb-1">Date</p>
                                    <p className="text-xs font-bold">{post.date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="aspect-[21/10] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-12 shadow-sm border border-black/5 relative grayscale-[0.3] hover:grayscale-0 transition-all duration-1000">
                            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>

                        <div className="space-y-12">
                            {/* Intro Section */}
                            <div className="text-lg leading-relaxed text-[var(--text-dark)] font-medium italic opacity-70 border-l-2 border-[var(--primary)] pl-6 mb-12">
                                {post.intro}
                            </div>

                            {/* Table of Contents Box */}
                            <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm mb-16">
                                <h4 className="text-[8px] font-bold uppercase tracking-[0.3em] mb-6 text-[var(--primary)]">Research Outline</h4>
                                <div className="grid gap-4">
                                    {post.sections.map((sec, idx) => (
                                        <a href={`#${sec.id}`} key={idx} className="flex items-center gap-4 group">
                                            <span className="w-6 h-6 rounded-full bg-[var(--surface)] flex items-center justify-center text-[9px] font-bold group-hover:bg-[var(--primary)] group-hover:text-white transition-all shrink-0 border border-black/5">{idx + 1}</span>
                                            <span className="text-[11px] font-bold opacity-30 group-hover:opacity-100 transition-all line-clamp-1 truncate uppercase tracking-tight">{sec.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Start Consultation Box */}
                            <div className="bg-[var(--text-dark)] rounded-[32px] p-8 md:p-12 text-white mb-20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] rounded-full blur-[80px] opacity-10 -mr-32 -mt-32"></div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 mb-6">Medical Protocol</span>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Precision hair recovery.</h3>
                                    <p className="text-sm text-white/50 mb-8 max-w-sm leading-relaxed font-medium italic">
                                        "Systemic physiological optimization monitored by clinical specialists."
                                    </p>
                                    <Link to="/assessment" className="w-full sm:w-auto">
                                        <Button className="h-11 px-10 text-[10px] uppercase font-bold tracking-widest bg-[var(--primary)] text-white">
                                            Start Free Assessment <ChevronRight size={14} className="ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="space-y-12 blog-content" ref={contentRef}>
                                {post.sections.map((sec) => (
                                    <div key={sec.id} id={sec.id} className="scroll-mt-24">
                                        <h2 className="text-xl md:text-2xl font-bold mb-4 font-heading uppercase">{sec.title}</h2>
                                        <div className="text-sm md:text-base leading-[1.8] text-[var(--text-dark)]/70 space-y-4">
                                            {sec.content.split('\n').map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-24 pt-16 border-t border-black/5 text-center">
                            <h4 className="text-xl md:text-2xl font-bold mb-10 uppercase tracking-tight">Clinical hair plan <br /><span className="italic font-light opacity-50">starts here.</span></h4>
                            <Link to="/assessment">
                                <Button className="h-11 px-10 text-[10px] uppercase">Begin Free Assessment</Button>
                            </Link>
                            <div className="mt-12 flex justify-center gap-6">
                                <button className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all opacity-30">
                                    <Share2 size={16} />
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
