"use client"
import { createContext, useContext, useState, useEffect } from 'react';
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
    method: "Quick Sort",
    arrayLength: 0,
    comparing: [],
    swapping: [],
    sorted: [],
    speed: 100,
    isRunning: false,
    showComplexity: false
  });

  const createArray = (size = Math.floor(window.innerWidth/50)/2) => {
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
      swapping: []
    }));
  };

  const handleSort = async (e) => {
    e.preventDefault();
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

  useEffect(() => {
    createArray();
    const handleResize = () => createArray();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = {
    ...state,
    createArray,
    handleSort,
    toggleComplexity,
    setState
  };

  return (
    <SortingContext.Provider value={value}>
      {children}
    </SortingContext.Provider>
  );
}; 