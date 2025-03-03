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
          className="fixed top-16 left-0 right-0 bg-gradient-to-b from-blue-500/95 via-blue-400/95 to-purple-500/95 
            backdrop-blur-md shadow-2xl md:hidden  z-50 overflow-y-auto max-h-[calc(100vh-4rem)]"
        >
          <div className="p-6 space-y-6">
            {/* Algorithm Selector */}
            <div className="space-y-3">
              <motion.button
                onClick={() => !isRunning && setShowAlgorithms(!showAlgorithms)}
                className={`w-full flex justify-between items-center bg-white/10 hover:bg-white/15 
                  text-white font-bold px-5 py-4 rounded-2xl transition-all duration-200 shadow-lg border-2 border-white/20
                  ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isRunning ? 1 : 1.02 }}
                whileTap={{ scale: isRunning ? 1 : 0.98 }}
                disabled={isRunning}
              >
                <span className="text-lg">
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
                    className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20"
                  >
                    {sortingAlgorithmConfig.algorithms.map((algo, index) => (
                      <motion.button
                        key={algo.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`block w-full text-left px-5 py-4 text-white font-bold text-lg
                          hover:bg-white/10 transition-all relative overflow-hidden
                          ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleMethodChange(algo.name)}
                        disabled={isRunning}
                      >
                        <span className="relative z-10">
                          {algo.icon} {algo.name}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <div className="space-y-8 bg-white/10 p-6 rounded-2xl border-2 border-white/20">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-white text-lg font-bold">
                    🎲 Array Size
                  </label>
                  <span className="text-sm text-white/80 font-medium px-3 py-1 bg-white/10 rounded-full">
                    max: {maxBars}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="relative">
                    <div 
                      className="absolute bottom-2 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/30"
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
                      className="relative w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 
                        [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-yellow-400
                        [&::-webkit-slider-thumb]:shadow-lg disabled:opacity-50"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-white/80 font-medium">{arrayLength} blocks</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white text-lg font-bold mb-3">
                  ⚡ Speed
                </label>
                <div className="relative pt-1">
                  <div className="relative">
                    <div 
                      className="absolute bottom-2 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/30"
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
                      className="relative w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 
                        [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-green-400
                        [&::-webkit-slider-thumb]:shadow-lg disabled:opacity-50"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-white/80 font-medium">{speed}ms delay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button 
                className={`flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 
                  text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200
                  border-b-4 border-yellow-500 hover:border-yellow-600
                  ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  createArray(arrayLength);
                  setIsOpen(false);
                }}
                disabled={isRunning}
                whileHover={{ scale: isRunning ? 1 : 1.05 }}
                whileTap={{ scale: isRunning ? 1 : 0.95 }}
              >
                <span className="text-lg">🎲 Shuffle</span>
              </motion.button>
              <motion.button 
                className={`flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500
                  text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200
                  border-b-4 border-green-500 hover:border-green-600
                  ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  handleSort();
                  setIsOpen(false);
                }}
                disabled={isRunning}
                whileHover={{ scale: isRunning ? 1 : 1.05 }}
                whileTap={{ scale: isRunning ? 1 : 0.95 }}
              >
                <span className="text-lg">🎮 Play!</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 