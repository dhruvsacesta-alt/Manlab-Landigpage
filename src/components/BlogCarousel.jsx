import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { ArrowRight } from 'lucide-react';

const BlogCarousel = () => {
    // Duplicate for seamless scroll
    const displayBlogs = [...blogs, ...blogs];

    return (
        <section className="py-20 md:py-24 bg-white overflow-hidden">
            <div className="container-wide mb-12 md:mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-4 block text-center md:text-left">Knowledge Exchange</span>
                        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-center md:text-left leading-tight">Digital <br /><span className="italic font-light opacity-50">Journal.</span></h2>
                    </div>
                    <Link to="/blogs" className="text-[var(--primary)]/60 font-bold text-[9px] uppercase tracking-[0.2em] hover:text-[var(--primary)] transition-all mt-6 md:mt-0 text-center md:text-left">
                        Review Archive —
                    </Link>
                </div>
            </div>

            {/* Marquee Container with pause-on-hover logic */}
            <div className="relative mt-12 pause-on-hover">
                <div className="flex gap-6 sm:gap-8 px-4 animate-marquee w-max">
                    {displayBlogs.map((post, i) => (
                        <article
                            key={`${post.id}-${i}`}
                            className="w-[85vw] sm:w-[440px] shrink-0 group cursor-pointer"
                        >
                            <Link to={`/blogs/${post.id}`}>
                                <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative shadow-xl border border-black/5 bg-[var(--surface)]">
                                    <img
                                        src={post.img}
                                        alt={`Cover for: ${post.title}`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/10 backdrop-blur-xl rounded-full text-[8px] font-bold uppercase text-white tracking-[0.2em] border border-white/10">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="px-1">
                                    <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-tight uppercase font-heading">
                                        {post.title}
                                    </h3>
                                    <p className="opacity-40 text-xs leading-relaxed mb-6 line-clamp-2 font-medium italic">
                                        "{post.subtitle}"
                                    </p>
                                    <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-[9px] uppercase tracking-widest group-hover:gap-3 transition-all">
                                        Analysis Report <ArrowRight size={12} />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Smooth Fade Overlays */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default BlogCarousel;
