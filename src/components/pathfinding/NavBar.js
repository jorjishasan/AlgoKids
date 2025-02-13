"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathfinding } from '@/context/PathfindingContext';
import CubeLogo from '@/components/icons/CubeLogo';
import PlayIcon from '@/components/icons/PlayIcon';
import CaretIcon from '@/components/icons/CaretIcon';

const AlgorithmSelector = ({ method, setMethod, isRunning }) => (
  <select 
    className={`bg-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors
      ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
    value={method}
    onChange={(e) => setMethod(e.target.value)}
    disabled={isRunning}
  >
    <option value="Dijkstra's Algorithm">🎯 Dijkstra</option>
    <option value="A* Search">⭐ A* Search</option>
    <option value="Breadth First Search">🌊 BFS</option>
    <option value="Depth First Search">🌲 DFS</option>
  </select>
);

const Controls = ({ makeGrid, isRunning }) => (
  <motion.button 
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium 
      ${isRunning 
        ? 'bg-gray-600 cursor-not-allowed opacity-50' 
        : 'bg-white/10 hover:bg-white/20'
      }`}
    onClick={makeGrid}
    disabled={isRunning}
    whileHover={{ scale: isRunning ? 1 : 1.05 }}
    whileTap={{ scale: isRunning ? 1 : 0.95 }}
  >
    <span>Clear Board</span>
  </motion.button>
);

const HamburgerMenu = ({ isOpen, setIsOpen, isRunning }) => (
  <button
    className="md:hidden relative z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
    onClick={() => !isRunning && setIsOpen(!isOpen)}
    disabled={isRunning}
  >
    <div className="w-5 h-4 flex flex-col justify-between">
      <span className={`block h-0.5 w-full bg-white transform transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
      <span className={`block h-0.5 w-full bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
      <span className={`block h-0.5 w-full bg-white transform transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
    </div>
  </button>
);

const MobileMenu = ({ isOpen, setIsOpen, isRunning }) => {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const { 
    state,
    makeGrid,
    visualizePathfinding,
    setMethod
  } = usePathfinding();

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    setShowAlgorithms(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 bg-gradient-to-b from-blue-400/95 to-purple-400/95 
            backdrop-blur-sm shadow-lg md:hidden border-t border-white/10 z-50 overflow-y-auto max-h-[calc(100vh-4rem)]"
        >
          <div className="p-6 space-y-6">
            {/* Algorithm Selector */}
            <div className="space-y-3">
              <motion.button
                onClick={() => !isRunning && setShowAlgorithms(!showAlgorithms)}
                className={`w-full flex justify-between items-center bg-white/10 hover:bg-white/20 
                  text-white font-bold px-4 py-3 rounded-xl transition-colors
                  ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isRunning ? 1 : 1.02 }}
                whileTap={{ scale: isRunning ? 1 : 0.98 }}
                disabled={isRunning}
              >
                <span>
                  {pathfindingAlgorithms.find(algo => algo.name === state.method)?.icon} {state.method}
                </span>
                <CaretIcon isOpen={showAlgorithms} />
              </motion.button>
              
              <AnimatePresence>
                {showAlgorithms && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/10 rounded-xl divide-y divide-white/10">
                      {pathfindingAlgorithms.map((algo) => (
                        <motion.button
                          key={algo.name}
                          className={`block w-full text-left px-4 py-3 text-white font-semibold 
                            hover:bg-white/10 transition-colors ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => handleMethodChange(algo.name)}
                          whileHover={{ x: isRunning ? 0 : 10 }}
                          disabled={isRunning}
                        >
                          {algo.icon} {algo.name}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Instructions */}
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="text-white font-bold mb-2">How to Use:</h3>
              <ul className="text-white/80 space-y-2 text-sm">
                <li>• Click and drag to draw walls</li>
                <li>• Drag start point (🟢) to reposition</li>
                <li>• Drag end point (🔴) to reposition</li>
                <li>• Click Find to visualize the path</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button 
                className={`flex items-center justify-center gap-2 bg-yellow-400/90 hover:bg-yellow-400 
                  text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-yellow-400/20
                  transition-colors duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  makeGrid();
                  setIsOpen(false);
                }}
                disabled={isRunning}
                whileHover={{ scale: isRunning ? 1 : 1.05 }}
                whileTap={{ scale: isRunning ? 1 : 0.95 }}
              >
                Clear Board
              </motion.button>
              <motion.button 
                className={`flex items-center justify-center gap-2 bg-green-400/90 hover:bg-green-400 
                  text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-400/20
                  transition-colors duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  visualizePathfinding();
                  setIsOpen(false);
                }}
                disabled={isRunning}
                whileHover={{ scale: isRunning ? 1 : 1.05 }}
                whileTap={{ scale: isRunning ? 1 : 0.95 }}
              >
                Find Path
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const pathfindingAlgorithms = [
  { name: "Dijkstra's Algorithm", icon: "🎯" },
  { name: "A* Search", icon: "⭐" },
  { name: "Breadth First Search", icon: "🌊" },
  { name: "Depth First Search", icon: "🌲" }
];

const NavBar = ({ isHamburgerOpen, setIsHamburgerOpen }) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { 
    state,
    makeGrid,
    visualizePathfinding,
    setMethod
  } = usePathfinding();

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link 
              href="/" 
              className="flex items-center gap-2 focus:outline-none"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <CubeLogo isHovered={isLogoHovered} />
              <motion.h1 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                PathFinder
              </motion.h1>
            </Link>
            
            <div className="hidden md:flex items-center gap-3">
              <AlgorithmSelector 
                method={state.method} 
                setMethod={setMethod}
                isRunning={state.isRunning} 
              />

              <Controls 
                makeGrid={makeGrid}
                isRunning={state.isRunning}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button 
              className={`hidden md:flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium 
                ${state.isRunning 
                  ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                  : 'bg-green-400 hover:bg-green-500'
                }`}
              onClick={visualizePathfinding}
              disabled={state.isRunning}
              whileHover={{ scale: state.isRunning ? 1 : 1.05 }}
              whileTap={{ scale: state.isRunning ? 1 : 0.95 }}
            >
              <PlayIcon className="w-5 h-5" />
              <span className="font-semibold">Find</span>
            </motion.button>

            <HamburgerMenu 
              isOpen={isHamburgerOpen} 
              setIsOpen={setIsHamburgerOpen}
              isRunning={state.isRunning}
            />
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isHamburgerOpen}
        setIsOpen={setIsHamburgerOpen}
        isRunning={state.isRunning}
      />
    </nav>
  );
};

export default NavBar; 