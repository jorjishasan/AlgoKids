"use client"
const Navbar = ({ isAnimating, points, onRandomize, onVisualize, onClear }) => {
  return (
    <nav className="bg-[#25262B] shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">Convex Hull Visualizer</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={onRandomize}
            disabled={isAnimating}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            Randomize
          </button>
          <button
            onClick={onVisualize}
            disabled={points.length < 3 || isAnimating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Visualize
          </button>
          <button
            onClick={onClear}
            disabled={isAnimating}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 