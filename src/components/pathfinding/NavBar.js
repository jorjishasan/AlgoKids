"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathfinding } from '@/context/PathfindingContext';
import { pathfindingAlgorithmConfig } from '@/config/algorithmConfig';
import CubeLogo from '@/components/icons/CubeLogo';
import PlayIcon from '@/components/icons/PlayIcon';
import Button from '@/components/common/Button';
import HamburgerMenu from '@/components/icons/HamburgerMenu';
import MobileMenu from './MobileMenu';

const AlgorithmSelector = ({ method, setMethod, isRunning }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <Button
        variant="dropdown"
        onClick={() => !isRunning && setIsOpen(!isOpen)}
        disabled={isRunning}
        showCaret
        isCaretOpen={isOpen}
        className="min-w-[200px]"
      >
        <span className="text-xl">
          {pathfindingAlgorithmConfig.algorithms.find(algo => algo.name === method)?.icon}
        </span>
        <span className="flex-1 text-left">{method}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/35 backdrop-blur-md 
              rounded-xl overflow-hidden border border-white/20 shadow-xl z-50"
          >
            {pathfindingAlgorithmConfig.algorithms.map((algo) => (
              <motion.button
                key={algo.name}
                className="w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10
                  transition-colors border-b border-white/10 last:border-none"
                onClick={() => {
                  setMethod(algo.name);
                  setIsOpen(false);
                }}
                whileHover={{ x: 10 }}
              >
                <span className="text-xl">{algo.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{algo.name}</div>
                  <div className="text-xs text-white/70">{algo.description}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavBar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { 
    state,
    makeGrid,
    visualizePathfinding,
    setMethod
  } = usePathfinding();

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Link 
                href="/" 
                className="flex items-center gap-2 focus:outline-none group"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                <CubeLogo isHovered={isLogoHovered} />
                <motion.h1 
                  className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  PathFinder
                </motion.h1>
              </Link>
              
              <div className="hidden md:flex items-center gap-4">
                <AlgorithmSelector 
                  method={state.method} 
                  setMethod={setMethod}
                  isRunning={state.isRunning} 
                />

                <Button
                  variant="ghost"
                  onClick={makeGrid}
                  disabled={state.isRunning}
                >
                  Clear Board
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                onClick={visualizePathfinding}
                disabled={state.isRunning}
                icon={<PlayIcon className="w-5 h-5" />}
                isHidden
              >
                <span className="font-semibold">Find Path</span>
              </Button>

              <motion.button
                className="md:hidden relative z-50 flex h-12 w-12 items-center justify-center rounded-full 
                  bg-gradient-to-r from-blue-400/20 to-purple-400/20 hover:from-blue-400/30 
                  hover:to-purple-400/30 transition-all duration-300"
                onClick={() => !state.isRunning && setIsHamburgerOpen(!isHamburgerOpen)}
                disabled={state.isRunning}
                whileHover={!state.isRunning ? { scale: 1.05 } : {}}
                whileTap={!state.isRunning ? { scale: 0.95 } : {}}
              >
                <HamburgerMenu isOpen={isHamburgerOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isHamburgerOpen}
        setIsOpen={setIsHamburgerOpen}
        isRunning={state.isRunning}
        method={state.method}
        setMethod={setMethod}
        makeGrid={makeGrid}
        visualizePathfinding={visualizePathfinding}
      />
    </>
  );
};

export default NavBar; 