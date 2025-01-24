"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import CaretIcon from '@/components/icons/CaretIcon';
import { useState } from 'react';

const MobileMenu = ({ isOpen, setIsOpen, isRunning }) => {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const { 
    method,
    arrayLength,
    speed,
    setMethod,
    setSpeed,
    createArray,
    handleSort,
    arrayConstraints
  } = useSorting();
  const { maxBars } = arrayConstraints;

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    setShowAlgorithms(false);
  };

  const handleArraySizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    createArray(newSize);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 bg-gradient-to-b from-blue-400/95 to-purple-400/95 
            backdrop-blur-sm shadow-lg md:hidden border-t border-white/10 z-50 overflow-y-auto max-h-[calc(100vh-4rem)]"
        >
          <div className="p-6 space-y-6">
            {/* Algorithm Selector */}
            <div className="space-y-3">
              <motion.button
                onClick={() => !isRunning && setShowAlgorithms(!showAlgorithms)}
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
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-white font-bold">
                    Array Size
                  </label>
                  <span className="text-xs text-white/60">
                    max: {maxBars}
                  </span>
                </div>
                <div className="relative">
                  <div 
                    className="absolute bottom-2 h-2 bg-purple-400 -z-10 rounded-lg"
                    style={{
                      width: `${((arrayLength - sortingAlgorithmConfig.array.minSize) / 
                        (maxBars - sortingAlgorithmConfig.array.minSize)) * 100}%`
                    }}
                  />
                  <input
                    type="range"
                    min={sortingAlgorithmConfig.array.minSize}
                    max={maxBars}
                    value={arrayLength}
                    onChange={handleArraySizeChange}
                    disabled={isRunning}
                    className="w-full  h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                      [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                      [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                      disabled:opacity-50"
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-white/60">{arrayLength} items</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-3">
                  Speed
                </label>
                <div className="relative">
                  <div 
                    className="absolute bottom-2 h-2 bg-purple-400 -z-10 rounded-lg"
                    style={{
                      width: `${((speed - sortingAlgorithmConfig.speed.min) / 
                        (sortingAlgorithmConfig.speed.max - sortingAlgorithmConfig.speed.min)) * 100}%`
                    }}
                  />
                  <input
                    type="range"
                    min={sortingAlgorithmConfig.speed.min}
                    max={sortingAlgorithmConfig.speed.max}
                    step={sortingAlgorithmConfig.speed.step}
                    value={speed}
                    onChange={handleSpeedChange}
                    disabled={isRunning}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                      [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                      [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                      disabled:opacity-50"
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-white/60">{speed}ms delay</span>
                </div>
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
                Play
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 