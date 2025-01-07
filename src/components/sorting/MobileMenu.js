"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';

const MobileMenu = ({ isOpen, setIsOpen }) => {
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
    setIsOpen(false);
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
            <button 
              className="w-full text-left text-gray-300 hover:text-white py-2"
              onClick={() => {
                createArray(arrayLength);
                setIsOpen(false);
              }}
              disabled={isRunning}
            >
              Randomize
            </button>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Algorithms</p>
              {["Bubble Sort", "Selection Sort", "Merge Sort", "Quick Sort"].map(algo => (
                <button
                  key={algo}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                  onClick={() => setMethod(algo)}
                  disabled={isRunning}
                >
                  {algo}
                </button>
              ))}
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

            <button 
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              onClick={(e) => {
                handleSort(e);
                setIsOpen(false);
              }}
              disabled={isRunning}
            >
              Sort
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 