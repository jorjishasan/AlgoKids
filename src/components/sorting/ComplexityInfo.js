"use client"
import { useSorting } from '@/context/SortingContext';

const ComplexityInfo = ({ algorithm }) => {
  const algorithmInfo = {
    'Bubble Sort': {
      name: 'Bubble Sort',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)'
      },
      spaceComplexity: 'O(1)',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    'Quick Sort': {
      name: 'Quick Sort',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)'
      },
      spaceComplexity: 'O(log n)',
      description: 'A divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around it.'
    },
    'Merge Sort': {
      name: 'Merge Sort',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
      },
      spaceComplexity: 'O(n)',
      description: 'A divide-and-conquer algorithm that divides the array into two halves, sorts them, and then merges the sorted halves.'
    },
    'Selection Sort': {
      name: 'Selection Sort',
      timeComplexity: {
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)'
      },
      spaceComplexity: 'O(1)',
      description: 'A simple sorting algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element.'
    }
  };

  const info = algorithmInfo[algorithm];

  if (!info) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3 text-white">{info.name}</h2>
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">{info.description}</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold mb-2 text-white">Time Complexity</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-700/50 p-2 rounded-lg">
              <p className="text-xs text-gray-400">Best Case</p>
              <p className="text-sm font-mono text-white">{info.timeComplexity.best}</p>
            </div>
            <div className="bg-gray-700/50 p-2 rounded-lg">
              <p className="text-xs text-gray-400">Average Case</p>
              <p className="text-sm font-mono text-white">{info.timeComplexity.average}</p>
            </div>
            <div className="bg-gray-700/50 p-2 rounded-lg">
              <p className="text-xs text-gray-400">Worst Case</p>
              <p className="text-sm font-mono text-white">{info.timeComplexity.worst}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-semibold mb-2 text-white">Space Complexity</h3>
          <div className="bg-gray-700/50 p-2 rounded-lg">
            <p className="text-xs text-gray-400">Auxiliary Space</p>
            <p className="text-sm font-mono text-white">{info.spaceComplexity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityInfo; 