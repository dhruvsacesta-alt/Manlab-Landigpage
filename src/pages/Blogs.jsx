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
        <div className="pt-40">
            <SEO
                title="Expert Hair Science Journal"
                description="Deep-dive articles on hair loss prevention, treatment myths, and clinical breakthroughs by India's top dermatologists."
            />
            <div className="container-wide">
                <div className="flex justify-between items-end mb-24">
                    <div className="max-w-xl">
                        <h1 className="text-7xl font-black mb-8">Man Labs <br /><span className="text-[var(--primary)] italic font-normal">Medical Journal.</span></h1>
                        <p className="text-xl opacity-60">Peer-reviewed insights, debunked myths, and the latest in clinical hair science for the Indian man.</p>
                    </div>
                    <div className="hidden lg:flex gap-4">
                        {['All', 'Clinical', 'Safety', 'Myths'].map(cat => (
                            <button key={cat} className="px-6 py-2 rounded-full border border-[var(--border)] text-xs font-bold font-accent uppercase tracking-widest hover:border-[var(--primary)] transition-all">{cat}</button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
                    {blogs.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/blogs/${post.id}`}>
                                <div className="aspect-[4/3] rounded-[40px] overflow-hidden mb-8 relative">
                                    <img
                                        src={post.img}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-[10px] font-black uppercase text-white tracking-widest">
                                        {post.category}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="opacity-60 text-sm leading-relaxed mb-8 line-clamp-3 italic">
                                    "{post.subtitle}"
                                </p>
                                <span className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                    Read Full Entry <ArrowUpRight size={16} />
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
