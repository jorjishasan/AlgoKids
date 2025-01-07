'use client';
import { useState } from 'react';
import CaretDown from '@/components/icons/CaretDown';

const AlgorithmSelector = ({ method, setMethod, isRunning }) => {
    const [showPopover, setShowPopover] = useState(false);

  return (
    <div   
    onMouseEnter={() => setShowPopover(true)}
    onMouseLeave={() => setShowPopover(false)}
    className="relative">
      <button

        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
        {method}
        <CaretDown  />
      </button>
      {showPopover && (
        <div onClick={() => setShowPopover(false)} className="absolute w-48 bg-gray-700 rounded-md ">
        {["Bubble Sort", "Selection Sort", "Merge Sort", "Quick Sort"].map(algo => (
          <button
            key={algo}
            className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
            onClick={() => setMethod(algo)}
            disabled={isRunning}
          >
            {algo}
          </button>
        ))}
      </div>
      )}
    </div>
  );
};

export default AlgorithmSelector; 