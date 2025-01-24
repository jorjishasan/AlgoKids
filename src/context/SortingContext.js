"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import bubbleSort from '@/lib/algorithms/sorting/bubbleSort';
import selectionSort from '@/lib/algorithms/sorting/selectionSort';
import insertionSort from '@/lib/algorithms/sorting/insertionSort';
import mergeSort from '@/lib/algorithms/sorting/mergeSort';
import quickSort from '@/lib/algorithms/sorting/quickSort';
import heapSort from '@/lib/algorithms/sorting/heapSort';
import shellSort from '@/lib/algorithms/sorting/shellSort';
import cocktailSort from '@/lib/algorithms/sorting/cocktailSort';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';

const SortingContext = createContext();

export const useSorting = () => useContext(SortingContext);

export const SortingProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({
    array: [],
    method: 'Bubble Sort',
    arrayLength: sortingAlgorithmConfig.array.defaultSize,
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

  // Calculate max bars based on container width
  const calculateMaxBars = () => {
    const isMobile = window.innerWidth <= 768;
    const containerWidth = isMobile ? window.innerWidth - 32 : window.innerWidth * 0.8; // Account for padding
    const minBarWidth = 8; // Minimum width of each bar in pixels
    const gap = 4; // Gap between bars in pixels
    const maxPossibleBars = Math.floor(containerWidth / (minBarWidth + gap));
    
    return Math.min(maxPossibleBars, sortingAlgorithmConfig.array.maxSize);
  };

  // Create array with size constraints
  const createArray = (length = state.arrayLength) => {
    const isMobile = window.innerWidth <= 768;
    const maxBars = calculateMaxBars();
    const minSize = sortingAlgorithmConfig.array.minSize;
    
    // Use appropriate size based on device and constraints
    const validLength = Math.max(
      minSize,
      Math.min(
        length,
        maxBars,
        isMobile ? sortingAlgorithmConfig.array.minSize : sortingAlgorithmConfig.array.defaultSize
      )
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

  // Initialize array based on device
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      const initialSize = isMobile 
        ? sortingAlgorithmConfig.array.minSize 
        : sortingAlgorithmConfig.array.defaultSize;
      createArray(initialSize);
    };

    setMounted(true);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render anything until mounted (client-side)
  if (!mounted) return null;

  return (
    <SortingContext.Provider
      value={{
        ...state,
        createArray,
        handleSort,
        setMethod,
        setSpeed,
        isArraySorted: checkIfSorted
      }}
    >
      {children}
    </SortingContext.Provider>
  );
};

export default SortingContext; 