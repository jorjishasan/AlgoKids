"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useSorting } from '@/context/SortingContext';
import AlgorithmSelector from './AlgorithmSelector';
import Controls from './Controls';
import HamburgerMenu from './HamburgerMenu';
import MobileMenu from './MobileMenu';

const Navigation = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { 
    method, 
    setState, 
    createArray, 
    arrayLength, 
    speed, 
    isRunning, 
    handleSort 
  } = useSorting();

  const setMethod = (newMethod) => {
    setState(prev => ({ ...prev, method: newMethod }));
  };

  const setSpeed = (newSpeed) => {
    setState(prev => ({ ...prev, speed: newSpeed }));
  };

  return (
    <nav className="relative bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">Sorting</h1>
            
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>

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

          <div className="ml-auto flex items-center gap-2">
            <button 
              className="hidden md:block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
              onClick={() => createArray(arrayLength)}
              disabled={isRunning}
            >
              Shuffle
            </button>
            <button 
              className="hidden md:block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              onClick={handleSort}
              disabled={isRunning}
            >
              Sort
            </button>
            <HamburgerMenu 
              isOpen={isHamburgerOpen} 
              setIsOpen={setIsHamburgerOpen} 
            />
          </div>
        </div>
      </div>
      
      <MobileMenu 
        isOpen={isHamburgerOpen} 
        setIsOpen={setIsHamburgerOpen} 
      />
    </nav>
  );
};

export default Navigation; 