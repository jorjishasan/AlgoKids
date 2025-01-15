"use client"
import React from 'react';

const NavBar = ({ method, onMethodChange, onVisualize, onClear }) => {
  return (
    <nav className="bg-[#25262B] shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">Pathfinding Visualizer</h1>
        <div className="flex items-center space-x-4">
          <select 
            className="bg-[#2C2E33] text-white px-4 py-2 rounded hover:bg-[#373A40] transition-colors"
            value={method}
            onChange={(e) => onMethodChange(e.target.value)}>
            <option value="A* Search">A* Search</option>
            <option value="Dijkstra's Algorithm">Dijkstra's Algorithm</option>
          </select>
          <button
            onClick={onVisualize}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Visualize
          </button>
          <button
            onClick={onClear}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
            Clear Board
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 