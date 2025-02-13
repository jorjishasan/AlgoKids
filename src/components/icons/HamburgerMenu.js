"use client"
import { motion } from 'framer-motion';

const HamburgerMenu = ({ isOpen, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-[6px] ${className}`}>
      <motion.span
        className="block h-[2px] w-6 bg-white rounded-full origin-center"
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[2px] w-6 bg-white rounded-full origin-center"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[2px] w-6 bg-white rounded-full origin-center"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default HamburgerMenu; 