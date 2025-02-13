"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useDevice } from '@/context/DeviceContext';

// Dynamically import the QuestionIcon to ensure it's loaded properly
const QuestionIcon = dynamic(() => import('@/components/icons/QuestionIcon'), {
  ssr: false,
  loading: () => (
    <div className="w-6 h-6 animate-pulse bg-white/20 rounded-full"></div>
  ),
});

const Tutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDevice();

  return (
    <>
      {/* Tutorial Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md
          text-white rounded-full shadow-lg z-50 cursor-pointer border border-white/30"
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md
                border-t border-white/20 rounded-t-3xl shadow-2xl z-50 p-6 pb-8 
                max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col items-center">
                {/* Handle bar */}
                <div className="w-16 h-1.5 bg-white/30 rounded-full mb-6" />
                
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Let's Learn Pathfinding! 🎮
                </h2>

                <div className={`w-full max-w-7xl ${!isMobile ? 'grid grid-cols-3 gap-6' : 'space-y-6'}`}>
                  {/* How to Play - Always visible */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      How to Play
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4 text-white/90">
                        <span className="text-2xl">🖱️</span>
                        <span>Click and drag on empty squares to create walls</span>
                      </li>
                      <li className="flex items-center gap-4 text-white/90">
                        <span className="text-2xl">🤷‍♀️</span>
                        <span>Drag the angry lady to change where to begin</span>
                      </li>
                      <li className="flex items-center gap-4 text-white/90">
                        <span className="text-2xl">🤦‍♂️</span>
                        <span>Drag the handsome male avatar to set your destination</span>
                      </li>
                    </ul>
                  </div>

                  {/* Desktop Only Content */}
                  {!isMobile && (
                    <>
                      {/* Algorithms */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <span className="text-2xl">🧠</span>
                          Choose Your Algorithm
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-4 text-white/90">
                            <span className="text-2xl">🎯</span>
                            <div>
                              <p className="font-semibold">Dijkstra's Algorithm</p>
                              <p className="text-sm text-white/70">Always finds the shortest path!</p>
                            </div>
                          </li>
                          <li className="flex items-center gap-4 text-white/90">
                            <span className="text-2xl">⭐</span>
                            <div>
                              <p className="font-semibold">A* Search</p>
                              <p className="text-sm text-white/70">Smart and fast pathfinding</p>
                            </div>
                          </li>
                          <li className="flex items-center gap-4 text-white/90">
                            <span className="text-2xl">🌊</span>
                            <div>
                              <p className="font-semibold">Breadth First Search</p>
                              <p className="text-sm text-white/70">Explores like a ripple in water</p>
                            </div>
                          </li>
                          <li className="flex items-center gap-4 text-white/90">
                            <span className="text-2xl">🌲</span>
                            <div>
                              <p className="font-semibold">Depth First Search</p>
                              <p className="text-sm text-white/70">Explores one path at a time</p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* Fun Facts */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <span className="text-2xl">✨</span>
                          Fun Facts
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-4 text-white/90">
                            <span className="text-2xl">🎮</span>
                            <span>These algorithms are used in real video games!</span>
                          </li>
                          <li className="flex items-center gap-4 text-white/90">
                            <span className="text-2xl">🗺️</span>
                            <span>GPS navigation uses similar algorithms</span>
                          </li>
                          <li className="flex items-center gap-4 text-white/90">
                            <span className="text-2xl">🤖</span>
                            <span>Robots use these to find their way around</span>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
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