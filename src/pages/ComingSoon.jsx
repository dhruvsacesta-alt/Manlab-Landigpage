import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowLeft, Construction } from 'lucide-react';

const ComingSoon = () => {
    return (
        <div className="min-h-screen pt-40 pb-20 flex items-center justify-center text-center">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl mx-auto"
                >
                    <div className="w-16 h-16 bg-[var(--surface)] rounded-2xl flex items-center justify-center text-[var(--primary)] mx-auto mb-10 border border-black/5">
                        <Construction size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)] mb-4 block">System Optimization</span>
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-8">Clinical Module <br /><span className="italic font-light opacity-50">unavailable.</span></h1>
                    <p className="text-base opacity-40 mb-12 font-medium italic">
                        "This diagnostic interface is currently undergoing pharmacological synchronization. Operational status will be restored momentarily."
                    </p>
                    <Link to="/">
                        <Button variant="outline" className="px-8 h-10 text-[9px] font-bold uppercase tracking-widest">
                            <ArrowLeft size={14} className="mr-2 opacity-50" /> Return to Command
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ComingSoon;
