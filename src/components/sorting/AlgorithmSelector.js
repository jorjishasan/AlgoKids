"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import CaretIcon from '@/components/icons/CaretIcon';

const AlgorithmSelector = ({ method, setMethod, isRunning }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isRunning}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 
            text-white font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>
            {sortingAlgorithmConfig.algorithms.find(algo => algo.name === method)?.icon} {method}
          </span>
          <CaretIcon isOpen={isOpen} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-sm 
                rounded-xl overflow-hidden z-50 divide-y divide-white/10"
            >
              {sortingAlgorithmConfig.algorithms.map((algo) => (
                <div
                  key={algo.name}
                  className="flex items-center justify-between hover:bg-white/10 transition-colors group"
                >
                  <motion.button
                    className="flex-1 text-left px-4 py-3 text-white font-semibold"
                    onClick={() => {
                      setMethod(algo.name);
                      setIsOpen(false);
                    }}
                    whileHover={{ x: 10 }}
                  >
                    {algo.icon} {algo.name}
                  </motion.button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AlgorithmSelector; 