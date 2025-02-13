const dfs = async (grid, start, end, onVisit) => {
  const visitedNodes = [];
  const visited = new Set();
  const parent = new Map();
  let foundEnd = false;
  
  const dfsRecursive = async (row, col) => {
    if (foundEnd) return;
    
    const key = `${row},${col}`;
    if (visited.has(key)) return;
    
    visited.add(key);
    visitedNodes.push({ row, col });
    
    if (onVisit) {
      await onVisit({ row, col });
    }
    
    if (row === end[0] && col === end[1]) {
      foundEnd = true;
      return;
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      
      if (newRow >= 0 && newRow < grid.length && 
          newCol >= 0 && newCol < grid[0].length && 
          !grid[newRow][newCol].isWall) {
        const newKey = `${newRow},${newCol}`;
        if (!visited.has(newKey)) {
          parent.set(newKey, { row, col });
          await dfsRecursive(newRow, newCol);
        }
      }
    }
  };
  
  await dfsRecursive(start[0], start[1]);
  
  const shortestPath = [];
  if (foundEnd) {
    let curr = { row: end[0], col: end[1] };
    while (parent.has(`${curr.row},${curr.col}`)) {
      shortestPath.unshift(curr);
      curr = parent.get(`${curr.row},${curr.col}`);
    }
    shortestPath.unshift({ row: start[0], col: start[1] });
  }
  
  return { visitedNodes, shortestPath };
};

export default dfs; 