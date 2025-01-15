import PriorityQueue from "js-priority-queue";

function isInsideGrid(i, j, grid) {
    return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

// Manhattan distance heuristic
function heuristic(node, endNode) {
    return Math.abs(node.row - endNode[0]) + Math.abs(node.col - endNode[1]);
}

const astar = (grid, startNode, endNode) => {
    const visitedNodes = [];
    const shortestPath = [];

    // Initialize data structures
    const gScore = {}; // Cost from start to current node
    const fScore = {}; // Estimated total cost from start to end through current node
    const previous = {};
    
    grid.forEach(row => row.forEach(node => {
        gScore[`${node.row}-${node.col}`] = Infinity;
        fScore[`${node.row}-${node.col}`] = Infinity;
        previous[`${node.row}-${node.col}`] = null;
    }));

    // Set start node scores
    const startKey = `${startNode[0]}-${startNode[1]}`;
    gScore[startKey] = 0;
    fScore[startKey] = heuristic(grid[startNode[0]][startNode[1]], endNode);

    // Priority queue using f-score for ordering
    const pq = new PriorityQueue({
        comparator: (a, b) => fScore[`${a.row}-${a.col}`] - fScore[`${b.row}-${b.col}`]
    });

    // Add start node to queue
    pq.queue(grid[startNode[0]][startNode[1]]);

    // Directions: right, down, left, up
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    while (pq.length > 0) {
        const current = pq.dequeue();
        const currentKey = `${current.row}-${current.col}`;

        // Skip if we've already processed this node
        if (current.isVisited) continue;

        // Mark as visited
        current.isVisited = true;
        visitedNodes.push(current);

        // If we reached the target
        if (current.row === endNode[0] && current.col === endNode[1]) {
            let curr = current;
            while (curr) {
                shortestPath.unshift(curr);
                const prevKey = previous[`${curr.row}-${curr.col}`];
                if (!prevKey) break;
                const [prevRow, prevCol] = prevKey.split('-').map(Number);
                curr = grid[prevRow][prevCol];
            }
            break;
        }

        // Check all neighbors
        for (let i = 0; i < 4; i++) {
            const newRow = current.row + dx[i];
            const newCol = current.col + dy[i];

            if (isInsideGrid(newRow, newCol, grid)) {
                const neighbor = grid[newRow][newCol];
                const neighborKey = `${newRow}-${newCol}`;

                // Skip walls and visited nodes
                if (neighbor.isWall || neighbor.isVisited) continue;

                // Calculate new path score
                const tentativeGScore = gScore[currentKey] + 1;

                if (tentativeGScore < gScore[neighborKey]) {
                    // This path is better than any previous one
                    previous[neighborKey] = currentKey;
                    gScore[neighborKey] = tentativeGScore;
                    fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, endNode);
                    pq.queue(neighbor);
                }
            }
        }
    }

    return { visitedNodes, shortestPath };
};

export default astar;
