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
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
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
    <nav className="bg-gradient-to-r from-blue-400 to-purple-400 ">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3">
              <CubeLogo />
              <motion.h1 
                className="text-2xl font-bold text-white"
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
            <motion.button 
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium 
                ${isRunning 
                  ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                  : 'bg-yellow-400 hover:to-yellow-600'
                }`}
              onClick={() => createArray(arrayLength)}
              disabled={isRunning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold">Shuffle</span>
            </motion.button>

            <motion.button 
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium 
                ${isRunning || isArraySorted() 
                  ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                  : 'bg-green-400 '
                }`}
              onClick={handleSort}
              disabled={isRunning || isArraySorted()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon className="w-5 h-5" />
              <span className="font-bold">Sort</span>
            </motion.button>

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