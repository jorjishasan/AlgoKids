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
        className="fixed bottom-16 right-6 group"
      >
        <motion.div 
          className="absolute inset-0 bg-gray-400/20 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.15, 0.25]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gray-400/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        <div className="relative p-3 bg-gray-800/80 backdrop-blur-sm rounded-full 
          border border-gray-500/20 shadow-lg shadow-gray-500/10
          group-hover:border-gray-500/30 transition-all duration-300"
        >
          <svg
            className="w-6 h-6 lg:w-9 lg:h-9 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {showComplexity && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleComplexity}
              className="fixed inset-0  bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 
                max-h-[85vh] w-full sm:max-w-[600px] sm:mx-auto 
                bg-gray-800/95 backdrop-blur-sm
                shadow-xl shadow-black/5 rounded-t-xl z-50"
            >
              <div className="flex justify-center p-4">
                <div className="w-12 h-1.5 bg-gray-600/50 rounded-full" />
              </div>

              <button
                onClick={toggleComplexity}
                className="absolute top-4 right-4 p-2 text-gray-400 
                  hover:text-white transition-colors"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="px-6 lg:px-8 lg:pb-8 pb-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <ComplexityInfo algorithm={method} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComplexityDrawer; 