import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { ArrowRight } from 'lucide-react';

const BlogCarousel = () => {
    // Duplicate for seamless scroll
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

            {/* Marquee Container with pause-on-hover logic */}
            <div className="relative mt-16 pause-on-hover">
                <div className="flex gap-8 px-4 animate-marquee w-max">
                    {displayBlogs.map((post, i) => (
                        <article
                            key={`${post.id}-${i}`}
                            className="w-[85vw] sm:w-[500px] shrink-0 group cursor-pointer"
                        >
                            <Link to={`/blogs/${post.id}`}>
                                <div className="aspect-[16/10] rounded-[40px] overflow-hidden mb-8 relative shadow-xl border border-black/5 bg-[var(--surface)]">
                                    <img
                                        src={post.img}
                                        alt={`Cover for: ${post.title}`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-black uppercase text-white tracking-widest border border-white/20">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h3 className="text-2xl font-black mb-4 font-heading group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="opacity-60 text-sm leading-relaxed mb-8 line-clamp-2 italic">
                                        "{post.subtitle}"
                                    </p>
                                    <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                                        Study Full Analysis <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Smooth Fade Overlays */}
                <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default BlogCarousel;
