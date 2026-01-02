import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { ArrowUpRight } from 'lucide-react';

const BlogCarousel = () => {
    // Duplicate blogs for infinite scroll feel
    const displayBlogs = [...blogs, ...blogs];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-wide mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-4 block">Expert Insights</span>
                        <h2 className="text-3xl md:text-5xl font-black">Medical Journal.</h2>
                    </div>
                    <Link to="/blogs" className="text-[var(--primary)] font-bold text-xs uppercase tracking-widest hover:mr-2 transition-all mt-6 md:mt-0">
                        View All Entries →
                    </Link>
                </div>
            </div>

            <div className="relative mt-16">

                <motion.div
                    className="flex gap-6 md:gap-8 px-4"
                    whileHover={{ x: 0, transition: { duration: 0 } }}
                    animate={{ x: [-2000, 0] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}

                    style={{ width: "fit-content" }}
                >
                    {displayBlogs.map((post, i) => (
                        <Link
                            key={i}
                            to={`/blogs/${post.id}`}
                            className="w-[85vw] sm:w-[400px] shrink-0 premium-card !p-0 overflow-hidden group hover:border-[var(--primary)] hover:translate-y-2 transition-all"
                        >



                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] mb-4 block">
                                    {post.category}
                                </span>
                                <h3 className="text-xl font-bold font-heading mb-4 line-clamp-2 leading-tight group-hover:text-[var(--primary)] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm opacity-50 line-clamp-2 italic mb-8">
                                    "{post.subtitle}"
                                </p>
                                <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs uppercase tracking-widest">
                                    Read More <ArrowUpRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>

                {/* Faded edges */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
        </section>
    );
};

export default BlogCarousel;
