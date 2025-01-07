"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';

const Toast = () => {
  const { showToast, toggleToast, createArray, handleSort } = useSorting();

  if (!showToast) return null;

  return (
    <AnimatePresence mode="wait">
      {showToast && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
          className="fixed bottom-20 left-4 md:left-8 bg-gray-800/90 backdrop-blur text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-[90vw] md:max-w-md"
        >
          <button
            onClick={() => {
              toggleToast();
              handleSort();
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            ×
          </button>
          <p className="mb-3 text-sm max-w-[40ch]">
            Array is already sorted. You can still visualize or shuffle it.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                createArray();
                toggleToast();
              }}
              className="bg-green-500 text-white px-4 py-1.5 text-sm rounded hover:bg-green-600 transition-colors"
            >
              Shuffle
            </button>
            <button
              onClick={() => {
                toggleToast();
                handleSort();
              }}
              className="bg-gray-600 text-white px-4 py-1.5 text-sm rounded hover:bg-gray-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 