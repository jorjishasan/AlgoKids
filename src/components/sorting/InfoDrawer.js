"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import { useSorting } from '@/context/SortingContext';

const InfoDrawer = ({ isOpen, onClose }) => {
  const { method } = useSorting();
  const algorithm = sortingAlgorithmConfig.algorithms.find(algo => algo.name === method);

  if (!algorithm) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md
              border-t border-white/20 rounded-t-3xl shadow-2xl z-50 p-6 pb-8 
              max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              {/* Handle bar */}
              <div className="w-16 h-1.5 bg-white/30 rounded-full mb-6" />
              
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">{algorithm.icon}</span>
                {method}
              </h2>

              <div className="w-full max-w-4xl space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                      <span className="text-2xl">📖</span> How it Works
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {algorithm.complexity.description}
                    </p>
                  </motion.div>

                  {/* Stability */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                      <span className="text-2xl">🎯</span> Stability
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${algorithm.complexity.stable ? 'bg-green-400' : 'bg-red-400'}`} />
                      <p className="text-white/90">
                        This algorithm {algorithm.complexity.stable ? "maintains" : "does not maintain"} the relative order of equal elements.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Time Complexity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                      <span className="text-2xl">⚡</span> Time Complexity
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/10 p-3 rounded-xl">
                        <h4 className="font-bold mb-1 text-white text-sm">Best</h4>
                        <p className="text-green-400 font-mono font-bold">{algorithm.complexity.time.best}</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-xl">
                        <h4 className="font-bold mb-1 text-white text-sm">Average</h4>
                        <p className="text-yellow-400 font-mono font-bold">{algorithm.complexity.time.average}</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-xl">
                        <h4 className="font-bold mb-1 text-white text-sm">Worst</h4>
                        <p className="text-red-400 font-mono font-bold">{algorithm.complexity.time.worst}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Space Complexity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                      <span className="text-2xl">💾</span> Space Complexity
                    </h3>
                    <div className="bg-white/10 p-4 rounded-xl">
                      <p className="text-blue-400 font-mono text-lg font-bold">{algorithm.complexity.space}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InfoDrawer; 