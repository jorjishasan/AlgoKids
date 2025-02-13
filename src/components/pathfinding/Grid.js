"use client"
import React from 'react';
import Node from './Node';
import { usePathfinding } from '@/context/PathfindingContext';

const Grid = ({ 
  grid, 
  onMouseDown, 
  onMouseEnter, 
  onMouseUp, 
  onMouseLeave,
  shortestPathNodes 
}) => {
  const { state } = usePathfinding();
  const nodeSize = state.nodeSize || 35;

  // Create a map of node positions to their path indices
  const pathIndices = new Map();
  if (shortestPathNodes) {
    shortestPathNodes.forEach((node, index) => {
      pathIndices.set(`${node.row},${node.col}`, index);
    });
  }

  return (
    <div className="flex-1 flex justify-center items-center p-4 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center">
        <table 
          className="border-collapse bg-white/5 rounded-lg shadow-xl" 
          style={{ 
            borderSpacing: '0',
            padding: Math.max(nodeSize * 0.1, 8)
          }}
        >
          <tbody>
            {grid.map((row, index) => (
              <tr key={index} className="flex" style={{ height: `${nodeSize}px` }}>
                {row.map((element, i) => {
                  const pathIndex = pathIndices.get(`${index},${i}`);
                  return (
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
                      onMouseDown={onMouseDown}
                      onMouseEnter={onMouseEnter}
                      onMouseUp={onMouseUp}
                      onMouseLeave={onMouseLeave}
                      pathIndex={pathIndex}
                      totalPath={shortestPathNodes?.length}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid; 