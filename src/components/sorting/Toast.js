"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';

const Toast = () => {
  const { showToast, toggleToast, createArray, handleSort } = useSorting();

  return (
    <AnimatePresence mode="wait">
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
          className="fixed left-0 right-0 mx-auto lg:left-1/2 lg:-translate-x-1/2
            bg-gray-900/50 backdrop-blur-md border border-green-500/20
            rounded-xl p-4 mx-4 w-[calc(100%-32px)] max-w-[360px] z-50
            shadow-[0_0_15px_rgba(34,197,94,0.1)]"
        >
          <button
            onClick={() => {
              toggleToast();
            }}
            className="absolute right-3 top-3 text-gray-400 hover:text-white 
              transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <p className="text-sm text-gray-200 max-w-[40ch] mb-4 pr-4">
            Continue with the already sorted array ?
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                createArray();
                toggleToast();
              }}
              className="px-4 py-1.5 text-sm bg-green-500/20 text-green-500 
                rounded-lg hover:bg-green-500/30 transition-colors duration-200"
            >
              Shuffle
            </button>
            <button
              onClick={() => {
                toggleToast();
                handleSort();
              }}
              className="px-4 py-1.5 text-sm bg-gray-700/50 text-gray-200 
                rounded-lg hover:bg-gray-700/70 transition-colors duration-200"
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