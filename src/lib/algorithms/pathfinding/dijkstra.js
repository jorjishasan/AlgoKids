import PriorityQueue from "js-priority-queue";

function isInsideGrid(i, j, grid) {
    return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const Dijkstra = async (grid, start, end, onVisit) => {
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);
    const distances = new Map();
    const previous = new Map();

    // Initialize distances
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const key = `${row},${col}`;
            distances.set(key, Infinity);
        }
    }
    distances.set(`${start[0]},${start[1]}`, 0);

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes, distances);
        const closestNode = unvisitedNodes.shift();
        
        // If we found the end node, reconstruct and return the path
        if (closestNode.row === end[0] && closestNode.col === end[1]) {
            const shortestPath = getShortestPath(previous, start, end);
            return { visitedNodes, shortestPath };
        }

        // Skip walls
        if (grid[closestNode.row][closestNode.col].isWall) continue;

        // If distance is infinity, we're trapped
        const distance = distances.get(`${closestNode.row},${closestNode.col}`);
        if (distance === Infinity) return { visitedNodes, shortestPath: [] };

        visitedNodes.push(closestNode);
        if (onVisit) {
            await onVisit(closestNode);
        }

        // Update unvisited neighbors
        const neighbors = getUnvisitedNeighbors(closestNode, grid);
        for (const neighbor of neighbors) {
            const alt = distance + 1;
            const neighborKey = `${neighbor.row},${neighbor.col}`;
            if (alt < distances.get(neighborKey)) {
                distances.set(neighborKey, alt);
                previous.set(neighborKey, closestNode);
            }
        }
    }

    return { visitedNodes, shortestPath: [] };
};

const sortNodesByDistance = (unvisitedNodes, distances) => {
    unvisitedNodes.sort((nodeA, nodeB) => {
        const distA = distances.get(`${nodeA.row},${nodeA.col}`);
        const distB = distances.get(`${nodeB.row},${nodeB.col}`);
        return distA - distB;
    });
};

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    
    if (row > 0) neighbors.push({ row: row - 1, col });
    if (row < grid.length - 1) neighbors.push({ row: row + 1, col });
    if (col > 0) neighbors.push({ row, col: col - 1 });
    if (col < grid[0].length - 1) neighbors.push({ row, col: col + 1 });
    
    return neighbors;
};

const getAllNodes = (grid) => {
    const nodes = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            nodes.push({ row, col });
        }
    }
    return nodes;
};

const getShortestPath = (previous, start, end) => {
    const shortestPath = [];
    let current = { row: end[0], col: end[1] };
    
    while (current && (current.row !== start[0] || current.col !== start[1])) {
        shortestPath.unshift(current);
        current = previous.get(`${current.row},${current.col}`);
    }
    shortestPath.unshift({ row: start[0], col: start[1] });
    
    return shortestPath;
};

export default Dijkstra;