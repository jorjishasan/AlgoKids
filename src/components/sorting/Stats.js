'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

const Stats = ({ isOpen, stats = { swaps: 0, moves: 0 }, onClose }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
        
        <motion.div 
          className="bg-gradient-to-br from-blue-400 to-purple-400 p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 border-4 border-white/20"
          onClick={e => e.stopPropagation()}
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              🎮 Level Complete! 🎮
            </h2>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-white/20 rounded-2xl p-6 transform hover:scale-105 transition-transform"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  🔄 Power Moves
                </h3>
                <p className="text-4xl font-bold text-white">
                  {stats.swaps}
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/20 rounded-2xl p-6 transform hover:scale-105 transition-transform"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  🔍 Brain Power
                </h3>
                <p className="text-4xl font-bold text-white">
                  {stats.moves}
                </p>
              </motion.div>
            </div>

            <motion.button
              onClick={onClose}
              className="mt-8 w-full bg-green-400 hover:bg-green-500 text-white text-xl font-bold py-4 px-6 rounded-2xl
                shadow-lg transform transition-all duration-200 border-b-4 border-green-500 hover:border-green-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Level! 🚀
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Stats; 