const bfs = (grid, start, end) => {
  const visitedNodes = [];
  const queue = [{ row: start[0], col: start[1], distance: 0 }];
  const visited = new Set();
  const parent = new Map();
  
  while (queue.length > 0) {
    const current = queue.shift();
    const key = `${current.row},${current.col}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    visitedNodes.push(current);
    
    if (current.row === end[0] && current.col === end[1]) {
      const path = [];
      let curr = current;
      while (parent.has(`${curr.row},${curr.col}`)) {
        path.unshift(curr);
        curr = parent.get(`${curr.row},${curr.col}`);
      }
      path.unshift({ row: start[0], col: start[1] });
      return { visitedNodes, shortestPath: path };
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dx, dy] of directions) {
      const newRow = current.row + dx;
      const newCol = current.col + dy;
      
      if (newRow >= 0 && newRow < grid.length && 
          newCol >= 0 && newCol < grid[0].length && 
          !grid[newRow][newCol].isWall) {
        const newKey = `${newRow},${newCol}`;
        if (!visited.has(newKey)) {
          queue.push({ row: newRow, col: newCol, distance: current.distance + 1 });
          parent.set(newKey, current);
        }
      }
    }
  }
  return { visitedNodes, shortestPath: [] };
};

export default bfs; 