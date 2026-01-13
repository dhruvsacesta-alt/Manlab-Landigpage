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
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title={post.title}
                description={post.intro.substring(0, 160)}
                image={post.img}
                type="article"
            />
            {/* Sticky Navigation Pill - Updated Theme */}
            <AnimatePresence>
                {showStickyNav && (
                    <motion.div
                        initial={{ y: -100, x: "-50%", opacity: 0 }}
                        animate={{ y: 20, x: "-50%", opacity: 1 }}
                        exit={{ y: -100, x: "-50%", opacity: 0 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl"
                    >
                        <div className="bg-white/90 backdrop-blur-2xl border border-[var(--primary)]/10 rounded-full px-6 md:px-8 py-3 md:py-4 shadow-2xl flex items-center justify-between gap-4 md:gap-8 overflow-hidden">
                            <div className="hidden sm:flex items-center gap-6 whitespace-nowrap overflow-x-auto no-scrollbar scroll-smooth">
                                {post.sections.map((sec, idx) => (
                                    <a
                                        key={sec.id}
                                        href={`#${sec.id}`}
                                        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeSection === sec.id ? 'text-[var(--primary)]' : 'text-[var(--text-dark)] opacity-30 hover:opacity-100'}`}
                                    >
                                        {idx + 1}. {sec.title.split('. ')[1] || sec.title}
                                    </a>
                                ))}
                            </div>
                            <div className="sm:hidden text-[10px] font-bold uppercase tracking-[0.1em] opacity-40 truncate pr-4 text-[var(--text-dark)]">
                                {activeSection ? (
                                    <>
                                        Sec {post.sections.findIndex(s => s.id === activeSection) + 1}
                                    </>
                                ) : (
                                    <>{post.title}</>
                                )}
                            </div>
                            <Link to="/assessment" className="shrink-0">
                                <button className="bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--primary)]/20">
                                    Start Consult
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-24 md:pt-40 pb-32">
                <div className="container-wide max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to="/blogs" className="inline-flex items-center gap-3 text-[var(--primary)] font-bold text-[11px] uppercase tracking-[0.2em] mb-12 hover:gap-4 transition-all">
                            <ArrowLeft size={16} /> Back to Journal
                        </Link>

                        <div className="mb-14">
                            <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight uppercase tracking-tight text-[var(--text-dark)]">{post.title}</h1>

                            <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-6 items-center border-y border-[var(--primary)]/10 py-6 md:py-8 mt-10 mb-14">
                                <div>
                                    <p className="text-[10px] font-bold uppercase opacity-30 tracking-[0.3em] mb-2 text-[var(--text-dark)]">Author</p>
                                    <p className="text-sm font-bold text-[var(--text-dark)] uppercase">{post.author}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase opacity-30 tracking-[0.3em] mb-2 text-[var(--text-dark)]">Medical Review</p>
                                    <p className="text-sm font-bold text-[var(--primary)] uppercase">{post.reviewer}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase opacity-30 tracking-[0.3em] mb-2 text-[var(--text-dark)]">Publication</p>
                                    <p className="text-sm font-bold text-[var(--text-dark)] uppercase">{post.date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="aspect-[21/10] rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-[var(--primary)]/5 relative grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 bg-white">
                            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>

                        <div className="space-y-16">
                            {/* Intro Section */}
                            <div className="text-xl md:text-2xl leading-relaxed text-[var(--text-light)] font-medium italic opacity-80 border-l-[3px] border-[var(--primary)] pl-8 md:pl-12 mb-20">
                                "{post.intro}"
                            </div>

                            {/* Table of Contents Box */}
                            <div className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-[var(--primary)]/5 shadow-xl mb-24 max-w-2xl">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-[var(--primary)]">Research Parameters</h4>
                                <div className="grid gap-6">
                                    {post.sections.map((sec, idx) => (
                                        <a href={`#${sec.id}`} key={idx} className="flex items-center gap-6 group">
                                            <span className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center text-[11px] font-bold group-hover:bg-[var(--primary)] group-hover:text-white transition-all shrink-0 border border-[var(--primary)]/5">{idx + 1}</span>
                                            <span className="text-sm font-bold text-[var(--text-dark)] opacity-40 group-hover:opacity-100 transition-all line-clamp-1 truncate uppercase tracking-tight">{sec.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Start Consultation Box */}
                            <div className="bg-[var(--text-dark)] rounded-[3.5rem] p-12 md:p-16 text-white mb-28 relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] rounded-full blur-[120px] opacity-20 -mr-48 -mt-48"></div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white uppercase tracking-tight">Precision hair recovery.</h3>
                                    <p className="text-lg text-white/50 mb-10 max-w-md leading-relaxed font-medium italic">
                                        "Professional medical consultation and pharmacist grade formulations."
                                    </p>
                                    <Link to="/assessment" className="w-full sm:w-auto">
                                        <Button className="h-14 px-12 text-[11px] uppercase font-bold tracking-widest bg-[var(--primary)] hover:bg-[var(--primary-hover)] border-0 text-white shadow-2xl shadow-[var(--primary)]/20">
                                            Start Free Consultation <ChevronRight size={16} className="ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="space-y-20 blog-content" ref={contentRef}>
                                {post.sections.map((sec) => (
                                    <div key={sec.id} id={sec.id} className="scroll-mt-32">
                                        <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-tight text-[var(--text-dark)]">{sec.title}</h2>
                                        <div className="text-base md:text-lg leading-[1.8] text-[var(--text-light)] space-y-6 font-medium">
                                            {sec.content.split('\n').map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-32 pt-24 border-t border-[var(--primary)]/5 text-center">
                            <h4 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-tight text-[var(--text-dark)]">Clinical hair plan <br /><span className="text-[var(--primary)] italic font-light lowercase">starts here.</span></h4>
                            <Link to="/assessment">
                                <Button className="h-14 px-12 text-[11px] uppercase font-bold tracking-widest bg-[var(--primary)] hover:bg-[var(--primary-hover)] border-0">Begin Free Assessment</Button>
                            </Link>
                            <div className="mt-16 flex justify-center gap-8">
                                <button className="w-14 h-14 rounded-full border border-[var(--primary)]/10 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all text-[var(--primary)] shadow-sm">
                                    <Share2 size={20} />
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
