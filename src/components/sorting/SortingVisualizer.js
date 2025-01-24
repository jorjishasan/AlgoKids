// src/components/sorting/SortingVisualizer.js
"use client"
import { motion } from 'framer-motion';
import { useSorting } from '@/context/SortingContext';
import Stats from './Stats';
import { useState, useEffect } from 'react';

const springAnim = {
  type: "spring",
  damping: 12,
  stiffness: 200
};

const SortingVisualizer = () => {
  const { array, comparing, swapping, sorted, stats, isRunning, isSorted } = useSorting();
  const [showStats, setShowStats] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isRunning && sorted.length === array?.length && stats.moves > 0) {
      setShowStats(true);
    }
  }, [isRunning, sorted.length, array?.length, stats.moves]);

  // Calculate bar dimensions
  const calculateBarDimensions = () => {
    const maxHeight = isMobile ? 70 : 85; // Smaller height on mobile
    const maxValue = Math.max(...array.map(e => e.value));
    const containerPadding = isMobile ? 16 : 32; // Less padding on mobile
    const gap = isMobile ? 2 : 4; // Smaller gap on mobile
    const totalGaps = array.length - 1;
    const availableWidth = `calc(100% - ${containerPadding * 2}px)`;
    const barWidth = `calc((${availableWidth} - ${totalGaps * gap}px) / ${array.length})`;

    return { maxHeight, maxValue, barWidth };
  };

  const { maxHeight, maxValue, barWidth } = calculateBarDimensions();

  const getBarColor = (index, comparing, swapping, sorted) => {
    if (swapping.includes(index)) return 'bg-red-400'; // Bright yellow for swapping
    if (comparing.includes(index)) return 'bg-amber-500'; // Playful yellow for comparing
    if (sorted.includes(index)) return 'bg-green-400'; // Happy green for sorted
    return 'bg-white/60'; // Cool white for unsorted
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-gradient-to-b from-blue-400 to-purple-400 p-4">
      {/* Legend */}
      <div className="flex justify-center gap-x-4 gap-y-2 mb-4 lg:mb-8 lg:my-4 flex-wrap">
        {[
          { color: "bg-white", text: "Unsorted" },
          { color: "bg-amber-500", text: "Comparing" },
          { color: "bg-red-400", text: "Swapping" },
          { color: "bg-green-400", text: "Sorted" }
        ].map(({ color, text }) => (
          <motion.div
            key={text}
            className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-4 h-4 rounded-sm ${color}`} />
            <span className="text-white font-bold text-sm">{text}</span>
          </motion.div>
        ))}
      </div>

      {/* Bars Container */}
      <div className="flex-1 flex items-start lg:items-end justify-center gap-[2px] lg:gap-1 p-4 pb-8 bg-white/10 rounded-2xl overflow-hidden">
        {array.map((element, index) => {
          const heightPercentage = (element.value / maxValue) * maxHeight;
          
          let barColor = getBarColor(index, comparing, swapping, sorted);
          
          return (
            <motion.div
              key={element.id}
              layout
              transition={springAnim}
              className={`relative rounded-b-lg lg:rounded-t-lg ${barColor}`}
              style={{
                height: `${heightPercentage}%`,
                width: barWidth,
                minWidth: isMobile ? '4px' : '8px',
                maxWidth: isMobile ? '40px' : '80px'
              }}
            >
              {!isMobile && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
                  {element.value}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <Stats 
        isOpen={showStats} 
        stats={stats} 
        onClose={() => setShowStats(false)} 
      />
    </div>
  );
};

export default SortingVisualizer;