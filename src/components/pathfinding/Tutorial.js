"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the QuestionIcon to ensure it's loaded properly
const QuestionIcon = dynamic(() => import('@/components/icons/QuestionIcon'), {
  ssr: false,
  loading: () => (
    <div className="w-6 h-6 animate-pulse bg-white/20 rounded-full"></div>
  ),
});

const Tutorial = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tutorial Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-purple-500 hover:bg-purple-600 
          text-white rounded-full shadow-lg z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <QuestionIcon className="w-6 h-6" />
      </motion.button>

      {/* Tutorial Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 
                rounded-t-2xl shadow-xl z-50 p-6 pb-8 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col items-center">
                {/* Handle bar for visual feedback */}
                <div className="w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mb-6" />
                
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  How to Use PathFinder
                </h2>

                <div className="w-full max-w-md space-y-6">
                  {/* Interactive Grid */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">
                      Grid Interaction
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🖱️</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Click and drag to draw walls
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🟢</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Drag start point to reposition
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🔴</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Drag end point to reposition
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Algorithms */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                      Available Algorithms
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🎯</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Dijkstra's - Guarantees shortest path
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">⭐</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          A* Search - Fast pathfinding
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🌊</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          BFS - Breadth-first search
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🌲</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          DFS - Depth-first search
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Tips */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                      Pro Tips
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">💡</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Clear the board to start fresh
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🎮</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Try different algorithms to see how they work
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-2xl">🎨</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Create mazes with walls for fun challenges
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tutorial; 