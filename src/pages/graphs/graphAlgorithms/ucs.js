import { PriorityQueue } from './datastructures/priorityQueue';
import { getNeighbors } from './helper';

export function UCS(grid, start, destination) {
    let priorityQueue = new PriorityQueue();
    priorityQueue.enqueue({ node: start, path: [start], cost: 0 }, 0);

    let visited = {};
    let expanded = [];

    while (!priorityQueue.isEmpty()) {
        let { node, path, cost } = priorityQueue.dequeue(); // get node with lowest cost
        let nodeKey = node.toString();

        if (visited[nodeKey]) {
            continue; // skip if already visited node
        }

        visited[nodeKey] = true; // mark as visited
        expanded.push(node); // add to expanded list

        if (nodeKey === destination.toString()) { // if destination return found, path, and expanded. 
            return { status: "found", path, cost, expanded };
        }

        let neighbors = getNeighbors(grid, node); // get neighbors
        for (let i = 0; i < neighbors.length; i++) { // for every neighbor
            let neighbor = neighbors[i]; 
            let neighborKey = neighbor.toString();

            if (visited[neighborKey]) continue; // skip visited

            if (grid[neighbor[0]][neighbor[1]] !== "w") { // not a wall
                let moveCost = grid[neighbor[0]][neighbor[1]] === "e" ? 5 : 1; // calculate if neighbor is weighted
                let neighborCost = cost + moveCost; // add up cost
                priorityQueue.enqueue({ node: neighbor, path: path.concat([neighbor]), cost: neighborCost }, neighborCost); // enque neighbor
            }
        }
    }


    return { status: "not found", path: [], cost: 0 };
}
