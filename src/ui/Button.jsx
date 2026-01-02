import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 font-accent text-sm tracking-wide";

    const variants = {
        primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 active:scale-95",
        outline: "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white active:scale-95",
        ghost: "text-[var(--primary)] hover:bg-[var(--primary)]/5 active:scale-95",
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
