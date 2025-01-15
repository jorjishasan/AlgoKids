"use client"
import React from 'react';
import Node from './Node';

const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp, onMouseLeave }) => {
  return (
    <div className="grid-container mt-8">
      <table className="border-collapse">
        <tbody>
          {grid.map((row, index) => (
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
                  onMouseDown={onMouseDown}
                  onMouseEnter={onMouseEnter}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseLeave}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid; 