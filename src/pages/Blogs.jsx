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
        <div className="pt-32 pb-24">
            <SEO
                title="Expert Hair Science Journal"
                description="Deep-dive articles on hair loss prevention, treatment myths, and clinical breakthroughs by India's top dermatologists."
            />
            <div className="container-wide">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-20 gap-10">
                    <div className="max-w-2xl">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-4 block">Clinical Repository</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight leading-tight">Medical <br /><span className="text-[var(--primary)] italic font-light opacity-50">Archive.</span></h1>
                        <p className="text-base md:text-lg opacity-40 font-medium max-w-xl">A peer-reviewed collection of clinical case studies, pharmacological breakthroughs, and dermatological insights.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Clinical', 'Safety', 'Myths'].map(cat => (
                            <button key={cat} className="px-5 py-2 rounded-full border border-black/5 text-[9px] font-bold uppercase tracking-widest hover:border-[var(--primary)]/50 hover:bg-[var(--surface)] transition-all">{cat}</button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-20">
                    {blogs.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/blogs/${post.id}`}>
                                <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative border border-black/5 shadow-lg">
                                    <img
                                        src={post.img}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/10 backdrop-blur-xl rounded-full text-[8px] font-bold uppercase text-white tracking-[0.2em] border border-white/10">
                                        {post.category}
                                    </div>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-3 font-heading group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-tight uppercase">
                                    {post.title}
                                </h3>
                                <p className="opacity-40 text-xs leading-relaxed mb-6 line-clamp-2 font-medium italic">
                                    "{post.subtitle}"
                                </p>
                                <span className="flex items-center gap-2 text-[var(--primary)] font-bold text-[9px] uppercase tracking-widest group-hover:gap-3 transition-all">
                                    Study Full Analysis <ArrowUpRight size={14} />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
