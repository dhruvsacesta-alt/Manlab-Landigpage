import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "h-[48px] px-8 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 font-accent text-sm tracking-tight shrink-0";

    const variants = {
        primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:translate-y-[1px]",
        outline: "border-1.5 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white active:translate-y-[1px]",
        ghost: "text-[var(--primary)] hover:bg-[var(--primary)]/5",
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
