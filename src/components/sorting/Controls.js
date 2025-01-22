"use client"
import CaretDown from '@/components/icons/CaretDown';
import { sortingAlgorithmConfig } from '@/config/algorithmConfig';

const Controls = ({ createArray, setSpeed, isRunning }) => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
        Controls
        <CaretDown  />
      </button>
      <div className="absolute hidden group-hover:block w-64 bg-gray-700 rounded-md shadow-lg p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Array Size</label>
            <input
              type="range"
              min={sortingAlgorithmConfig.array.minSize}
              max={sortingAlgorithmConfig.array.maxSize}
              defaultValue={sortingAlgorithmConfig.array.defaultSize}
              onChange={(e) => createArray(Number(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Speed</label>
            <input
              type="range"
              min={sortingAlgorithmConfig.speed.min}
              max={sortingAlgorithmConfig.speed.max}
              step={sortingAlgorithmConfig.speed.step}
              defaultValue={sortingAlgorithmConfig.speed.default}
              onChange={(e) => setSpeed(sortingAlgorithmConfig.speed.max + sortingAlgorithmConfig.speed.min - Number(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls; 