"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import Button from '@/components/common/Button';
import { useSorting } from '@/context/SortingContext';

const Controls = ({ isRunning }) => {
  const [showControls, setShowControls] = useState(false);
  const { arrayLength, speed, setSpeed, createArray, arrayConstraints } = useSorting();
  const { maxBars } = arrayConstraints;
  const controlsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target)) {
        setShowControls(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close controls when sorting starts
  useEffect(() => {
    if (isRunning) {
      setShowControls(false);
    }
  }, [isRunning]);

  const handleArraySizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    createArray(newSize);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
  };

  return (
    <div className="relative" ref={controlsRef}>
      <Button
        variant="dropdown"
        onClick={() => !isRunning && setShowControls(!showControls)}
        disabled={isRunning}
        showCaret
        isCaretOpen={showControls}
      >
        🎮 Settings
      </Button>

      <AnimatePresence>
        {!isRunning && showControls && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-72 p-6 rounded-2xl bg-gradient-to-br from-blue-400/95 to-purple-400/95 
              backdrop-blur-md shadow-xl border-2 border-white/20"
          >
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-white text-lg font-bold">
                    🎲 Array Size
                  </label>
                  <span className="text-sm text-white/80 font-medium px-2 py-1 bg-white/10 rounded-full">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Controls; 