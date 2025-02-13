"use client";
import Image from 'next/image';
import { usePathfinding } from '@/context/PathfindingContext';

const Node = ({
  isWall,
  isStart,
  isEnd,
  isVisited,
  isShortestPath,
  onMouseDown,
  row,
  col,
  onMouseEnter,
  onMouseUp,
  onMouseLeave,
  pathIndex,
  totalPath
}) => {
  const { state } = usePathfinding();
  const nodeSize = state.nodeSize || 35; // Fallback to 35px if not set
  
  let cName = "node";
  
  // Order matters! We want to show the shortest path over visited nodes
  if (isStart) cName += " node_start";
  else if (isEnd) cName += " node_end";
  else if (isWall) cName += " node_wall";
  else if (isShortestPath) cName += " node_path";
  else if (isVisited) cName += " node_visited";

  // Calculate animation delay based on path index
  const animationDelay = pathIndex * 0.1; // 0.1s delay between each step

  return (
    <td 
      className={cName}
      id={`node-${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseLeave(row, col)}
      style={{
        width: `${nodeSize}px`,
        height: `${nodeSize}px`,
        padding: 0,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'white',
      }}
    >
      {isStart && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/startPoint.png"
            alt="Start"
            width={nodeSize * 0.7}
            height={nodeSize * 0.7}
            className="pointer-events-none"
          />
        </div>
      )}
      {isEnd && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/targetPoint.png"
            alt="Target"
            width={nodeSize * 0.7}
            height={nodeSize * 0.7}
            className="pointer-events-none"
          />
        </div>
      )}
      {isShortestPath && !isStart && !isEnd && pathIndex !== undefined && (
        <div 
          className="running-girl"
          style={{
            animationDelay: `${animationDelay}s`,
            opacity: 0,
            animationFillMode: 'forwards'
          }}
        >
          <Image
            src="/startPoint.png"
            alt="Running"
            width={nodeSize * 0.6}
            height={nodeSize * 0.6}
            className="pointer-events-none"
          />
        </div>
      )}
    </td>
  );
};

export default Node;