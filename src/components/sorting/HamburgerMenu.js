"use client"
import { motion } from 'framer-motion';

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  return (
    <motion.button
      className="relative flex h-12 w-12 items-center justify-center rounded-full 
        bg-gradient-to-r from-blue-400/20 to-purple-400/20 hover:from-blue-400/30 
        hover:to-purple-400/30 transition-all duration-300 md:hidden"
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center justify-center gap-[6px] group">
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
    </motion.button>
  );
};

export default HamburgerMenu; 