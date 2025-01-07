"use client"
import Link from 'next/link';
import { useSorting } from '@/context/SortingContext';
import AlgorithmSelector from './AlgorithmSelector';
import Controls from './Controls';

const Navigation = () => {
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
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">Sorting</h1>
            
            <div className="flex items-center gap-6">
              <Link 
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <button 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => createArray(arrayLength)}
                disabled={isRunning}
              >
                Randomize
              </button>

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

          <div className="ml-auto">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              onClick={handleSort}
              disabled={isRunning}
            >
              Sort
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 