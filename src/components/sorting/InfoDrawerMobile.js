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
          className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-blue-400 to-purple-400 
            rounded-t-3xl shadow-lg pb-8 pt-6 px-4 max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Pull Indicator */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <div className="w-12 h-1.5 bg-white/30 rounded-full" />
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-6 text-white text-2xl font-bold"
          >
            ×
          </motion.button>

          {/* Content */}
          <div className="overflow-y-auto h-full">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              {algorithmInfo?.icon} {method}
            </h2>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-white/90">
                  {algorithmInfo?.complexity.description}
                </p>
              </div>

              {/* Time Complexity */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Time Complexity</h3>
                <div className="grid grid-cols-3 gap-3">
                  {/* Best Case Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center">
                    <span className="text-white/90 text-sm mb-2">Best Case</span>
                    <span className="font-mono text-white text-lg font-semibold">
                      {algorithmInfo?.complexity.time.best}
                    </span>
                  </div>
                  
                  {/* Average Case Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center">
                    <span className="text-white/90 text-sm mb-2">Average Case</span>
                    <span className="font-mono text-white text-lg font-semibold">
                      {algorithmInfo?.complexity.time.average}
                    </span>
                  </div>
                  
                  {/* Worst Case Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center">
                    <span className="text-white/90 text-sm mb-2">Worst Case</span>
                    <span className="font-mono text-white text-lg font-semibold">
                      {algorithmInfo?.complexity.time.worst}
                    </span>
                  </div>
                </div>
              </div>

              {/* Space Complexity */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Space Complexity</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center">
                  <span className="font-mono text-white text-xl font-semibold">
                    {algorithmInfo?.complexity.space}
                  </span>
                </div>
              </div>

              {/* Stability */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Stability</h3>
                <p className="text-white/90">
                  This algorithm is {algorithmInfo?.complexity.stable ? "stable" : "not stable"}.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoDrawerMobile; 