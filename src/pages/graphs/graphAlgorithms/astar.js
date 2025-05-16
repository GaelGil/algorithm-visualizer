import { PriorityQueue } from './datastructures/priorityQueue';
import { getNeighbors, heuristic } from './helper';

export function ASTAR(grid, start, destination) {
    let visited = {};
    let expanded = [];
    let priorityQueue = new PriorityQueue();
    priorityQueue.enqueue({ node: start, path: [start], cost: heuristic(start, destination) });

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
        for (let i = 0; i <= neighbors.length; i++){
            let neighbor = neighbors[i];
            let neighborKey = neighbor.toString();
            let neighborCost = cost ;
            if (grid[neighbor[0]][neighbor[1]] === "e"){
                        neighborCost += 5;
            }else {
                        neighborCost +=1;
            };
            let f = heuristic(neighbor, destination) + neighborCost;
            if (!(priorityQueue(neighbor)) || f < neighborCost){
                if (visited[neighborKey]) continue; // skip visited
                    priorityQueue.enqueue({ node: neighbor, path: path.concat([neighbor]), cost: f }, f);
                    expanded.push(neighbor); // add the expanded node to the list
            }
            
        }






        // if (nodeKey === destination.toString()) { // check if we have arrived at the solution
        //     return { status: "found", path, cost , expanded};
        // } else {
        //     if (!(visited.hasOwnProperty(nodeKey))) { // if we have not been to this node, add it
        //         visited[nodeKey] = true; // mark as visited
        //         let neighbors = getNeighbors(grid, node); // get neighbors of the current node
        //         for (let i = 0; i < neighbors.length; i++) {
        //             let neighbor = neighbors[i];
        //             let neighborKey = neighbor.toString();
        //             let neighborCost = cost
        //             if (grid[neighbor[0]][neighbor[1]] === "e"){
        //                 neighborCost += 5;
        //             }else {
        //                 neighborCost +=1;
        //             };

        //             if (!(visited.hasOwnProperty(neighborKey))) { // if the neighbor has not been visited, add to the priority queue
        //                 if (!(grid[neighbor[0]][neighbor[1]] === "w")) { // if there is no wall, then we add
        //                     priorityQueue.enqueue({ node: neighbor, path: path.concat([neighbor]), cost: neighborCost }, neighborCost);
        //                     expanded.push(neighbor); // add the expanded node to the list
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    return { status: "not found", path: [], cost: 0 };
}