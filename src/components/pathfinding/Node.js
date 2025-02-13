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
  const nodeSize = state.nodeSize || 45;
  
  let cName = "node";
  
  if (isStart) cName += " node_start";
  else if (isEnd) cName += " node_end";
  else if (isWall) cName += " node_wall";
  else if (isShortestPath) cName += " node_path";
  else if (isVisited) cName += " node_visited";

  const animationDelay = pathIndex * 0.1;

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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: 0,
        borderRadius: 0,
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          zIndex: 10
        }
      }}
    >
      {isStart && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <div className="relative w-[95%] h-[95%]">
            <Image
              src="/startPoint.png"
              alt="Start"
              fill
              style={{ 
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
              className="pointer-events-none"
              priority
            />
          </div>
        </div>
      )}
      {isEnd && (
        <div className="absolute inset-0 flex items-center justify-center animate-bounce">
          <div className="relative w-[95%] h-[95%]">
            <Image
              src="/targetPoint.png"
              alt="Target"
              fill
              style={{ 
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
              className="pointer-events-none"
              priority
            />
          </div>
        </div>
      )}
      {isShortestPath && !isStart && !isEnd && pathIndex !== undefined && (
        <div 
          className="running-girl absolute inset-0 flex items-center justify-center"
          style={{
            animationDelay: `${animationDelay}s`,
            opacity: 0,
            animationFillMode: 'forwards'
          }}
        >
          <div className="relative w-[90%] h-[90%]">
            <Image
              src="/startPoint.png"
              alt="Running"
              fill
              style={{ 
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
              className="pointer-events-none"
              priority
            />
          </div>
        </div>
      )}
    </td>
  );
};

export default Node;