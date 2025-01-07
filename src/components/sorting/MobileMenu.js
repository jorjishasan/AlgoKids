"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';
import { useState } from 'react';
import cn from '@/utils/cn';
import CaretDown from '@/components/icons/CaretDown';

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const { 
    method, 
    setState, 
    createArray, 
    arrayLength, 
    speed, 
    isRunning, 
    handleSort 
  } = useSorting();

  const setMethod = (newMethod) => {
    setState(prev => ({ ...prev, method: newMethod }));
    setShowAlgorithms(false);
  };

  const setSpeed = (newSpeed) => {
    setState(prev => ({ ...prev, speed: newSpeed }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-0 right-0 bg-gray-800 shadow-lg md:hidden"
        >
          <div className="p-4 space-y-4">
            <div className="relative">
              <button
                onClick={() => setShowAlgorithms(!showAlgorithms)}
                className="w-full flex justify-between items-center text-gray-300 hover:text-white py-2"
                disabled={isRunning}
              >
                <span>{method}</span>
                <CaretDown className={cn(
                  "transition-transform duration-200",
                  showAlgorithms ? "rotate-180" : ""
                )} />
              </button>
              
              <AnimatePresence>
                {showAlgorithms && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 py-1 bg-gray-700 rounded-md"
                  >
                    {["Quick Sort", "Bubble Sort", "Selection Sort", "Merge Sort"].map(algo => (
                      <button
                        key={algo}
                        className={cn(
                          "block w-full text-left px-4 py-2",
                          method === algo ? "text-green-500" : "text-gray-300 hover:text-white"
                        )}
                        onClick={() => setMethod(algo)}
                        disabled={isRunning}
                      >
                        {algo}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Array Size</label>
              <input
                type="range"
                min="2"
                max={Math.floor(window.screen.width/50)}
                defaultValue={Math.floor((window.screen.width/50)/2)}
                onChange={(e) => createArray(Number(e.target.value))}
                disabled={isRunning}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Speed</label>
              <input
                type="range"
                min="100"
                max="1000"
                defaultValue="500"
                onChange={(e) => setSpeed(1100 - Number(e.target.value))}
                disabled={isRunning}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <button 
                className="w-1/2 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                onClick={() => {
                  createArray(arrayLength);
                  setIsOpen(false);
                }}
                disabled={isRunning}
              >
                Shuffle
              </button>
              <button 
                className="w-1/2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                onClick={(e) => {
                  handleSort(e);
                  setIsOpen(false);
                }}
                disabled={isRunning}
              >
                Sort
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 