// src/components/sorting/SortingVisualizer.js
"use client"
import { motion } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';

const springAnim = {
  type: "spring",
  damping: 20,
  stiffness: 300
};

const SortingVisualizer = () => {
  const { array, comparing, swapping, sorted } = useSorting();

  return (
    <div className="p-4">
      <div className="flex items-start justify-center h-[70vh] gap-1">
        {array.map((element, index) => (
          <motion.div
            key={element.id}
            layout
            transition={springAnim}
            className={`
              w-10 flex items-end justify-center text-xs text-white
              transition-all duration-200 ease-in-out
              ${comparing.includes(index)
                ? 'bg-yellow-400 scale-105'
                : swapping.includes(index)
                  ? 'bg-red-500 scale-110'
                  : sorted.includes(index)
                    ? 'bg-green-500'
                    : 'bg-blue-500'
              }
            `}
            style={{
              height: `${element.value * 3}px`,
              order: index
            }}
          >
            {element.value}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;