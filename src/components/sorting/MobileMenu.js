"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';
import { useState } from 'react';
import CaretIcon from '@/components/icons/CaretIcon';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';

const MobileMenu = ({ isOpen, setIsOpen, isRunning }) => {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const { 
    method,
    setMethod,
    createArray, 
    arrayLength, 
    speed, 
    handleSort,
    setSpeed
  } = useSorting();

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    setShowAlgorithms(false);
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed top-16 left-0 right-0 bg-gradient-to-b from-blue-400/95 to-purple-400/95 
            backdrop-blur-sm shadow-lg md:hidden border-t border-white/10 z-50 overflow-y-auto max-h-[calc(100vh-4rem)]"
        >
          <div className="p-6 space-y-6">
            {/* Algorithm Selector */}
            <div className="space-y-3">
              <motion.button
                onClick={() => setShowAlgorithms(!showAlgorithms)}
                className={`w-full flex justify-between items-center bg-white/10 hover:bg-white/20 
                  text-white font-bold px-4 py-3 rounded-xl transition-colors
                  ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isRunning ? 1 : 1.02 }}
                whileTap={{ scale: isRunning ? 1 : 0.98 }}
                disabled={isRunning}
              >
                <span>
                  {sortingAlgorithmConfig.algorithms.find(algo => algo.name === method)?.icon} {method}
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
                    <div className="bg-white/10 rounded-xl divide-y divide-white/10">
                      {sortingAlgorithmConfig.algorithms.map((algo) => (
                        <motion.button
                          key={algo.name}
                          className={`block w-full text-left px-4 py-3 text-white font-semibold 
                            hover:bg-white/10 transition-colors ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => handleMethodChange(algo.name)}
                          whileHover={{ x: isRunning ? 0 : 10 }}
                          disabled={isRunning}
                        >
                          {algo.icon} {algo.name}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-white font-bold mb-3">
                  Array Size
                </label>
                <input
                  type="range"
                  min={sortingAlgorithmConfig.array.minSize}
                  max={sortingAlgorithmConfig.array.maxSize}
                  defaultValue={sortingAlgorithmConfig.array.defaultSize}
                  onChange={(e) => createArray(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                    [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                    disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-3">
                  Speed
                </label>
                <input
                  type="range"
                  min={sortingAlgorithmConfig.speed.min}
                  max={sortingAlgorithmConfig.speed.max}
                  step={sortingAlgorithmConfig.speed.step}
                  defaultValue={sortingAlgorithmConfig.speed.default}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                    [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                    disabled:opacity-50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button 
                className={`flex items-center justify-center gap-2 bg-yellow-400/90 hover:bg-yellow-400 
                  text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-yellow-400/20
                  transition-colors duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  createArray(arrayLength);
                  setIsOpen(false);
                }}
                disabled={isRunning}
                whileHover={{ scale: isRunning ? 1 : 1.05 }}
                whileTap={{ scale: isRunning ? 1 : 0.95 }}
              >
                Shuffle
              </motion.button>
              <motion.button 
                className={`flex items-center justify-center gap-2 bg-green-400/90 hover:bg-green-400 
                  text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-400/20
                  transition-colors duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  handleSort();
                  setIsOpen(false);
                }}
                disabled={isRunning}
                whileHover={{ scale: isRunning ? 1 : 1.05 }}
                whileTap={{ scale: isRunning ? 1 : 0.95 }}
              >
                Sort
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 