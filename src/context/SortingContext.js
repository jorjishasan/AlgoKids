"use client"
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import bubbleSort from '@/lib/algorithms/sorting/bubbleSort';
import selectionSort from '@/lib/algorithms/sorting/selectionSort';
import insertionSort from '@/lib/algorithms/sorting/insertionSort';
import mergeSort from '@/lib/algorithms/sorting/mergeSort';
import quickSort from '@/lib/algorithms/sorting/quickSort';
import heapSort from '@/lib/algorithms/sorting/heapSort';
import shellSort from '@/lib/algorithms/sorting/shellSort';
import cocktailSort from '@/lib/algorithms/sorting/cocktailSort';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import { useDevice } from '@/context/DeviceContext';

const SortingContext = createContext();

export const useSorting = () => useContext(SortingContext);

export const SortingProvider = ({ children }) => {
  const { width, isMobile } = useDevice();
  const [state, setState] = useState({
    array: [],
    method: 'Bubble Sort',
    arrayLength: isMobile ? sortingAlgorithmConfig.array.minSize : sortingAlgorithmConfig.array.defaultSize,
    speed: sortingAlgorithmConfig.speed.default,
    isRunning: false,
    isSorting: false,
    comparing: [],
    swapping: [],
    sorted: [],
    stats: {
      comparisons: 0,
      swaps: 0,
      moves: 0
    }
  });

  // Calculate array visualization constraints based on device width
  const calculateArrayConstraints = useCallback(() => {
    if (!width) return {
      maxBars: sortingAlgorithmConfig.array.defaultSize,
      containerWidth: 0,
      minBarWidth: 32,
      gap: 8,
      barWidth: 32
    };

    const containerWidth = isMobile 
      ? width - 32  // Mobile padding
      : width * 0.8; // Desktop container width

    const minBarWidth = isMobile 
      ? sortingAlgorithmConfig.array.bar.minWidth.mobile 
      : sortingAlgorithmConfig.array.bar.minWidth.desktop;

    const gap = isMobile 
      ? sortingAlgorithmConfig.array.bar.gap.mobile 
      : sortingAlgorithmConfig.array.bar.gap.desktop;

    // Calculate maximum possible bars that can fit in the container
    const maxPossibleBars = Math.floor(containerWidth / (minBarWidth + gap));
    const maxBars = Math.min(maxPossibleBars, sortingAlgorithmConfig.array.maxSize);

    // Calculate initial array length
    const initialLength = isMobile 
      ? sortingAlgorithmConfig.array.minSize 
      : sortingAlgorithmConfig.array.defaultSize;

    // If it's initial render or array is empty, use initial length
    const currentLength = state.array.length || initialLength;
    
    // Calculate total gap width and available width for bars
    const totalGapWidth = (currentLength - 1) * gap;
    const availableWidth = containerWidth - totalGapWidth;
    
    // Calculate bar width - initially use full available width divided by number of bars
    const barWidth = state.array.length === 0
      ? availableWidth / initialLength
      : Math.max(minBarWidth, availableWidth / currentLength);

    return {
      maxBars,
      containerWidth,
      minBarWidth,
      gap,
      barWidth
    };
  }, [width, isMobile, state.array.length]);

  // Check if array is sorted without modifying state
  const checkIfSorted = () => {
    if (!state.array || state.array.length === 0) return false;
    for (let i = 0; i < state.array.length - 1; i++) {
      if (state.array[i].value > state.array[i + 1].value) return false;
    }
    return true;
  };

  // Create setter functions for each state property
  const setArray = (newArray) => {
    setState(prev => ({ ...prev, array: newArray }));
  };

  const setComparing = (indices) => {
    setState(prev => ({ ...prev, comparing: indices }));
  };

  const setSwapping = (indices) => {
    setState(prev => ({ ...prev, swapping: indices }));
  };

  const setSorted = (callback) => {
    setState(prev => ({ 
      ...prev, 
      sorted: typeof callback === 'function' ? callback(prev.sorted) : callback 
    }));
  };

  // Create array with size constraints
  const createArray = useCallback((length = state.arrayLength) => {
    const { maxBars } = calculateArrayConstraints();
    const minSize = sortingAlgorithmConfig.array.minSize;
    
    // Use appropriate size based on device and constraints
    const validLength = Math.max(
      minSize,
      Math.min(length, maxBars)
    );

    const newArray = Array.from({ length: validLength }, (_, i) => ({
      value: Math.floor(Math.random() * 100) + 1,
      id: i
    }));

    setState(prev => ({
      ...prev,
      array: newArray,
      arrayLength: validLength,
      comparing: [],
      swapping: [],
      sorted: [],
      isRunning: false,
      isSorting: false,
      stats: {
        comparisons: 0,
        swaps: 0,
        moves: 0
      }
    }));
  }, [calculateArrayConstraints]);

  const setMethod = (newMethod) => {
    setState(prev => ({
      ...prev,
      method: newMethod,
      comparing: [],
      swapping: [],
      sorted: [],
      isRunning: false,
      isSorting: false,
      stats: {
        comparisons: 0,
        swaps: 0,
        moves: 0
      }
    }));
    // Create new array when changing algorithm
    createArray(state.arrayLength);
  };

  const setSpeed = (newSpeed) => {
    setState(prev => ({ ...prev, speed: newSpeed }));
  };

  const handleSort = async () => {
    if (state.isRunning || checkIfSorted()) return;
    
    setState(prev => ({ 
      ...prev, 
      isRunning: true,
      isSorting: false,
      comparing: [],
      swapping: [],
      sorted: []
    }));

    let result;
    try {
      switch (state.method) {
        case "Bubble Sort":
          result = await bubbleSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        case "Selection Sort":
          result = await selectionSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        case "Insertion Sort":
          result = await insertionSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        case "Merge Sort":
          result = await mergeSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        case "Quick Sort":
          result = await quickSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        case "Heap Sort":
          result = await heapSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        case "Shell Sort":
          result = await shellSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        case "Cocktail Sort":
          result = await cocktailSort(state.array, setArray, setComparing, setSwapping, setSorted, state.speed);
          break;
        default:
          result = { moves: 0, swaps: 0 };
      }

      // Mark all elements as sorted when complete
      setSorted([...Array(state.array.length).keys()]);
    } catch (error) {
      console.error('Sorting error:', error);
    }

    setState(prev => ({
      ...prev,
      stats: result || { moves: 0, swaps: 0 },
      isRunning: false,
      isSorting: true,
      comparing: [],
      swapping: []
    }));
  };

  // Initialize array when device info changes
  useEffect(() => {
    if (width > 0) {
      createArray();
    }
  }, [width, isMobile, createArray]);

  return (
    <SortingContext.Provider
      value={{
        ...state,
        createArray,
        handleSort,
        setMethod,
        setSpeed,
        isArraySorted: checkIfSorted,
        arrayConstraints: calculateArrayConstraints()
      }}
    >
      {children}
    </SortingContext.Provider>
  );
};

export default SortingContext; 