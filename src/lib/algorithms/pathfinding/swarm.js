const swarm = async (grid, start, end, onVisit) => {
  const visitedNodes = [];
  const queue = [{ row: start[0], col: start[1], distance: 0 }];
  const visited = new Set();
  const parent = new Map();
  const pheromones = Array(grid.length).fill().map(() => 
    Array(grid[0].length).fill(0)
  );
  
  // Parameters for the swarm behavior
  const EVAPORATION_RATE = 0.1;
  const PHEROMONE_DEPOSIT = 1.0;
  
  while (queue.length > 0) {
    // Sort by pheromone levels and distance
    queue.sort((a, b) => {
      const pheroA = pheromones[a.row][a.col];
      const pheroB = pheromones[b.row][b.col];
      const distA = Math.abs(end[0] - a.row) + Math.abs(end[1] - a.col);
      const distB = Math.abs(end[0] - b.row) + Math.abs(end[1] - b.col);
      return (pheroB - pheroA) || (distA - distB);
    });
    
    const current = queue.shift();
    const key = `${current.row},${current.col}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    visitedNodes.push(current);
    
    if (onVisit) {
      await onVisit(current);
    }
    
    // Deposit pheromones
    pheromones[current.row][current.col] += PHEROMONE_DEPOSIT;
    
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
    
    // Evaporate pheromones
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        pheromones[i][j] *= (1 - EVAPORATION_RATE);
      }
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
          queue.push({ 
            row: newRow, 
            col: newCol, 
            distance: current.distance + 1 
          });
          parent.set(newKey, current);
        }
      }
    }
  }
  
  return { visitedNodes, shortestPath: [] };
};

export default swarm; 