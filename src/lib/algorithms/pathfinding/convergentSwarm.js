const convergentSwarm = async (grid, start, end, onVisit) => {
  const visitedNodes = [];
  const swarmSize = 4; // Number of agents in the swarm
  const swarmAgents = Array(swarmSize).fill().map(() => ({
    row: start[0],
    col: start[1],
    distance: 0
  }));
  
  const visited = new Set();
  const parent = new Map();
  const pheromones = Array(grid.length).fill().map(() => 
    Array(grid[0].length).fill(0)
  );
  
  // Parameters for the convergent swarm behavior
  const EVAPORATION_RATE = 0.1;
  const PHEROMONE_DEPOSIT = 1.0;
  const CONVERGENCE_WEIGHT = 0.3;
  
  const calculateAttraction = (row, col, endRow, endCol) => {
    const distance = Math.abs(endRow - row) + Math.abs(endCol - col);
    return 1 / (distance + 1); // Avoid division by zero
  };
  
  while (swarmAgents.length > 0) {
    // Update all agents in parallel
    for (let i = swarmAgents.length - 1; i >= 0; i--) {
      const agent = swarmAgents[i];
      const key = `${agent.row},${agent.col}`;
      
      if (visited.has(key)) {
        swarmAgents.splice(i, 1);
        continue;
      }
      
      visited.add(key);
      visitedNodes.push(agent);
      
      if (onVisit) {
        await onVisit(agent);
      }
      
      // Deposit pheromones with convergence factor
      const attraction = calculateAttraction(agent.row, agent.col, end[0], end[1]);
      pheromones[agent.row][agent.col] += PHEROMONE_DEPOSIT * (1 + CONVERGENCE_WEIGHT * attraction);
      
      if (agent.row === end[0] && agent.col === end[1]) {
        const path = [];
        let curr = agent;
        while (parent.has(`${curr.row},${curr.col}`)) {
          path.unshift(curr);
          curr = parent.get(`${curr.row},${curr.col}`);
        }
        path.unshift({ row: start[0], col: start[1] });
        return { visitedNodes, shortestPath: path };
      }
    }
    
    // Evaporate pheromones
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        pheromones[i][j] *= (1 - EVAPORATION_RATE);
      }
    }
    
    // Move agents
    const newAgents = [];
    for (const agent of swarmAgents) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      const possibleMoves = [];
      
      for (const [dx, dy] of directions) {
        const newRow = agent.row + dx;
        const newCol = agent.col + dy;
        
        if (newRow >= 0 && newRow < grid.length && 
            newCol >= 0 && newCol < grid[0].length && 
            !grid[newRow][newCol].isWall) {
          const newKey = `${newRow},${newCol}`;
          if (!visited.has(newKey)) {
            const attraction = calculateAttraction(newRow, newCol, end[0], end[1]);
            const pheroLevel = pheromones[newRow][newCol];
            possibleMoves.push({
              row: newRow,
              col: newCol,
              score: pheroLevel + CONVERGENCE_WEIGHT * attraction,
              distance: agent.distance + 1
            });
          }
        }
      }
      
      // Sort moves by score and add to new agents
      possibleMoves.sort((a, b) => b.score - a.score);
      if (possibleMoves.length > 0) {
        const bestMove = possibleMoves[0];
        parent.set(`${bestMove.row},${bestMove.col}`, agent);
        newAgents.push(bestMove);
      }
    }
    
    swarmAgents.length = 0;
    swarmAgents.push(...newAgents);
  }
  
  return { visitedNodes, shortestPath: [] };
};

export default convergentSwarm; 