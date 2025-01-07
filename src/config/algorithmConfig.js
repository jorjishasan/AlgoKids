'use client';

import React, { useEffect, useState } from 'react';

export const sortingAlgorithmConfig = {
  speed: {
    min: 100,
    max: 1000,
    default: 500,
    step: 100
  },
  array: {
    minSize: 2,
    maxSize: 20,
    defaultSize: 10
  },
  algorithms: [
    "Quick Sort",
    "Bubble Sort",
    "Selection Sort",
    "Merge Sort"
  ]
};

export const useScreenSizeConfig = () => {
  const [sizes, setSizes] = useState({
    maxSize: sortingAlgorithmConfig.array.maxSize,
    defaultSize: sortingAlgorithmConfig.array.defaultSize
  });

  useEffect(() => {
    setSizes({
      maxSize: Math.floor(window.screen.width/50),
      defaultSize: Math.floor((window.screen.width/50)/2)
    });
  }, []);

  return sizes;
}; 