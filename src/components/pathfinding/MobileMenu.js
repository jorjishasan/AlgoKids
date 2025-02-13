"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { usePathfinding } from '@/context/PathfindingContext';
import { pathfindingAlgorithmConfig } from '@/config/algorithmConfig';
import CaretIcon from '@/components/icons/CaretIcon';
import { useState } from 'react';

const MobileMenu = ({ isOpen, setIsOpen, isRunning, method, setMethod, makeGrid, visualizePathfinding }) => {
  const [showAlgorithms, setShowAlgorithms] = useState(false);

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    setShowAlgorithms(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[4.5rem] left-0 right-0 bg-gradient-to-b from-blue-600 to-violet-500 
              shadow-lg md:hidden border-t border-white/10 z-40"
          >
            <motion.div 
              className="p-6 space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto bg-gradient-to-b from-blue-600/95 to-violet-500/95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Algorithm Selector */}
              <div className="space-y-3">
                <motion.button
                  onClick={() => !isRunning && setShowAlgorithms(!showAlgorithms)}
                  className={`w-full flex justify-between items-center bg-black/20 hover:bg-black/30 
                    text-white font-bold px-4 py-3 rounded-xl transition-colors
                    ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: isRunning ? 1 : 1.02 }}
                  whileTap={{ scale: isRunning ? 1 : 0.98 }}
                  disabled={isRunning}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">
                      {pathfindingAlgorithmConfig.algorithms.find(algo => algo.name === method)?.icon}
                    </span>
                    <span>{method}</span>
                  </span>
                  <CaretIcon isOpen={showAlgorithms} />
                </motion.button>
                
                <AnimatePresence>
                  {showAlgorithms && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-black/20 rounded-xl divide-y divide-white/10">
                        {pathfindingAlgorithmConfig.algorithms.map((algo) => (
                          <motion.button
                            key={algo.name}
                            className="w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-black/30
                              transition-colors"
                            onClick={() => handleMethodChange(algo.name)}
                            whileHover={{ x: isRunning ? 0 : 10 }}
                            disabled={isRunning}
                          >
                            <span className="text-xl">{algo.icon}</span>
                            <div className="text-left">
                              <div className="font-medium">{algo.name}</div>
                              <div className="text-xs text-white/70">{algo.description}</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button 
                  className={`flex items-center justify-center gap-2 bg-yellow-400/90 hover:bg-yellow-400 
                    text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-yellow-400/20
                    transition-colors duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    makeGrid();
                    setIsOpen(false);
                  }}
                  disabled={isRunning}
                  whileHover={{ scale: isRunning ? 1 : 1.05 }}
                  whileTap={{ scale: isRunning ? 1 : 0.95 }}
                >
                  Clear Board
                </motion.button>
                <motion.button 
                  className={`flex items-center justify-center gap-2 bg-green-400/90 hover:bg-green-400 
                    text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-400/20
                    transition-colors duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    visualizePathfinding();
                    setIsOpen(false);
                  }}
                  disabled={isRunning}
                  whileHover={{ scale: isRunning ? 1 : 1.05 }}
                  whileTap={{ scale: isRunning ? 1 : 0.95 }}
                >
                  Find Path
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 