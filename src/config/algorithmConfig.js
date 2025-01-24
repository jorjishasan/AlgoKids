'use client';

import React, { useEffect, useState } from 'react';

export const sortingAlgorithmConfig = {
  algorithms: [
    {
      name: "Bubble Sort",
      icon: "🫧",
      complexity: {
        time: {
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)"
        },
        space: "O(1)",
        stable: true,
        description: "Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
      }
    },
    {
      name: "Selection Sort",
      icon: "🎯",
      complexity: {
        time: {
          best: "O(n²)",
          average: "O(n²)",
          worst: "O(n²)"
        },
        space: "O(1)",
        stable: false,
        description: "Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region."
      }
    },
    {
      name: "Insertion Sort",
      icon: "📥",
      complexity: {
        time: {
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)"
        },
        space: "O(1)",
        stable: true,
        description: "Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array."
      }
    },
    {
      name: "Merge Sort",
      icon: "🤝",
      complexity: {
        time: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)"
        },
        space: "O(n)",
        stable: true,
        description: "Divide and conquer algorithm that recursively breaks down a problem into smaller, more manageable subproblems until they become simple enough to solve directly."
      }
    },
    {
      name: "Quick Sort",
      icon: "⚡",
      complexity: {
        time: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n²)"
        },
        space: "O(log n)",
        stable: false,
        description: "Efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements by selecting a 'pivot' element and partitioning the array around it."
      }
    },
    {
      name: "Heap Sort",
      icon: "🏔️",
      complexity: {
        time: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)"
        },
        space: "O(1)",
        stable: false,
        description: "Comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and repeatedly extract the maximum element."
      }
    },
    {
      name: "Shell Sort",
      icon: "🐚",
      complexity: {
        time: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n²)"
        },
        space: "O(1)",
        stable: false,
        description: "Optimization of insertion sort that allows the exchange of items that are far apart, progressively reducing the gap between elements to be compared."
      }
    },
    {
      name: "Cocktail Sort",
      icon: "🍸",
      complexity: {
        time: {
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)"
        },
        space: "O(1)",
        stable: true,
        description: "Variation of bubble sort that sorts in both directions on each pass through the list, like shaking a cocktail shaker."
      }
    }
  ],
  array: {
    minSize: 5,
    maxSize: 100,
    defaultSize: 36,
    bar: {
      minWidth: {
        mobile: 24,  // Minimum width to fit numbers on mobile
        desktop: 32  // Minimum width to fit numbers on desktop
      },
      gap: {
        mobile: 4,   // Gap between bars on mobile
        desktop: 8   // Gap between bars on desktop
      },
      maxHeight: {
        mobile: 200, // Maximum bar height on mobile
        desktop: 400 // Maximum bar height on desktop
      }
    }
  },
  speed: {
    min: 100,
    max: 2000,
    default: 50,
    step: 100
  }
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