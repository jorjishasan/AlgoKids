"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import { useSorting } from '@/context/SortingContext';

const InfoDrawerMobile = ({ isOpen, onClose }) => {
  const { method } = useSorting();
  const algorithmInfo = sortingAlgorithmConfig.algorithms.find(algo => algo.name === method);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-blue-500 via-blue-400 to-purple-500 
            rounded-t-3xl shadow-2xl pb-8 pt-8 px-6 max-h-[85vh] overflow-y-auto border-t-4 border-blue-600"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Pull Indicator */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div className="w-12 h-1.5 bg-white/30 rounded-full" />
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center
              text-white text-2xl font-bold hover:bg-white/20 transition-colors border-2 border-white/20"
          >
            ×
          </motion.button>

          {/* Content */}
          <div className="mt-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-6 flex items-center gap-3 text-white"
            >
              <span className="text-3xl">{algorithmInfo?.icon}</span>
              <span className="drop-shadow-lg">{method}</span>
            </motion.h2>

            <div className="space-y-6">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/20"
              >
                <h3 className="text-lg font-bold mb-3 text-white">📖 How it Works</h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  {algorithmInfo?.complexity.description}
                </p>
              </motion.div>

              {/* Time Complexity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-bold mb-4 text-white">⚡ Time Complexity</h3>
                <div className="grid grid-cols-3 gap-3">
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border-2 border-white/20"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-bold mb-2 text-white text-sm">Best Case</h4>
                    <p className="text-green-400 font-mono font-bold text-sm">{algorithmInfo?.complexity.time.best}</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border-2 border-white/20"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-bold mb-2 text-white text-sm">Average</h4>
                    <p className="text-yellow-400 font-mono font-bold text-sm">{algorithmInfo?.complexity.time.average}</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border-2 border-white/20"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-bold mb-2 text-white text-sm">Worst Case</h4>
                    <p className="text-red-400 font-mono font-bold text-sm">{algorithmInfo?.complexity.time.worst}</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Space Complexity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border-2 border-white/20"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold mb-3 text-white">💾 Space Complexity</h3>
                <p className="text-blue-400 font-mono font-bold">{algorithmInfo?.complexity.space}</p>
              </motion.div>

              {/* Stability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border-2 border-white/20"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold mb-3 text-white">🎯 Stability</h3>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${algorithmInfo?.complexity.stable ? 'bg-green-400' : 'bg-red-400'}`} />
                  <p className="text-white/90 font-bold text-sm">
                    This algorithm {algorithmInfo?.complexity.stable ? "maintains" : "does not maintain"} the relative order of equal elements.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoDrawerMobile; 