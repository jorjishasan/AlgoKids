"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';
import { bubbleSort } from '@/lib/algorithms/sorting/bubbleSort';
import { quickSort } from '@/lib/algorithms/sorting/quickSort';
import { selectionSort } from '@/lib/algorithms/sorting/selectionSort';
import { mergeSort } from '@/lib/algorithms/sorting/mergeSort';

const SortingContext = createContext(null);

export const useSorting = () => {
  const context = useContext(SortingContext);
  if (!context) {
    throw new Error('useSorting must be used within a SortingProvider');
  }
  return context;
};

export const SortingProvider = ({ children }) => {
  const [state, setState] = useState({
    array: [],
    method: sortingAlgorithmConfig.algorithms[0],
    arrayLength: sortingAlgorithmConfig.array.defaultSize,
    comparing: [],
    swapping: [],
    sorted: [],
    speed: sortingAlgorithmConfig.speed.default,
    isRunning: false,
    showComplexity: false,
    showToast: false
  });

  const isArraySorted = (arr) => {
    if (!arr.length) return false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) return false;
    }
    return true;
  };

  const createArray = (size = sortingAlgorithmConfig.array.defaultSize) => {
    const newArray = Array.from({ length: size }, (_, i) => ({
      value: Math.floor(Math.random() * ((window.innerHeight/4)-30+1)) + 30,
      id: `id-${i}`,
    }));
    
    setState(prev => ({
      ...prev,
      array: newArray,
      arrayLength: size,
      sorted: [],
      comparing: [],
      swapping: [],
      showToast: false
    }));
  };

  const handleSort = async (e) => {
    if (e) e.preventDefault();
    
    if (isArraySorted(state.array) && !state.showToast) {
      setState(prev => ({ ...prev, showToast: true }));
      return;
    }
    
    let results = [];
    setState(prev => ({ ...prev, isRunning: true }));

    switch (state.method) {
      case "Bubble Sort":
        results = bubbleSort([...state.array], state.array.length);
        break;
      case "Selection Sort":
        results = selectionSort([...state.array], state.array.length);
        break;
      case "Merge Sort":
        results = mergeSort([...state.array], state.array.length);
        break;
      case "Quick Sort":
      default:
        results = quickSort([...state.array], state.array.length);
        break;
    }

    for (let i = 0; i < results.length; i++) {
      await new Promise(resolve => setTimeout(resolve, state.speed));
      setState(prev => ({
        ...prev,
        array: results[i].array,
        comparing: results[i].comparing,
        swapping: results[i].swapping,
        sorted: results[i].sorted
      }));
    }

    setState(prev => ({
      ...prev,
      isRunning: false,
      comparing: [],
      swapping: []
    }));
  };

  const toggleComplexity = () => {
    setState(prev => ({ ...prev, showComplexity: !prev.showComplexity }));
  };

  const toggleToast = () => {
    setState(prev => ({ ...prev, showToast: !prev.showToast }));
  };

  useEffect(() => {
    createArray(sortingAlgorithmConfig.array.defaultSize);
    const handleResize = () => createArray(sortingAlgorithmConfig.array.defaultSize);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = {
    ...state,
    createArray,
    handleSort,
    toggleComplexity,
    toggleToast,
    setState
  };

  return (
    <SortingContext.Provider value={value}>
      {children}
    </SortingContext.Provider>
  );
}; 