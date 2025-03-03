"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/sorting/NavBar';
import SortingVisualizer from '@/components/sorting/SortingVisualizer';
import InfoIcon from '@/components/icons/InfoIcon';
import InfoDrawer from '@/components/sorting/InfoDrawer';
import { SortingProvider } from '@/context/SortingContext';

const SortingClient = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <SortingProvider>
      <div className="min-h-screen relative bg-gradient-to-b from-blue-400 to-purple-400">
        {/* Info Icon */}
        <motion.div 
          className="fixed bottom-6 lg:bottom-12 right-6 lg:right-8 z-50"
        >
          <button
            onClick={() => setIsInfoOpen(true)}
          >
            <InfoIcon className=" text-white group-hover:text-white/90" />
          </button>
        </motion.div>

        {/* Overlay */}
        <AnimatePresence>
          {isInfoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        {/* Info Drawers */}
        <InfoDrawer isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

        <NavBar />
        <SortingVisualizer />
      </div>
    </SortingProvider>
  );
};

export default SortingClient; 