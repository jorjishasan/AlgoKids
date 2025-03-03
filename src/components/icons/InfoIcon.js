'use client';
import { motion } from 'framer-motion';

const InfoIcon = ({ onClick }) => { 
  return (
    <motion.div
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 
        rounded-full flex items-center justify-center text-white text-xl font-bold cursor-pointer
        shadow-lg border-b-4 border-orange-500 z-20 group hover:from-yellow-300 hover:to-orange-300"
    >
      <span className="text-2xl text-white">?</span>
    </motion.div>
  );
};

export default InfoIcon; 