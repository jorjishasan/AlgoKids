"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevice } from '@/context/DeviceContext';
import NavBar from '@/components/sorting/NavBar';
import SortingVisualizer from '@/components/sorting/SortingVisualizer';
import InfoIcon from '@/components/icons/InfoIcon';
import InfoDrawer from '@/components/sorting/InfoDrawer';
import InfoDrawerMobile from '@/components/sorting/InfoDrawerMobile';
import { SortingProvider } from '@/context/SortingContext';

const SortingClient = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { isMobile } = useDevice();

  return (
    <SortingProvider>
      <div className="min-h-screen relative bg-gradient-to-b from-blue-400 to-purple-400">
        {/* Info Icon */}
        <motion.div 
          className="fixed bottom-6 lg:bottom-12 right-6 lg:right-8 z-50"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
        >
          <button
            onClick={() => setIsInfoOpen(true)}
            className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
              shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] 
              transition-all duration-300 group"
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
        {isMobile ? (
          <InfoDrawerMobile isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
        ) : (
          <InfoDrawer isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
        )}

        <NavBar />
        <SortingVisualizer />
      </div>
    </SortingProvider>
  );
};

export default SortingClient; 