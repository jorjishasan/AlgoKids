"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';
import ComplexityInfo from './ComplexityInfo';

const ComplexityDrawer = () => {
  const { showComplexity, toggleComplexity, method, isRunning } = useSorting();

  return (
    <>
      <button
        onClick={toggleComplexity}
        disabled={isRunning}
        className="fixed bottom-4 right-4 p-3 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ℹ️
        </motion.div>
      </button>

      <AnimatePresence>
        {showComplexity && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-96 bg-gray-800 shadow-xl"
          >
            <button
              onClick={toggleComplexity}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="p-6 overflow-y-auto h-full">
              <ComplexityInfo algorithm={method} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComplexityDrawer; 