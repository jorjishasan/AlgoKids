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
  onMouseLeave
}) => {
  let cName = "";
  
  // Order matters! We want to show the shortest path over visited nodes
  if (isStart) cName = "start";
  else if (isEnd) cName = "end";
  else if (isWall) cName = "wall";
  else if (isShortestPath) cName = "path";
  else if (isVisited) cName = "visited";

  return (
    <td 
      className={`node node_${cName}`}
      id={`node-${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseLeave(row, col)}
    />
  );
};

export default Node;