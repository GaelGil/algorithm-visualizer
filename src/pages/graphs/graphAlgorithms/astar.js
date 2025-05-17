import { PriorityQueue } from './datastructures/priorityQueue';
import { getNeighbors, heuristic } from './helper';

export function ASTAR(grid, start, destination) {
    let expanded = []; // expanded nodes (nodes that weve checked all neighbors)
    let priorityQueue = new PriorityQueue(); // prioirty queue with lowest cost priority
    priorityQueue.enqueue({ node: start, path: [start], cost: heuristic(start, destination)});

    while (!priorityQueue.isEmpty()) {
        let { node, path, cost } = priorityQueue.dequeue(); // get the node, its path, and cost from the front of the priority queue
        let nodeKey = node.toString(); // to string for comparison

        if (expanded.includes(node)){
            continue;
        }
        expanded.push(node); 

        if (nodeKey === destination.toString()) { // check if we have arrived at the solution
            return { status: "found", path, cost , expanded};
        }

        let neighbors = getNeighbors(grid, node);
        for (let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            let costToNeighbor = grid[neighbor[0]][neighbor[1]] === "e" ? 5 : 1; 
            let g = cost + costToNeighbor;
            let f = g + heuristic(neighbor, destination); // f = g (total cost to node) + heuristic

            if (grid[neighbor[0]][neighbor[1]] !== "w") { // not a wall
                if (f < costToNeighbor) {
                    priorityQueue.enqueue({ node: neighbor, path: path.concat([neighbor]), cost: f });
                }
            }
        }
    }

    return { status: "not found", path: [], cost: 0 };
}