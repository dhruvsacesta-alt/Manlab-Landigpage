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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl mx-auto"
                >
                    <div className="w-20 h-20 bg-[var(--surface)] rounded-3xl flex items-center justify-center text-[var(--primary)] mx-auto mb-10">
                        <Construction size={40} />
                    </div>
                    <h1 className="text-5xl font-bold mb-6">Enhancing Your Experience</h1>
                    <p className="text-xl mb-12 opacity-70">
                        This module is currently being optimized by our medical and design teams to ensure the highest quality of care. Check back shortly.
                    </p>
                    <Link to="/">
                        <Button variant="outline">
                            <ArrowLeft size={18} /> Back to Health Center
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ComingSoon;
