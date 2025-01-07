"use client"

const Controls = ({ createArray, setSpeed, isRunning }) => {
  return (
    <div className="relative group">
      <button className="text-gray-300 hover:text-white transition-colors">
        Controls
      </button>
      <div className="absolute hidden group-hover:block w-64 bg-gray-700 rounded-md shadow-lg p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Array Size</label>
            <input
              type="range"
              min="2"
              max={Math.floor(window.screen.width/50)}
              defaultValue={Math.floor((window.screen.width/50)/2)}
              onChange={(e) => createArray(Number(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Speed</label>
            <input
              type="range"
              min="100"
              max="1000"
              defaultValue="500"
              onChange={(e) => setSpeed(1100 - Number(e.target.value))}
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