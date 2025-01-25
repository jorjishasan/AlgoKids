'use client';
import { motion, AnimatePresence } from 'framer-motion';

const Stats = ({ isOpen, stats = { swaps: 0, moves: 0 }, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
        onClick={onClose}
      >
        <motion.div 
          className="bg-gradient-to-br from-blue-400 to-purple-400 p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4"
          onClick={e => e.stopPropagation()}
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🎉 Yay, Sorted ! 🎉
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white/20 rounded-xl p-4">
              <h3 className="text-lg font-bold text-white">
                🔄 Swaps Made
              </h3>
              <p className="text-3xl font-bold text-white text-center">
                {stats.swaps}
              </p>
            </div>

            <div className="bg-white/20 rounded-xl p-4">
              <h3 className="text-lg font-bold text-white">
                🔍 Comparisons Made
              </h3>
              <p className="text-3xl font-bold text-white text-center">
                {stats.moves}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-xl"
          >
            Continue Learning! 🚀
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Stats; 