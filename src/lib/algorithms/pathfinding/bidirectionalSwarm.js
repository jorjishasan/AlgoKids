const bidirectionalSwarm = async (grid, start, end, onVisit) => {
  const visitedNodes = [];
  const forwardVisited = new Set();
  const backwardVisited = new Set();
  const forwardParent = new Map();
  const backwardParent = new Map();
  
  // Initialize forward and backward swarms
  const forwardSwarm = [{ row: start[0], col: start[1], distance: 0, direction: 'forward' }];
  const backwardSwarm = [{ row: end[0], col: end[1], distance: 0, direction: 'backward' }];
  
  const pheromones = Array(grid.length).fill().map(() => 
    Array(grid[0].length).fill(0)
  );
  
  // Parameters for the swarm behavior
  const EVAPORATION_RATE = 0.1;
  const PHEROMONE_DEPOSIT = 1.0;
  const ATTRACTION_WEIGHT = 0.4;
  
  const calculateAttraction = (row, col, targetRow, targetCol) => {
    const distance = Math.abs(targetRow - row) + Math.abs(targetCol - col);
    return 1 / (distance + 1);
  };
  
  const reconstructPath = (meetingPoint, forwardParent, backwardParent) => {
    const path = [];
    
    // Reconstruct forward path
    let current = meetingPoint;
    while (forwardParent.has(`${current.row},${current.col}`)) {
      path.unshift(current);
      current = forwardParent.get(`${current.row},${current.col}`);
    }
    path.unshift({ row: start[0], col: start[1] });
    
    // Reconstruct backward path
    current = meetingPoint;
    while (backwardParent.has(`${current.row},${current.col}`)) {
      current = backwardParent.get(`${current.row},${current.col}`);
      path.push(current);
    }
    
    return path;
  };
  
  while (forwardSwarm.length > 0 && backwardSwarm.length > 0) {
    // Process forward swarm
    for (let i = forwardSwarm.length - 1; i >= 0; i--) {
      const current = forwardSwarm[i];
      const key = `${current.row},${current.col}`;
      
      if (forwardVisited.has(key)) {
        forwardSwarm.splice(i, 1);
        continue;
      }
      
      forwardVisited.add(key);
      visitedNodes.push(current);
      
      if (onVisit) {
        await onVisit(current);
      }
      
      // Check if we've met the backward swarm
      if (backwardVisited.has(key)) {
        return {
          visitedNodes,
          shortestPath: reconstructPath(current, forwardParent, backwardParent)
        };
      }
      
      // Deposit pheromones
      pheromones[current.row][current.col] += PHEROMONE_DEPOSIT;
    }
    
    // Process backward swarm
    for (let i = backwardSwarm.length - 1; i >= 0; i--) {
      const current = backwardSwarm[i];
      const key = `${current.row},${current.col}`;
      
      if (backwardVisited.has(key)) {
        backwardSwarm.splice(i, 1);
        continue;
      }
      
      backwardVisited.add(key);
      visitedNodes.push(current);
      
      if (onVisit) {
        await onVisit(current);
      }
      
      // Check if we've met the forward swarm
      if (forwardVisited.has(key)) {
        return {
          visitedNodes,
          shortestPath: reconstructPath(current, forwardParent, backwardParent)
        };
      }
      
      // Deposit pheromones
      pheromones[current.row][current.col] += PHEROMONE_DEPOSIT;
    }
    
    // Evaporate pheromones
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        pheromones[i][j] *= (1 - EVAPORATION_RATE);
      }
    }
    
    // Move forward swarm
    const newForwardAgents = [];
    for (const agent of forwardSwarm) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      const possibleMoves = [];
      
      for (const [dx, dy] of directions) {
        const newRow = agent.row + dx;
        const newCol = agent.col + dy;
        
        if (newRow >= 0 && newRow < grid.length && 
            newCol >= 0 && newCol < grid[0].length && 
            !grid[newRow][newCol].isWall) {
          const newKey = `${newRow},${newCol}`;
          if (!forwardVisited.has(newKey)) {
            const attraction = calculateAttraction(newRow, newCol, end[0], end[1]);
            const pheroLevel = pheromones[newRow][newCol];
            possibleMoves.push({
              row: newRow,
              col: newCol,
              score: pheroLevel + ATTRACTION_WEIGHT * attraction,
              distance: agent.distance + 1,
              direction: 'forward'
            });
          }
        }
      }
      
      possibleMoves.sort((a, b) => b.score - a.score);
      if (possibleMoves.length > 0) {
        const bestMove = possibleMoves[0];
        forwardParent.set(`${bestMove.row},${bestMove.col}`, agent);
        newForwardAgents.push(bestMove);
      }
    }
    
    // Move backward swarm
    const newBackwardAgents = [];
    for (const agent of backwardSwarm) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      const possibleMoves = [];
      
      for (const [dx, dy] of directions) {
        const newRow = agent.row + dx;
        const newCol = agent.col + dy;
        
        if (newRow >= 0 && newRow < grid.length && 
            newCol >= 0 && newCol < grid[0].length && 
            !grid[newRow][newCol].isWall) {
          const newKey = `${newRow},${newCol}`;
          if (!backwardVisited.has(newKey)) {
            const attraction = calculateAttraction(newRow, newCol, start[0], start[1]);
            const pheroLevel = pheromones[newRow][newCol];
            possibleMoves.push({
              row: newRow,
              col: newCol,
              score: pheroLevel + ATTRACTION_WEIGHT * attraction,
              distance: agent.distance + 1,
              direction: 'backward'
            });
          }
        }
      }
      
      possibleMoves.sort((a, b) => b.score - a.score);
      if (possibleMoves.length > 0) {
        const bestMove = possibleMoves[0];
        backwardParent.set(`${bestMove.row},${bestMove.col}`, agent);
        newBackwardAgents.push(bestMove);
      }
    }
    
    forwardSwarm.length = 0;
    backwardSwarm.length = 0;
    forwardSwarm.push(...newForwardAgents);
    backwardSwarm.push(...newBackwardAgents);
  }
  
  return { visitedNodes, shortestPath: [] };
};

export default bidirectionalSwarm; 