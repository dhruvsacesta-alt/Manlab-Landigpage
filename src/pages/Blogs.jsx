import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import SEO from '../components/SEO';

const Blogs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[var(--background)] min-h-screen pt-32 pb-24">
            <SEO
                title="Expert Hair Science Journal"
                description="Deep-dive articles on hair loss prevention, treatment myths, and clinical breakthroughs by India's top dermatologists."
            />
            <div className="container-wide">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-20 gap-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-10 uppercase tracking-tight leading-tight text-[var(--text-dark)]">
                            Medical <br /><span className="text-[var(--primary)] italic font-light lowercase">journal.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-light)] font-medium max-w-xl opacity-80 leading-relaxed">
                            "A peer-reviewed collection of clinical case studies, pharmacological breakthroughs, and dermatological insights."
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {['All', 'Clinical', 'Safety', 'Myths'].map(cat => (
                            <button key={cat} className="px-6 py-2.5 rounded-full border border-[var(--primary)]/10 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--primary)] hover:bg-white transition-all bg-white/20 backdrop-blur shadow-sm">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 mb-20">
                    {blogs.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/blogs/${post.id}`}>
                                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 relative border border-[var(--primary)]/5 shadow-2xl bg-white">
                                    <img
                                        src={post.img}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
                                    />

                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/30 backdrop-blur-xl rounded-full text-[10px] font-bold uppercase text-white tracking-widest border border-white/20">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-tight uppercase text-[var(--text-dark)]">
                                        {post.title}
                                    </h3>
                                    <p className="text-[var(--text-light)] opacity-70 text-sm leading-relaxed mb-6 line-clamp-2 font-medium italic">
                                        "{post.subtitle}"
                                    </p>
                                    <span className="flex items-center gap-3 text-[var(--primary)] font-bold text-[11px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                        Study Full Analysis <ArrowUpRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
