"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathfinding } from '@/context/PathfindingContext';
import { useEffect, useState } from 'react';

const Stats = () => {
  const [showStats, setShowStats] = useState(false);
  const { state } = usePathfinding();

  useEffect(() => {
    if (state.currentPath?.length > 0) {
      // Wait for the path animation to complete
      // Assuming each step takes 0.1s (as per Node.js animation)
      const animationDelay = state.currentPath.length * 0.1 * 600;
      const timer = setTimeout(() => {
        setShowStats(true);
      }, animationDelay); 

      return () => clearTimeout(timer);
    } else {
      setShowStats(false);
    }
  }, [state.currentPath]);

  if (!showStats) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowStats(false)}
      >
        <motion.div 
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4 border border-white/20"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Path Found! 🎉</h2>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
              <span className="text-white/90">Shortest Path Length:</span>
              <span className="text-white font-bold text-lg">{state.currentPath?.length || 0} nodes</span>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
              <span className="text-white/90">Total Nodes Visited:</span>
              <span className="text-white font-bold text-lg">{state.visited} nodes</span>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/90 text-sm text-center">
                The algorithm explored {state.visited} nodes to find a path of {state.currentPath?.length || 0} nodes!
              </div>
            </div>
          </div>

          <button
            className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
            onClick={() => setShowStats(false)}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Stats; 