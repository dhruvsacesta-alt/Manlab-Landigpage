import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { ArrowRight } from 'lucide-react';

const BlogCarousel = () => {
    // Duplicate for seamless scroll
    const displayBlogs = [...blogs, ...blogs];

    return (
        <section className="bg-[var(--background)] py-32 md:py-48 overflow-hidden">
            <div className="container-wide mb-24 md:mb-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-center md:text-left leading-tight text-[var(--text-dark)]">
                            Medical <br /><span className="text-[var(--primary)] italic font-light lowercase">journal.</span>
                        </h2>
                    </div>
                    <Link to="/blogs" className="text-[var(--primary)] font-bold text-[11px] uppercase tracking-[0.4em] hover:text-[var(--primary-hover)] transition-all mt-10 md:mt-0 text-center md:text-left flex items-center gap-3 group">
                        Review Protocol Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative mt-8 pause-on-hover">
                <div className="flex gap-16 md:gap-24 animate-marquee w-max py-10">
                    {displayBlogs.map((post, i) => (
                        <article
                            key={`${post.id}-${i}`}
                            className="w-[85vw] sm:w-[550px] shrink-0 group cursor-pointer"
                        >
                            <Link to={`/blogs/${post.id}`}>
                                <div className="aspect-[16/10] rounded-[3rem] overflow-hidden mb-10 relative shadow-[0_40px_80px_-20px_rgba(45,41,38,0.2)] border border-[var(--primary)]/5 bg-white bg-white group-hover:shadow-[0_60px_100px_-30px_rgba(166,123,91,0.3)] transition-all duration-700">
                                    <img
                                        src={post.img}
                                        alt={`Cover for: ${post.title}`}
                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute top-8 left-8 px-6 py-2.5 bg-black/40 backdrop-blur-2xl rounded-full text-[10px] font-bold uppercase text-white tracking-[0.2em] border border-white/10">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="px-4">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-tight uppercase text-[var(--text-dark)]">
                                        {post.title}
                                    </h3>
                                    <p className="text-[var(--text-light)] opacity-70 text-lg leading-relaxed mb-8 line-clamp-2 font-medium italic">
                                        "{post.subtitle}"
                                    </p>
                                    <div className="flex items-center gap-4 text-[var(--primary)] font-bold text-[11px] uppercase tracking-[0.3em] group-hover:gap-6 transition-all">
                                        Study Analysis <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Overlays matching the beige background */}
                <div className="absolute top-0 left-0 w-48 md:w-96 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-48 md:w-96 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default BlogCarousel;
