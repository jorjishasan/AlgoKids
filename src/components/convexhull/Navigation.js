"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import CubeLogo from '@/components/icons/CubeLogo';
import { useState } from 'react';

const Navigation = ({ isAnimating, points, onRandomize, onVisualize, onClear }) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 shadow-lg p-4 relative z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 focus:outline-none"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <CubeLogo isHovered={isLogoHovered} />
          <motion.h1 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ConvexHull
          </motion.h1>
        </Link>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <motion.button
            onClick={onRandomize}
            disabled={isAnimating}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl 
              font-bold shadow-lg shadow-yellow-400/20 transition-colors disabled:opacity-50 
              flex items-center gap-2 relative z-20"
            whileHover={{ scale: isAnimating ? 1 : 1.05 }}
            whileTap={{ scale: isAnimating ? 1 : 0.95 }}
          >
            🎲 Randomize
          </motion.button>
          <motion.button
            onClick={onVisualize}
            disabled={points.length < 3 || isAnimating}
            className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-xl 
              font-bold shadow-lg shadow-green-400/20 transition-colors disabled:opacity-50
              flex items-center gap-2 relative z-20"
            whileHover={{ scale: (points.length < 3 || isAnimating) ? 1 : 1.05 }}
            whileTap={{ scale: (points.length < 3 || isAnimating) ? 1 : 0.95 }}
          >
            🚀 Start
          </motion.button>
          <motion.button
            onClick={onClear}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl 
              font-bold transition-colors disabled:opacity-50 flex items-center gap-2 relative z-20"
            whileHover={{ scale: isAnimating ? 1 : 1.05 }}
            whileTap={{ scale: isAnimating ? 1 : 0.95 }}
          >
            🧹 Clear
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 