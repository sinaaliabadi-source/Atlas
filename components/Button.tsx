'use client';

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants: Record<typeof variant, string> = {
    primary: 'bg-gradient-to-l from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-[1px] focus:ring-blue-400',
    secondary: 'bg-white text-blue-700 border border-blue-100 shadow hover:shadow-md hover:-translate-y-[1px] focus:ring-blue-400',
    ghost: 'bg-transparent text-slate-800 hover:bg-slate-100 focus:ring-slate-300',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(baseStyles, variants[variant], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
