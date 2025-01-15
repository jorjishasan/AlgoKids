"use client"
import { useState, useEffect, useCallback } from 'react'
import "../../styles/pathfinding.css"
import Node from "./Node"
import { usePathfinding } from '../../context/PathfindingContext'

const Pathfinding = () => {
  const { 
    state,
    makeGrid,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseLeave,
    visualizePathfinding,
    setMethod
  } = usePathfinding();

  useEffect(() => {
    makeGrid();
    window.addEventListener("resize", makeGrid);
    return () => window.removeEventListener("resize", makeGrid);
  }, [makeGrid]);

  return (
    <div className="min-h-screen bg-[#1A1B1E]">
      <nav className="bg-[#25262B] shadow-lg p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">Pathfinding Visualizer</h1>
          <div className="flex items-center space-x-4">
            <select 
              className="bg-[#2C2E33] text-white px-4 py-2 rounded hover:bg-[#373A40] transition-colors"
              value={state.method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="Algorithms">Select Algorithm</option>
              <option value="Dijkstra's Algorithm">Dijkstra's Algorithm</option>
              <option value="A* Search">A* Search</option>
            </select>
            <button 
              onClick={() => makeGrid()}
              className="bg-[#2C2E33] text-white px-4 py-2 rounded hover:bg-[#373A40] transition-colors"
            >
              Clear Board
            </button>
            <button 
              onClick={visualizePathfinding}
              className="bg-[#1971C2] text-white px-6 py-2 rounded hover:bg-[#1864AB] transition-colors"
            >
              Visualize!
            </button>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center mt-8">
        <div className="stats flex space-x-8">
          <div className="stat bg-[#25262B] p-4 rounded">
            <div className="text-[#909296]">Visited Nodes</div>
            <div className="text-white text-2xl">{state.visited}</div>
          </div>
          <div className="stat bg-[#25262B] p-4 rounded">
            <div className="text-[#909296]">Path Length</div>
            <div className="text-white text-2xl">{state.shortestPath}</div>
          </div>
        </div>
      </div>

      <div className="grid-container mt-8">
        <table className="border-collapse">
          <tbody>
            {state.grid.map((row, index) => (
              <tr key={index}>
                {row.map((element, i) => (
                  <Node
                    key={i}
                    value={element}
                    isWall={element.isWall}
                    isStart={element.isStart}
                    isEnd={element.isEnd}
                    isVisited={element.isVisited}
                    isShortestPath={element.isShortestPath}
                    row={index}
                    col={i}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Pathfinding