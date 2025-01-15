"use client";
import React, { useEffect, useState } from 'react';

const Toast = ({ visited, shortestPath, isVisible, onClose }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        onClose();
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isShowing) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="bg-[#25262B] rounded-lg shadow-lg p-6 min-w-[300px]">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-white text-lg font-semibold">Path Statistics</h3>
          <button 
            onClick={() => {
              setIsShowing(false);
              onClose();
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#909296]">Visited Nodes</span>
            <span className="text-white text-xl font-semibold">{visited}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#909296]">Path Length</span>
            <span className="text-white text-xl font-semibold">{shortestPath}</span>
          </div>
        </div>
        <div className="mt-4 w-full bg-[#2C2E33] rounded-full h-1">
          <div 
            className="bg-blue-500 h-1 rounded-full transition-all duration-500"
            style={{ width: `${(shortestPath / visited) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast; 