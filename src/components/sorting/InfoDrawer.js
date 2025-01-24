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
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed inset-y-0 right-0 w-full sm:w-[460px] lg:w-[560px] bg-gradient-to-b from-blue-400 to-purple-400 
            shadow-lg p-6 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl font-bold"
          >
            ×
          </motion.button>

          {/* Content */}
          <div className="mt-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {algorithm?.icon} {method}
            </h2>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-white/90">
                  {algorithm?.complexity.description}
                </p>
              </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Time Complexity</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 text-nowrap p-4 rounded-lg">
              <h4 className="font-medium mb-1">Best Case</h4>
              <p className="text-white/80 font-mono">{algorithm.complexity.time.best}</p>
            </div>
            <div className="bg-white/10 p-4 text-nowrap rounded-lg">
              <h4 className="font-medium mb-1">Average Case</h4>
              <p className="text-white/80 font-mono">{algorithm.complexity.time.average}</p>
            </div>
            <div className="bg-white/10 p-4 text-nowrap rounded-lg">
              <h4 className="font-medium mb-1">Worst Case</h4>
              <p className="text-white/80 font-mono">{algorithm.complexity.time.worst}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Space Complexity</h3>
          <p className="text-white/80 font-mono">{algorithm.complexity.space}</p>
        </div>

              {/* Stability */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Stability</h3>
                <p className="text-white/90">
                  This algorithm is {algorithm?.complexity.stable ? "stable" : "not stable"}.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoDrawer; 