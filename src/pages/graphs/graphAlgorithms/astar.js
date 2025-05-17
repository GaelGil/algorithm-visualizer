import { PriorityQueue } from './datastructures/priorityQueue';
import { getNeighbors, heuristic } from './helper';

export function ASTAR(grid, start, destination) {
    let visited = {};
    let expanded = [];
    let priorityQueue = new PriorityQueue();
    priorityQueue.enqueue({ node: start, path: [start], cost: heuristic(start, destination)});

    while (!priorityQueue.isEmpty()) {
        let { node, path, cost } = priorityQueue.dequeue(); // get the node, its path, and cost from the front of the priority queue
        let nodeKey = node.toString(); // to string for comparison

        if (visited[nodeKey]){
            continue;
        }

        if (nodeKey === destination.toString()) { // check if we have arrived at the solution
            return { status: "found", path, cost , expanded};
        }

        visited[nodeKey] = true;
        let neighbors = getNeighbors(grid, node);
        for (let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            let costToNeighbor = cost;
            costToNeighbor = grid[neighbor[0]][neighbor[1]] === "e" ? 5 : 1; 

            let f = heuristic(neighbor, destination) + costToNeighbor;

            if (grid[neighbor[0]][neighbor[1]] !== "w") { // not a wall
                priorityQueue.enqueue({ node: neighbor, path: path.concat([neighbor]), cost: f });
                expanded.push(neighbor); 
            }
        }


    }

    return { status: "not found", path: [], cost: 0 };
}