"use client"

const AlgorithmSelector = ({ method, setMethod, isRunning }) => {
  return (
    <div className="relative group">
      <button className="text-gray-300 hover:text-white transition-colors">
        {method}
      </button>
      <div className="absolute hidden group-hover:block w-48 bg-gray-700 rounded-md shadow-lg">
        {["Bubble Sort", "Selection Sort", "Merge Sort", "Quick Sort"].map(algo => (
          <button
            key={algo}
            className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
            onClick={() => setMethod(algo)}
            disabled={isRunning}
          >
            {algo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector; 