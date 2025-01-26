'use client';
import { motion } from 'framer-motion';

const InfoIcon = ({ onClick }) => {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      whileHover={{ scale: 1.1 }}
      className="text-white cursor-pointer lg:w-8 lg:h-8"
      onClick={onClick}
    >
      {/* Outer glow effect */}
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        className="stroke-white"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* Main circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        className="fill-white/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      />
      
      {/* "i" symbol */}
      <motion.g
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fill-white"
      >
        <circle cx="12" cy="8" r="1.25" />
        <rect x="11" y="10" width="2" height="7" rx="0.5" />
      </motion.g>
    </motion.svg>
  );
};

export default InfoIcon; 