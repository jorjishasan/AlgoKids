"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import Button from '@/components/common/Button';

const AlgorithmSelector = ({ method, setMethod, isRunning }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when sorting starts
  useEffect(() => {
    if (isRunning) {
      setIsOpen(false);
    }
  }, [isRunning]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="dropdown"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isRunning}
        showCaret
        isCaretOpen={isOpen}
        className="rounded-full"
      >
        <span>
          {sortingAlgorithmConfig.algorithms.find(algo => algo.name === method)?.icon} {method}
        </span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-br from-blue-400/95 to-purple-400/95 
              backdrop-blur-md rounded-2xl overflow-hidden z-50 shadow-xl border-2 border-white/20"
          >
            {sortingAlgorithmConfig.algorithms.map((algo, index) => (
              <motion.div
                key={algo.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <motion.button
                  className="flex items-center w-full px-5 py-4 text-white font-bold hover:bg-white/10 
                    transition-colors relative overflow-hidden"
                  onClick={() => {
                    setMethod(algo.name);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 10 }}
                >
                  <span className="relative z-10 text-lg">
                    {algo.icon} {algo.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlgorithmSelector; 