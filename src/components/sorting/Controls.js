"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import CaretIcon from '@/components/icons/CaretIcon';

const Controls = ({ createArray, setSpeed, isRunning }) => {
  const [showControls, setShowControls] = useState(false);
  const [arraySize, setArraySize] = useState(sortingAlgorithmConfig.array.defaultSize);
  const [speedValue, setSpeedValue] = useState(sortingAlgorithmConfig.speed.default);
  const [maxBars, setMaxBars] = useState(sortingAlgorithmConfig.array.maxSize);

  useEffect(() => {
    const calculateMaxBars = () => {
      const isMobile = window.innerWidth <= 768;
      const containerWidth = isMobile ? window.innerWidth - 32 : window.innerWidth * 0.8;
      const minBarWidth = isMobile ? 4 : 8;
      const gap = isMobile ? 2 : 4;
      const maxPossibleBars = Math.floor(containerWidth / (minBarWidth + gap));
      setMaxBars(Math.min(maxPossibleBars, sortingAlgorithmConfig.array.maxSize));
    };

    calculateMaxBars();
    window.addEventListener('resize', calculateMaxBars);
    return () => window.removeEventListener('resize', calculateMaxBars);
  }, []);

  const handleArraySizeChange = (e) => {
    const value = Number(e.target.value);
    setArraySize(value);
    createArray(value);
  };

  const handleSpeedChange = (e) => {
    const value = Number(e.target.value);
    setSpeedValue(value);
    setSpeed(value);
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
                <label className="block text-white font-bold mb-2">
                  Array Size
                </label>
                <div className="relative pt-1">
                  <div className="relative">
                    <div 
                      className="absolute bottom-2 h-2 bg-purple-400/50 rounded-lg"
                      style={{
                        width: `${((arraySize - sortingAlgorithmConfig.array.minSize) / 
                          (maxBars - sortingAlgorithmConfig.array.minSize)) * 100}%`
                      }}
                    />
                    <input
                      type="range"
                      min={sortingAlgorithmConfig.array.minSize}
                      max={maxBars}
                      value={arraySize}
                      onChange={handleArraySizeChange}
                      disabled={isRunning}
                      className="relative w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                        [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                        disabled:opacity-50"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/60">{arraySize} items</span>
                    <span className="text-xs text-white/60">max: {maxBars}</span>
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
                      className="absolute bottom-2 h-2 bg-purple-400/50 rounded-lg"
                      style={{
                        width: `${((speedValue - sortingAlgorithmConfig.speed.min) / 
                          (sortingAlgorithmConfig.speed.max - sortingAlgorithmConfig.speed.min)) * 100}%`
                      }}
                    />
                    <input
                      type="range"
                      min={sortingAlgorithmConfig.speed.min}
                      max={sortingAlgorithmConfig.speed.max}
                      step={sortingAlgorithmConfig.speed.step}
                      value={speedValue}
                      onChange={handleSpeedChange}
                      disabled={isRunning}
                      className="relative w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                        [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-400
                        disabled:opacity-50"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/60">{speedValue}ms delay</span>
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