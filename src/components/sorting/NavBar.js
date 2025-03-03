"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useSorting } from '@/context/SortingContext';
import AlgorithmSelector from './AlgorithmSelector';
import Controls from './Controls';
import HamburgerMenu from './HamburgerMenu';
import MobileMenu from './MobileMenu';
import PlayIcon from '@/components/icons/PlayIcon';
import CubeLogo from '@/components/icons/CubeLogo';
import Button from '@/components/common/Button';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { 
    method, 
    setMethod,
    setSpeed,
    createArray, 
    arrayLength, 
    isRunning, 
    handleSort, 
    isArraySorted 
  } = useSorting();

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 focus:outline-none transform hover:scale-105 transition-transform"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <CubeLogo isHovered={isLogoHovered} />
              <motion.h1 
                className="text-3xl font-bold text-white drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Sorting
              </motion.h1>
            </Link>
            
            <div className="hidden md:flex items-center gap-3">
              <AlgorithmSelector 
                method={method} 
                setMethod={setMethod}
                isRunning={isRunning} 
              />

              <Controls 
                createArray={createArray}
                setSpeed={setSpeed}
                isRunning={isRunning}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => createArray(arrayLength)}
              disabled={isRunning}
              isHidden
            >
              <span className="font-bold text-lg">🎲 Shuffle</span>
            </Button>

            <Button
              variant="primary"
              onClick={handleSort}
              disabled={isRunning || isArraySorted()}
              icon={<PlayIcon className="w-6 h-6" />}
              isHidden
            >
              <span className="font-bold text-lg">Play!</span>
            </Button>

            <HamburgerMenu 
              isOpen={isHamburgerOpen} 
              setIsOpen={setIsHamburgerOpen}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
      
      <MobileMenu 
        isOpen={isHamburgerOpen} 
        setIsOpen={setIsHamburgerOpen}
        isRunning={isRunning}
      />
    </nav>
  );
};

export default NavBar; 