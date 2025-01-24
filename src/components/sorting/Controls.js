"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import CaretIcon from '@/components/icons/CaretIcon';
import { useSorting } from '@/context/SortingContext';

const Controls = ({ isRunning }) => {
  const [showControls, setShowControls] = useState(false);
  const { arrayLength, speed, setSpeed, createArray, arrayConstraints } = useSorting();
  const { maxBars } = arrayConstraints;

  const handleArraySizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    createArray(newSize);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: isRunning ? 1 : 1.05 }}
        whileTap={{ scale: isRunning ? 1 : 0.95 }}
        onClick={() => !isRunning && setShowControls(!showControls)}
        className={`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 
          text-white font-bold rounded-xl transition-colors ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isRunning}
      >
        <span>⚙️ Settings</span>
        <motion.span
          animate={{ rotate: showControls ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretIcon />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-64 p-4 rounded-xl bg-white/10 backdrop-blur-sm 
              shadow-xl border border-white/20"
          >
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-white font-bold">
                    Array Size
                  </label>
                  <span className="text-xs text-white">
                    max: {maxBars}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="relative">
                    <div 
                      className="absolute bottom-2 h-2 bg-purple-400 rounded-lg"
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
                      className="relative w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                        [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                        disabled:opacity-50"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-black/50">{arrayLength} items</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  Speed
                </label>
                <div className="relative pt-1">
                  <div className="relative">
                    <div 
                      className="absolute bottom-2 h-2 bg-purple-400 rounded-lg"
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
                      className="relative w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                        [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                        disabled:opacity-50"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-black/50">{speed}ms delay</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Controls; 